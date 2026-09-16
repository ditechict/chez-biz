# Videos, Missing Images, and Listen Now Button

## 1. Why images are missing (confirmed)

The gallery, press and events content tables are all empty — the site asks for photos and gets nothing back, so the gallery preview, gallery page and press photos render blank. The hero still shows because it falls back to a built-in image.

Fix: repopulate the content tables with the artist's real photos.

- Gallery entries for the four live performance photos already stored with the project (stage, live in white, live in black, Lord of the Drinks) plus the existing press photo set (press shot, portrait street, portrait neon, portrait orange, live stage, crowd, backstage, studio session), each with proper alt text, captions and ordering.
- Press page entries for the downloadable photos and the logo.
- Press "Listen" entries for the Spotify songs already featured on the home page.
- Events stay empty until real dates are supplied.

Then re-check every page (home, gallery, press, events) so nothing is broken or blank.

## 2. Videos section (as previously planned)

Curated videos from the official YouTube channel:

1. **Quality** — `7l8nqaYYXCM` — lead feature
2. **Beautiful** — `kmnXCNNwH8Q` — supporting
3. **Hustling** — `jn7sXXUiN4U` — supporting

### Home page: "Visuals"
- Full-width section after "The Music", before Booking.
- **Quality** in one large 16:9 lead position with its title outside the player.
- **Beautiful** and **Hustling** below in two columns on desktop, stacked on mobile.
- Minimal copy; a restrained "View channel" link.

### Press page
- Compact inline playback of **Quality** and **Beautiful** in the Listen area.
- Existing Spotify embeds and downloadable assets stay as they are.

### Player treatment
- One reusable video component: fixed 16:9 frame, accessible title, fullscreen, privacy-enhanced YouTube.
- Shows the official thumbnail with a play control first; the player loads only after a click, so pages stay fast.
- No autoplay. Reduced-motion respected, keyboard accessible.

## 3. "Listen now" button
Give the hero's Listen now button a muted, deep red treatment — clearly red but not bright — with a slightly darker red on hover, added as a proper theme colour rather than a one-off.

## Technical details
- Seed `gallery_images` and `press_assets` via migration, using the existing `.asset.json` CDN URLs and `/press/*.jpg` files.
- New `src/content/videos.ts` holding titles, video IDs and channel URL; shared by Home and Press.
- New `YouTubeEmbed` component using `youtube-nocookie.com` and official thumbnails.
- Add a semantic accent token in the global stylesheet and a matching button variant; no hardcoded colour utilities.

## Verification
- Confirm every page shows its images, with no broken or empty sections.
- Confirm all three videos play inline, with fullscreen and keyboard operation.
- Check desktop and mobile layouts for clean 16:9 sizing and no overlap.
- Confirm the build and preview diagnostics are clean.
