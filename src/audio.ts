import * as Tone from 'tone';

// Minimal ZzFX-compatible PCM generator for classic game sounds
function zzfxGen(
  volume: number, randomness: number, frequency: number,
  attack: number, sustain: number, release: number,
  shape = 0,    // 0=sine 1=square 2=sawtooth 3=triangle
  expDecay = false
): Float32Array {
  const SR = 44100;
  const PI2 = Math.PI * 2;
  const fq = frequency * PI2 / SR;
  const attk = Math.ceil(attack * SR);
  const sust = Math.ceil(sustain * SR);
  const rel  = Math.ceil(Math.max(release, 0.001) * SR);
  const buf  = new Float32Array(attk + sust + rel);
  let phase  = 0;

  for (let i = 0; i < buf.length; i++) {
    let env: number;
    if (attk > 0 && i < attk) {
      env = i / attk;
    } else if (i < attk + sust) {
      env = 1;
    } else {
      const t = (i - attk - sust) / rel;
      env = expDecay ? Math.exp(-t * 5) : Math.max(0, 1 - t);
    }
    phase += fq * (1 + (Math.random() * 2 - 1) * randomness);
    const t = (phase / PI2 % 1 + 1) % 1;
    let s: number;
    switch (shape) {
      case 1:  s = t < 0.5 ? 1 : -1;               break; // square
      case 2:  s = t * 2 - 1;                        break; // sawtooth
      case 3:  s = Math.abs(t * 4 - 2) - 1;          break; // triangle
      default: s = Math.sin(phase);                          // sine
    }
    buf[i] = s * env * volume;
  }
  return buf;
}

class AudioManager {
  private musicSeq:    Tone.Sequence | null = null;
  private musicSynth:  Tone.PolySynth | null = null;
  private musicMaster: Tone.Volume | null = null;

  private carOsc:  Tone.Oscillator | null = null;
  private carFilt: Tone.Filter | null = null;
  private carVol:  Tone.Volume | null = null;

  async unlock(): Promise<void> {
    await Tone.start();
  }

  stopMusic(): void {
    Tone.getTransport().stop();
    Tone.getTransport().cancel();
    this.musicSeq?.dispose();
    this.musicSynth?.dispose();
    this.musicMaster?.dispose();
    this.musicSeq = null;
    this.musicSynth = null;
    this.musicMaster = null;
  }

  fadeOutMusic(seconds = 1.5): void {
    if (this.musicMaster) {
      this.musicMaster.volume.rampTo(-Infinity, seconds);
      setTimeout(() => this.stopMusic(), (seconds + 0.1) * 1000);
    } else {
      this.stopMusic();
    }
  }

