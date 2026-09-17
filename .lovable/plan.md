# Premium Hero, Gallery, and Music Interaction Refinement

## Hero slider
- Remove only the two selected circular previous/next arrow controls.
- Keep autoplay, swipe navigation, and the existing slide indicators so the slider remains usable without visual clutter.
- Expand the hero from three to six curated, non-duplicated images. Keep the current lead image and strongest existing live image, then add:
  - the black-shirt live performance,
  - the red-shirt Lord of the Drinks performance,
  - the close studio/live microphone portrait.
- Give each image a deliberate focal position so the artist remains clearly framed on desktop and mobile.

## Gallery preview under the hero
- Reduce the visual footprint of the three preview images with a narrower maximum-width composition and shorter, stable aspect ratios.
- Preserve the asymmetric editorial arrangement, animation, image quality, and link to the full gallery.
- Check mobile spacing so the thumbnails feel intentionally compact rather than cramped.

## Muted red treatment
- Shift the **Listen now** button closer to a true red while retaining a subdued, premium finish.
- Refine the existing semantic brand colour and its darker interaction state rather than adding one-off colours.

## Music interactions
- On the homepage Music section, make each track title, number, and description transition to muted red when the track area is hovered or keyboard-focused.
- In the listening-room music player, apply the same red treatment to track-selection buttons and the active track information.
- Provide equivalent mobile feedback through selected, focus-visible, and pressed states, since touch devices do not have persistent hover.
- Keep Spotify playback, track switching, and the paused-rewards message unchanged.

## Technical details
- Update the hero slide data and remove only the arrow-control block in `HeroCarousel`.
- Reuse the existing CDN image pointers and `/press/studio-session.jpg`; no new generated or external imagery.
- Use the existing `brand` design token across button and music states, adjusting its HSL values to a duller true red.
- Use grouped interaction states and stable dimensions; preserve reduced-motion behavior and accessibility labels.

## Verification
- Confirm six distinct hero images load and crop correctly at desktop and mobile sizes.
- Confirm arrow controls are gone while autoplay, indicators, and swipe still work.
- Confirm the smaller gallery preview does not overlap or distort images.
- Confirm hover, keyboard, touch/pressed, and selected music states are visibly red and readable.
- Check the home page and listening room in the running preview, then confirm diagnostics are clean.
