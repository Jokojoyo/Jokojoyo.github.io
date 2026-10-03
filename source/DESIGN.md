---
name: "Thomas Ginting portfolio"
description: "Ink, silver and expressive typography framing original interactive work."
colors:
  ground: "#101112"
  ink: "#ecece8"
  muted: "#b4b6b7"
  line: "#2c2e30"
  silver: "#bfc5c8"
  ground-light: "#ecece8"
  ink-light: "#171819"
  muted-light: "#515557"
  line-light: "#c4c7c7"
  silver-light: "#555e62"
typography:
  display:
    fontFamily: "'Space Grotesk', sans-serif"
    fontSize: "clamp(72px, 6.25vw, 100px)"
    fontWeight: 600
    lineHeight: 0.94
    letterSpacing: "-.035em"
  headline:
    fontFamily: "'Space Grotesk', sans-serif"
    fontSize: "clamp(52px, 4.17vw, 68px)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-.035em"
  title:
    fontFamily: "'Space Grotesk', sans-serif"
    fontSize: "clamp(30px, 2.7vw, 44px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.8
  action:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  category:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  control: "6px"
  preview: "14px"
  compact-surface: "12px"
spacing:
  gutter: "clamp(24px, 5.73vw, 92px)"
  mobile-gutter: "24px"
  control-inset: "12px"
  content-gap: "24px"
  mobile-project-gap: "75px"
components:
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    padding: "8px 0 10px"
  icon-button:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    width: "40px"
    height: "40px"
  icon-button-hover:
    backgroundColor: "{colors.line}"
  motion-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.control}"
    padding: "12px 15px"
  motion-button-hover:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.ground}"
  project-preview:
    backgroundColor: "{colors.line}"
    rounded: "{rounded.preview}"
  project-category:
    textColor: "{colors.muted}"
    typography: "{typography.category}"
  navigation:
    textColor: "{colors.ink}"
  mobile-navigation:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.compact-surface}"
    padding: "{spacing.control-inset}"
---

# Design System: Thomas Ginting portfolio

## Overview

**Creative North Star: "The Chrome Stage"**

Matte ink fields and a reflective silver sculpture frame an expressive, spacious portfolio. Large Space Grotesk headings establish hierarchy; Manrope keeps the supporting content direct and readable. Depth comes from the sculpture and the work itself, with understated controls around them.

The palette supports dark and light themes. Preview images retain the individual visual worlds of the six demos: Senja Coffee, Forma, Loom, Flowdesk, MerchantBoard and ImageKit. This document records the implemented system; composition-specific choices remain in the surface brief.

**Key Characteristics:**

- Ink and warm-white fields with a restrained silver accent.
- Large geometric headings paired with quieter supporting copy.
- Asymmetric project layouts and generous vertical space.
- Live material depth with user-controlled motion.

## Colors

Silver is the primary interface accent; neutral surfaces carry the typography and imagery.

### Primary

- **Silver** (`silver`): link hover, focus outlines, selection and scrollbar detail.
- **Deep Silver** (`silver-light`): the same interface roles in the light theme.

### Neutral

- **Matte Ink** (`ground`) and **Warm White** (`ink`): default background and foreground; the closing section inverts these roles.
- **Muted Silver** (`muted`) and **Graphite Line** (`line`): supporting text, dividers and control hover surfaces.
- The `*-light` entries are the observed light-theme overrides, not an additional accent palette.

**The Project Identity Rule.** Preserve each demo's own colors inside its preview imagery.

## Typography

Self-hosted Space Grotesk supplies headings and the wordmark, with sans-serif fallback. Self-hosted Manrope supplies body text, navigation and controls, also with sans-serif fallback. The display is geometric and tightly tracked; supporting copy has a more relaxed reading rhythm.

The frontmatter records the desktop hero, work heading, project title, project description, action and category roles. The about heading uses `clamp(46px, 4.8vw, 76px)` with a 1.03 line-height; the closing heading uses `clamp(70px, 6.25vw, 100px)` with a .95 line-height.