  private startLoop(
    notes: (string | string[] | null)[],
    bpm: number,
    wave: Tone.ToneOscillatorType,
    vol = -10
  ): void {
    this.stopMusic();

    const master = new Tone.Volume(vol).toDestination();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: wave },
      envelope: { attack: 0.01, decay: 0.05, sustain: 0.6, release: 0.12 },
    } as any).connect(master);

    const seq = new Tone.Sequence<string | string[] | null>(
      (time, note) => {
        if (note !== null) synth.triggerAttackRelease(note, '8n', time);
      },
      notes,
      '8n'
    );

    Tone.getTransport().bpm.value = bpm;
    seq.start(0);
    Tone.getTransport().start();

    this.musicMaster = master;
    this.musicSynth  = synth as unknown as Tone.PolySynth;
    this.musicSeq    = seq as unknown as Tone.Sequence;
  }

  playMenuMusic(): void {
    this.startLoop(
      [
        // Frase A
        'C5', ['E5', 'G5'], 'A5',  ['G5', 'E5'],
        'C5', ['E5', 'G5'], 'F5',  ['E5', 'C5'],
        'D5', ['F5', 'A5'], 'C5',  ['E5', 'G5'],
        'A4', ['C5', 'E5'], 'G4',  ['B4', 'D5'],
        // Frase B
        'E5', ['G5', 'B5'], 'D5',  ['F5', 'A5'],
        'C5', ['E5', 'G5'], 'B4',  ['D5', 'G5'],
        'A4', ['C5', 'E5'], 'G4',  ['B4', 'D5'],
        'C5', ['E5', 'G5'], 'C6',  ['G5', 'E5'],
      ],
      185, 'square', -10
    );
  }

  playPauseMusic(): void {
    this.startLoop(
      ['A4', 'C5', 'E5', 'G5', 'E5', 'C5', 'A4', null,
       'G4', 'B4', 'D5', 'F5', 'D5', 'B4', 'G4', null],
      62, 'triangle', -15
    );
  }

  playGameOver(): void {
    this.stopMusic();
    const vol = new Tone.Volume(-14).toDestination();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const synth = new Tone.Synth({
      oscillator: { type: 'square' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.4 },
    } as any).connect(vol);
    const now = Tone.now();
    (['G4', 'F4', 'Eb4', 'D4', 'C4'] as string[]).forEach((note, i) => {
      synth.triggerAttackRelease(note, '4n', now + i * 0.45);
    });
    setTimeout(() => { synth.dispose(); vol.dispose(); }, 4000);
  }

  playGameOverBgMusic(): void {
    this.startLoop(
      ['A3', 'C4', 'E4', null, 'G3', 'B3', 'D4', null,
       'A3', 'E4', 'C4', null, 'G3', 'D4', 'B3', null],
      45, 'triangle', -16
    );
  }

  // --- car traffic engine ---
  startCarTraffic(): void {
    if (this.carOsc) return;
    const vol  = new Tone.Volume(-60).toDestination();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filt = new Tone.Filter({ frequency: 350, type: 'lowpass' } as any).connect(vol);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const osc  = new Tone.Oscillator({ frequency: 125, type: 'sawtooth' } as any).connect(filt);
    osc.start();
    this.carOsc  = osc  as unknown as Tone.Oscillator;
    this.carFilt = filt as unknown as Tone.Filter;
    this.carVol  = vol;
  }

  setCarTrafficLevel(numCars: number): void {
    if (!this.carVol) return;
    const targetVol = numCars === 0 ? -60 : Math.min(-8, -22 + numCars * 4);
    this.carVol.volume.rampTo(targetVol, 0.8);
  }

  stopCarTraffic(): void {
    if (!this.carOsc || !this.carVol) return;
    const [osc, filt, vol] = [this.carOsc, this.carFilt, this.carVol];
    this.carOsc = null; this.carFilt = null; this.carVol = null;
    vol.volume.rampTo(-60, 0.5);
    setTimeout(() => { osc.stop(); osc.dispose(); filt?.dispose(); vol.dispose(); }, 700);
  }

  // --- ZzFX sound playback ---
  private zzplay(...bufs: Float32Array[]): void {
    const ctx = Tone.getContext().rawContext as AudioContext;
    const len = Math.max(...bufs.map(b => b.length));
    const mixed = new Float32Array(len);
    for (const b of bufs) {
      for (let i = 0; i < b.length; i++) mixed[i] += b[i] / bufs.length;
    }
    for (let i = 0; i < mixed.length; i++) {
      mixed[i] = Math.max(-1, Math.min(1, mixed[i]));
    }
    const abuf = ctx.createBuffer(1, len, 44100);
    abuf.copyToChannel(mixed, 0);
    const src = ctx.createBufferSource();
    src.buffer = abuf;
    src.connect(ctx.destination);
    src.start();
  }

  private horn(duration: number): void {
    this.zzplay(
      zzfxGen(0.9, 0.01, 415, 0.01, duration - 0.09, 0.08, 1),
      zzfxGen(0.7, 0.01, 520, 0.01, duration - 0.09, 0.08, 1)
    );
  }

  playCarWarning(): void { this.horn(0.2); setTimeout(() => this.horn(0.2), 220); }
  playCarCollision():  void { this.horn(0.5); }

  playBell(count = 1): void {
    for (let i = 0; i < count; i++) {
      setTimeout(() => this.zzplay(
        zzfxGen(0.95, 0.005, 2200, 0, 0.008, 0.65, 0, true),
        zzfxGen(0.50, 0.005, 3300, 0, 0.004, 0.45, 0, true)
      ), i * 200);
    }
  }

  playBikeWarning():   void { this.playBell(1); }
  playBikeCollision(): void { this.playBell(2); }

  playPizzaPick(): void {
    [523, 659, 784].forEach((freq, i) =>
      setTimeout(() => this.zzplay(zzfxGen(0.8, 0.01, freq, 0, 0.04, 0.1, 0)), i * 65)
    );
  }

  playDelivered(): void {
    [392, 523, 659, 784].forEach((freq, i) =>
      setTimeout(() => this.zzplay(zzfxGen(0.9, 0.01, freq, 0.01, 0.1, 0.15, 0)), i * 100)
    );
  }

  playLifePick(): void {
    [330, 392, 523, 659].forEach((freq, i) =>
      setTimeout(() => this.zzplay(zzfxGen(0.85, 0.01, freq, 0, 0.06, 0.12, 0)), i * 55)
    );
  }

  playBoosterPick(): void {
    [440, 550, 660, 880].forEach((freq, i) =>
      setTimeout(() => this.zzplay(zzfxGen(0.9, 0.01, freq, 0, 0.03, 0.12, 2)), i * 50)
    );
  }
}

export const audio = new AudioManager();
