# Restrained Motion Design

Date: 2026-06-06

## Context

This project is a minimal static personal homepage built with HTML, CSS, and vanilla JavaScript. The current page already has a quiet Morandi-style palette, large whitespace, light and dark themes, a theme wipe transition, entry fade animations, contact copy behavior, and a toast.

The goal is to improve the site's polish with restrained microinteractions while preserving the existing content, layout character, color system, and overall quiet tone.

## Confirmed Direction

Use the "restrained premium" direction:

- Keep the current visual style and color palette unchanged.
- Do not add Projects, Notes, Research Results, or similar sections yet.
- Do not introduce decorative particles, strong glow effects, new background visuals, or stronger color accents.
- Improve motion mostly through timing, one-time reveal behavior, hover feedback, copy feedback, and a refined greeting interaction.

## Greeting Hand Interaction

The greeting hand should become the main memorable interaction, but it must remain subtle.

### Initial Page Entry

On first page entry, the hand emoji should perform a natural greeting wave:

- Run exactly two complete wave cycles.
- Stop after the two cycles.
- Do not keep looping forever.
- Use a wrist-like transform origin around `70% 75%`.
- Keep the movement small and organic, with uneven rotation values rather than a mechanical left-right swing.

Suggested timing:

- Duration per wave cycle: about `1.1s` to `1.3s`.
- Total initial greeting duration: about `2.2s` to `2.6s`.
- Easing: `ease-in-out` or a similarly soft custom curve.

### Click / Tap High-Five

After the initial wave finishes, clicking or tapping the hand should trigger one high-five effect per click.

The selected version is V2:

- Start from the resting hand state.
- Slightly pull back and tilt.
- Move forward with a restrained scale peak around `scale(1.13)`.
- Show one very subtle expanding ring using the existing `--accent` color with low opacity.
- Rebound lightly and return to rest.
- Trigger once per click or tap.
- Allow repeated clicks by removing and re-adding the active class after each animation.

Suggested key values:

- Total duration: about `520ms` to `560ms`.
- Maximum scale: `1.12` to `1.14`, with `1.13` as the target.
- Ring size: small enough to feel like contact feedback, not a visual effect layer.
- Ring opacity: low, using `rgba()` derived from the existing accent tone or a CSS variable based on `--accent` if implementation allows.

The current simple icon scale-up should be replaced because it reads as ordinary hover feedback rather than a high-five.

## Other Microinteractions

### Avatar

Keep the avatar interaction subtle:

- On hover, use a small lift or image scale only.
- Suggested movement: `translateY(-2px)` and/or `scale(1.02)`.
- Avoid continuous floating animation.

### Contact Links and Emails

Keep the existing underline expansion pattern, but make interaction feedback feel more intentional:

- Hover: keep color transition and underline expansion.
- Click copy: keep toast, and optionally add a brief pressed state on the clicked email.
- Do not add new colors or heavy decoration.

### Interest Tags

Keep tags quiet:

- Hover with a small `translateY(-2px)` movement.
- Avoid glow, strong shadows, or animated backgrounds.
- Use the existing background opacity changes only.

### Education Item

The education left border can gain a one-time reveal:

- When the section appears, animate the left line growing from top to bottom.
- Keep the animation short and subtle.
- This should be a one-time entrance detail, not a loop.

### Theme Toggle

Keep the existing theme wipe:

- Preserve the current light and dark color system.
- Keep the wipe origin tied to the toggle button.
- Avoid slowing text color transitions so much that the page feels laggy.
- Respect `prefers-reduced-motion`.

## Accessibility and Motion Preferences

All motion should respect `prefers-reduced-motion: reduce`:

- Disable the initial wave animation.
- Disable the high-five ring and transform animation.
- Keep theme switching functional.
- Keep copy behavior and toast text available.

Interactive elements should remain keyboard accessible:

- The hand should be clickable or button-like if it becomes an explicit interaction target.
- It should have an accessible label such as "High five".
- Focus styles should remain visible.

## Non-Goals

The following are intentionally out of scope for this pass:

- Adding Projects, Notes, Research, Blog, or Publications sections.
- Changing the existing color palette.
- Changing the site's overall layout or typography direction.
- Adding animation libraries.
- Adding sound effects.
- Adding particles, cursor-following effects, or background decorative motion.

## Implementation Boundaries

The likely implementation should stay within the existing static site files:

- `index.html`: only minor semantic changes if the hand needs to become an accessible interaction target.
- `style.css`: update greeting wave animation, add high-five keyframes and ring styling, tune subtle hover motions.
- `script.js`: add click handling for replayable high-five animation.

No build tooling or framework should be introduced.

## Success Criteria

The change is successful when:

- The site still reads as the same quiet personal homepage.
- The hand waves two cycles on entry, then stops.
- Each click or tap on the hand triggers one restrained V2 high-five effect.
- The high-five feels tactile without the icon becoming too large.
- No new content sections are added.
- Existing light and dark themes remain visually consistent.
- Reduced-motion users do not receive unnecessary animation.