At widths up to 760px, the hero uses `clamp(60px, 15.4vw, 90px)`; project titles generally use 34px and descriptions use 14px. The MerchantBoard and ImageKit titles use `clamp(28px, 7.3vw, 34px)` with a tighter icon gap. At 360px and below, the hero uses 52px and other project titles use 30px; the tool pair retains its scoped clamp. The work and about headings use 50px and 48px respectively. Supporting labels remain secondary to names.

**The Title First Rule.** Place project category metadata below the project title.

## Layout

The page uses a fluid horizontal gutter, with the fixed mobile gutter from the frontmatter. Desktop project layouts retain a 30% introduction column beside the featured work, a staggered 1.13fr/1fr pair, and a 25% aside beside Flowdesk. MerchantBoard and ImageKit extend that rhythm with a reversed 1fr/1.13fr pair, with ImageKit offset by 150px and both previews retaining their wide 1440/747 ratio. These are observed page arrangements, not required templates for future pages.

Desktop sections use broad vertical intervals: the project pair begins after 150px, the Flowdesk row after 160px, and the about section uses 130px top and 140px bottom padding. At 760px and below, grids become a single column and project gaps use the mobile spacing token. The mobile navigation becomes an expandable panel; it closes on selection, Escape or an outside pointer action. The tablet adaptation covers 761–1100px; wide-screen refinements begin at 1700px.

## Elevation & Depth

The chrome knot provides material depth through real lighting and reflection. Content surfaces are mostly flat, with thin dividers and rounded image clipping. Only the fixed motion control and mobile navigation use ambient shadows: `0 5px 20px #0002` and `0 15px 40px #0003`. These exact values also appear in the sidecar.

## Shapes

Controls have modest rounded corners; larger project previews use the preview radius, reducing to the compact-surface radius on mobile. Text links are open, underlined shapes rather than filled pills. Interface borders are one pixel. The decorative sculpture is an independent material object, not a card treatment.

## Components

- **Text links:** restrained inline text with a trailing SVG icon and a muted bottom border. Hover changes the text to silver and strengthens the border; mobile links use a minimum height of 42px.
- **Icon controls:** square controls for theme, menu and sculpture rotation; hover adds the line-color surface. Disabled sculpture controls use .5 opacity and a waiting cursor until the scene is ready.
- **Motion control:** a fixed foreground-colored button with inverted text and a small ambient shadow. Its pressed state and label expose pause/play behavior.
- **Navigation:** an inline desktop group with a 26px gap. The mobile panel uses a border, compact radius, ambient shadow and padded links.
- **Project preview and title:** the image and project name link to the demo; category metadata follows the title. A separate source link sits beside the feature list. Preview hover or keyboard focus gently scales the image and reveals the explore label; the label is hidden on mobile.
- **Sculpture:** a generated poster is present before the live scene is ready and remains the fallback on failure. Desktop enables the scene initially; mobile offers 3D opt-in. Rotation advances in 30-degree steps, with a separate reset.

All interactive links and buttons use a two-pixel silver focus outline with six-pixel offset. Native-scroll GSAP progress turns and recedes the scene and lifts later project articles by up to 36px, keeping each preview and its text together. Pausing reverts those scroll transforms and stops autonomous sculpture motion. Reduced-motion preference initially pauses motion and removes CSS transitions; the user can explicitly choose to play. Live rendering caps pixel ratio at 1.5 and targets 30fps, skipping renders off-screen or in hidden tabs.

**The Motion Control Rule.** Keep content available with motion paused and preserve the generated poster when the live scene is unavailable.

## Do's and Don'ts

### Do:

- **Do** retain Space Grotesk headings and Manrope supporting text.
- **Do** use theme variables for interface surfaces, text and focus treatments.
- **Do** preserve each project's imagery and visual identity.
- **Do** keep project titles above their category metadata.
- **Do** preserve pause, reduced-motion handling and the generated poster fallback.

### Don't:

- **Don't** recolor project previews to match the portfolio palette.
- **Don't** make navigation or project access depend on animation.
- **Don't** substitute a CSS shape for the implemented poster fallback.
