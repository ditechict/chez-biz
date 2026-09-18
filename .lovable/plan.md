# Visual Review of the Hero, Gallery, and Music Refinement

Verify the already-implemented refinements in the running preview. No code changes unless the review reveals a defect.

## Checks

1. **Hero slider (desktop 1280x1800 and mobile 390x844)**
   - Exactly five distinct hero images load and crop correctly (artist stays framed).
   - The two circular previous/next arrow buttons are gone.
   - Autoplay advances, slide indicators work, and swipe still navigates on mobile.

2. **Gallery preview under the hero**
   - The three thumbnails render smaller (narrower max-width, shorter fixed heights) with no overlap or distortion, on desktop and mobile.

3. **Listen now button**
   - Renders in the muted true red (brand token), darker on hover.

4. **Music interactions**
   - Homepage Music section: track number, title, and description turn red on hover and keyboard focus.
   - Listening room (/app): track buttons show red hover/focus/pressed states and the selected track is clearly red; readable contrast.

5. **Diagnostics**
   - No new console errors or failed image/network requests; build log is clean.

## Method

- Drive the preview with Playwright (Chromium, headless) at both viewport sizes; capture screenshots of the hero, gallery preview, music section, and listening room.
- Simulate hover, keyboard focus, and touch/pressed states to confirm the red treatments.
- Review screenshots and console output, then report findings with evidence.

## If a defect is found

- Fix only the defect, keeping the approved design decisions (five curated hero images, no portrait-neon/portrait-orange, muted red brand token, removed arrows).
