# Thomas Ginting — Portfolio

An immersive, responsive portfolio featuring six original projects: Senja Coffee, Forma, Loom, Flowdesk, MerchantBoard, and ImageKit. The opening combines a live chrome sculpture, large typography, and native scrolling. Project previews link to the live demo websites and their source repositories.

[Open the portfolio](https://jokojoyo.github.io/)

## Run locally

Use Node.js 22.12+ and npm. From this folder:

```powershell
npm ci
npm run dev
```

Open http://127.0.0.1:4300/.

For the production build:

```powershell
npm run build
npm run preview
```

Open http://127.0.0.1:4301/. The `dist` folder is the complete static site; it does not need a backend. Serve it over HTTP rather than opening `index.html` directly from disk. The relative Vite base supports hosting in a subdirectory. The published repository serves compiled files from its root and keeps this editable project in `source/`; run the commands above from that folder.

## How the animation works

- **React** renders the content, navigation, theme, and motion controls.
- **Three.js** renders a reflective torus knot using a room environment, a physical material, and a perspective camera. Its angle responds to the pointer and the left/right buttons.
- **GSAP ScrollTrigger** maps the native scroll position to sculpture rotation, recession, and subtle project entrances. It does not take over scrolling.
- **CSS** controls responsive layout, hover/focus treatments, and light/dark themes.

Small screens initially show an optimized poster with an explicit **Explore in 3D** button. WebGL errors also retain the poster. The live scene is loaded in a separate JavaScript chunk, caps pixel ratio at 1.5, targets 30 frames per second, and skips rendering while offscreen or in a hidden tab. A global motion button pauses animation; a reduced-motion preference starts it paused.

## Edit the portfolio

| File | What to change |
| --- | --- |
| `Portfolio.jsx` | Name, headline, project data, destination links, about copy, and controls |
| `ImmersiveScene.jsx` | Sculpture geometry, material, camera, lighting, and motion |
| `style.css` | Colors, fonts, spacing, responsive layout, and control styles |
| `index.html` | Page title, description, social metadata, and asset preloads |
| `public/` | Self-hosted fonts, project screenshots, favicon, and sculpture posters |

The project data lives in the `projects` array near the top of `Portfolio.jsx`. Every project is labeled **Original concept**. The closing action points to the verified `Jokojoyo` GitHub profile; no personal email, client claims, or contact service has been invented.

## Assets

Project previews are derived from screenshots of the existing websites in this collection. `prepare-assets.mjs` records their source paths and can regenerate them when run inside the parent collection; normal builds use the included files and do not require that script. The chrome poster was generated for this portfolio. Asset origin or generation prompts are retained in PNG metadata and adjacent JSON files. Space Grotesk and Manrope are self-hosted copies from the collection's Flowdesk project.

The generated poster is a still interpretation of the live sculpture. The interactive model has its own geometry and lighting.

## Verification

The production build, browser console, responsive desktop/mobile layouts, theme persistence, mobile navigation, pause control, rotation/reset controls, and mobile 3D activation were checked. Six genuine website previews and live/source destinations are included. Layouts were inspected at 1440, 390, and 320 CSS pixels. Reduced-motion handling and WebGL fallback were reviewed in the source; they have not been tested on every browser or device.

The six-project completion review returned **ship**, scoring two material fixes resolved: complete-article scroll motion preserves title-link spacing, and product/design documentation describes all six projects. The final local mobile Lighthouse audit scored 92 performance, 100 accessibility, 100 best practices, and 100 SEO. All six live demo URLs returned HTTP 200 on October 3, 2026. These checks are not an exhaustive cross-browser certification. Visual review records are in `.impeccable/review/completion/` in this workspace; older seed and automatic-gate limitations remain recorded as historical evidence.
