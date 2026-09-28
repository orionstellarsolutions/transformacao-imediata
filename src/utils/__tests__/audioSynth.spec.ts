import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getAudioContext,
  playTickSound,
  playLockSound,
  resetAudioContextForTesting,
} from '../audioSynth';

describe('audioSynth utility', () => {
  let mockOscillator: {
    type: string;
    frequency: {
      setValueAtTime: ReturnType<typeof vi.fn>;
      exponentialRampToValueAtTime: ReturnType<typeof vi.fn>;
    };
    connect: ReturnType<typeof vi.fn>;
    start: ReturnType<typeof vi.fn>;
    stop: ReturnType<typeof vi.fn>;
  };

  let mockGainNode: {
    gain: {
      setValueAtTime: ReturnType<typeof vi.fn>;
      exponentialRampToValueAtTime: ReturnType<typeof vi.fn>;
    };
    connect: ReturnType<typeof vi.fn>;
  };

  let mockContext: {
    state: string;
    currentTime: number;
    destination: object;
    resume: ReturnType<typeof vi.fn>;
    createOscillator: ReturnType<typeof vi.fn>;
    createGain: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    resetAudioContextForTesting();
    vi.clearAllMocks();

    mockOscillator = {
      type: 'sine',
      frequency: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };

    mockGainNode = {
      gain: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
    };

    mockContext = {
      state: 'running',
      currentTime: 1.0,
      destination: {},
      resume: vi.fn().mockResolvedValue(undefined),
      createOscillator: vi.fn(() => mockOscillator),
      createGain: vi.fn(() => mockGainNode),
    };

    // Usa função construtora clássica para permitir 'new'
    const MockAudioContext = vi.fn(function (this: unknown) {
      return mockContext;
    });

    window.AudioContext = MockAudioContext as unknown as typeof AudioContext;
  });

  it('deve inicializar e reutilizar o AudioContext singleton', () => {
    const ctx1 = getAudioContext();
    const ctx2 = getAudioContext();

    expect(ctx1).toBe(mockContext);
    expect(ctx2).toBe(mockContext);
    expect(window.AudioContext).toHaveBeenCalledTimes(1);
  });

  it('deve reproduzir o som de tick com frequência descendente e onda senoidal', () => {
    playTickSound();

    expect(mockContext.createOscillator).toHaveBeenCalled();
    expect(mockContext.createGain).toHaveBeenCalled();
    expect(mockOscillator.type).toBe('sine');
    expect(mockOscillator.frequency.setValueAtTime).toHaveBeenCalledWith(600, 1.0);
    expect(mockOscillator.frequency.exponentialRampToValueAtTime).toHaveBeenCalledWith(200, 1.08);
    expect(mockOscillator.connect).toHaveBeenCalledWith(mockGainNode);
    expect(mockGainNode.connect).toHaveBeenCalledWith(mockContext.destination);
    expect(mockOscillator.start).toHaveBeenCalled();
    expect(mockOscillator.stop).toHaveBeenCalledWith(1.1);
  });

  it('deve reproduzir o som de travamento (lock) com onda quadrada', () => {
    playLockSound();

    expect(mockContext.createOscillator).toHaveBeenCalled();
    expect(mockOscillator.type).toBe('square');
    expect(mockOscillator.frequency.setValueAtTime).toHaveBeenCalledWith(400, 1.0);
    expect(mockOscillator.frequency.setValueAtTime).toHaveBeenCalledWith(800, 1.1);
    expect(mockOscillator.start).toHaveBeenCalled();
    expect(mockOscillator.stop).toHaveBeenCalledWith(1.2);
  });

  it('deve chamar ctx.resume() se o estado estiver suspended', () => {
    mockContext.state = 'suspended';

    playTickSound();
    expect(mockContext.resume).toHaveBeenCalled();

    playLockSound();
    expect(mockContext.resume).toHaveBeenCalledTimes(2);
  });

  it('deve capturar e tratar exceções sem quebrar o fluxo caso o áudio falhe', () => {
    mockContext.createOscillator.mockImplementationOnce(() => {
      throw new Error('Audio permission denied');
    });

    expect(() => playTickSound()).not.toThrow();

    mockContext.createOscillator.mockImplementationOnce(() => {
      throw new Error('Audio permission denied');
    });

    expect(() => playLockSound()).not.toThrow();
  });

  it('deve utilizar webkitAudioContext se AudioContext padrão não existir', () => {
    resetAudioContextForTesting();
    // @ts-expect-error test fallback
    delete window.AudioContext;
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext = vi.fn(function () {
      return mockContext;
    }) as unknown as typeof AudioContext;

    const ctx = getAudioContext();
    expect(ctx).toBe(mockContext);
  });
});
