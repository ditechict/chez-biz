# Architecture rules

- Define shared palette and font roles in global CSS and expose them through Tailwind; pages stay consistent without duplicating visual values.
- Self-host display and body fonts in public/fonts; typography must not depend on third-party font requests.
- Centralize pathname transitions in PageTransitions with opacity-only animation and user reduced-motion support; fixed navigation and lightboxes retain their viewport positioning, and query changes preserve page state.