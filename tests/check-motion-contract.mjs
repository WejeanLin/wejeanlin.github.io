import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../style.css', import.meta.url), 'utf8');
const js = fs.readFileSync(new URL('../script.js', import.meta.url), 'utf8');

const buttonTags = html.match(/<button\b[^>]*>/g) ?? [];
const matchingGreetingButtons = buttonTags.filter(
  (tag) => /\bclass="emoji-wave"/.test(tag) && /\baria-label="High five"/.test(tag)
);

assert.equal(
  matchingGreetingButtons.length,
  1,
  'greeting hand should be exactly one accessible high-five button'
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
  /addEventListener\(\s*['"]animationend['"]\s*,[\s\S]*?classList\.remove\(\s*['"]high-five['"]\s*\)/,
  'script should remove the high-five class after animation end'
);

console.log('Motion contract checks passed.');
