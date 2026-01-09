class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.enabled = false;
  }

  init() {
    if (this.audioContext) return;
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  setEnabled(enabled) {
    if (enabled) this.init();
    this.enabled = enabled;
  }

  playNote(value, max) {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    // Frequency between 200Hz and 1200Hz based on value (increased range)
    const frequency = 200 + (value / max) * 1000;
    
    oscillator.type = 'triangle'; // Switched to triangle for more harmonics
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.06, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.03); // Faster decay

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.03);
  }
}

export const audioEngine = new AudioEngine();
