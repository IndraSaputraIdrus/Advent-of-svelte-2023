import { morseCodeMap } from './morseList';

// sleep utils
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// create audio
export function createBeep(frequency: number) {
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.frequency.value = frequency
  gainNode.gain.value = 0;

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start();

  return {
    oscillator, gainNode
  }
}


export function startMorse(gainNode: GainNode) {
  gainNode.gain.setTargetAtTime(1, 0, 0.001);
}

export function stopMorse(gainNode: GainNode) {
  gainNode.gain.setTargetAtTime(0, 0, 0.001);
}


export function convertToMorse(morseCode: string[], value: string) {
  const inputArr = value.toUpperCase().split('');

  inputArr.forEach((item) => {
    const char = morseCodeMap.get(item);
    if (char) {
      morseCode = [...morseCode, char];
    }
  });

  return morseCode.join(' ');
}
