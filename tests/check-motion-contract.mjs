import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../style.css', import.meta.url), 'utf8');
const js = fs.readFileSync(new URL('../script.js', import.meta.url), 'utf8');

assert.match(
  html,
  /<button[\s\S]*class="emoji-wave"[\s\S]*aria-label="High five"/,
  'greeting hand should be an accessible high-five button'
);

assert.match(
  html,
  /class="emoji-ring"/,
  'greeting hand should include a ring element for contact feedback'
);

assert.match(
  css,
  /--accent-rgb:\s*139,\s*157,\s*171/,
  'light theme should expose the existing accent color as RGB for subtle alpha effects'
);

assert.match(
  css,
  /animation:\s*greetingWave\s+1\.18s\s+ease-in-out\s+2/,
  'entry greeting should wave exactly two cycles'
);

assert.match(
  css,
  /@keyframes\s+highFive[\s\S]*scale\(1\.13\)/,
  'V2 high-five should peak at restrained scale(1.13)'
);

assert.match(
  css,
  /@keyframes\s+highFiveRing/,
  'high-five should include a subtle ring animation'
);

assert.match(
  js,
  /const\s+playHighFive\s*=/,
  'script should define a replayable high-five handler'
);

assert.match(
  js,
  /animationend/,
  'script should remove the high-five class after animation end'
);

console.log('Motion contract checks passed.');
