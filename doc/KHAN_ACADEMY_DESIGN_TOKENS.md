# Khan Academy Design Token Audit

Source date: 2026-08-09

This document summarizes reusable design tokens and component patterns observed
from Khan Academy's public design-system materials. The exact values below come
from the public `@khanacademy/wonder-blocks-tokens@15.0.0` package and Khan
Academy's public notes about the Wonder Blocks color system.

Use this as a reference for building an original education/product UI. Do not
copy Khan Academy logos, trademarks, illustrations, copy, course content, or
page layouts in a way that suggests affiliation or endorsement.

## Design System Model

Khan Academy's Wonder Blocks color system is organized around semantic tokens:

- Domains: `core`, `learning`, and `component`
- Layers: `background`, `border`, `foreground`, and `shadow`
- Contexts: `base`, `instructive`, `neutral`, `disabled`, `success`, `warning`,
  `critical`, `knockout`, and `overlay`
- Intensity scale: `subtle`, `default`, and `strong`

`instructive` is their functional equivalent of a primary/brand action color.
It is used for the main next step or interactive affordance in a view.

## Core Colors

These are the newer `thunderblocks` semantic values from the public token CSS.

| Token | Value | Usage |
| --- | --- | --- |
| `core.background.base.subtle` | `#F8F9FB` | App/page subtle background |
| `core.background.base.default` | `#FFFFFF` | Main surface |
| `core.background.base.strong` | `#DFEAFF` | High-emphasis pale surface |
| `core.background.instructive.subtle` | `#EBF1FD` | Soft primary surface |
| `core.background.instructive.default` | `#5753FA` | Primary action fill |
| `core.background.instructive.strong` | `#363498` | Pressed/strong primary |
| `core.background.neutral.subtle` | `#EDEDEE` | Muted panels |
| `core.background.neutral.default` | `#717279` | Neutral filled UI |
| `core.background.neutral.strong` | `#191918` | Strong text/dark surface |
| `core.background.success.subtle` | `#F1FBF1` | Success feedback surface |
| `core.background.warning.subtle` | `#FEF8E7` | Warning/in-progress surface |
| `core.background.critical.subtle` | `#FEF4F4` | Error/destructive surface |
| `core.background.overlay.default` | `rgba(25,25,24,0.50)` | Modal overlay |

## Foreground Colors

| Token | Value | Usage |
| --- | --- | --- |
| `core.foreground.neutral.strong` | `#191918` | Primary text |
| `core.foreground.neutral.default` | `#4A4C53` | Secondary text |
| `core.foreground.neutral.subtle` | `#717279` | Helper text |
| `core.foreground.instructive.default` | `#5753FA` | Links and action labels |
| `core.foreground.instructive.strong` | `#363498` | Pressed link/action text |
| `core.foreground.knockout.default` | `#FFFFFF` | Text on dark/primary fills |
| `core.foreground.disabled.default` | `#B5B6B9` | Disabled text |
| `core.foreground.success.default` | `#3C6D4A` | Success text/icon |
| `core.foreground.warning.default` | `#966B00` | Warning text/icon |
| `core.foreground.critical.default` | `#BE2626` | Error/destructive text |

## Border Colors

| Token | Value | Usage |
| --- | --- | --- |
| `core.border.neutral.subtle` | `#CBCBCD` | Card/input border |
| `core.border.neutral.default` | `#8A8B90` | Stronger control border |
| `core.border.neutral.strong` | `#4A4C53` | High-contrast border |
| `core.border.instructive.default` | `#6E78FF` | Focus/selected border |
| `core.border.instructive.strong` | `#363498` | Pressed primary border |
| `core.border.critical.default` | `#E22D2D` | Error border |
| `core.border.success.default` | `#579F6C` | Success border |
| `core.border.warning.default` | `#FCC539` | Warning border |
| `core.border.disabled.default` | `#E0E0E1` | Disabled border |

## Action Colors

| Token | Background | Foreground | Border | State |
| --- | --- | --- | --- | --- |
| `action.primary.progressive.rest` | `#5753FA` | `#FFFFFF` | `transparent` | Primary CTA |
| `action.primary.progressive.press` | `#363498` | `#FFFFFF` | `transparent` | Pressed CTA |
| `action.secondary.progressive.rest` | `#FFFFFF` | `#5753FA` | `#8A8B90` | Secondary CTA |
| `action.secondary.progressive.press` | `#EBF1FD` | `#363498` | `#363498` | Pressed secondary |
| `action.tertiary.progressive.rest` | `transparent` | `#5753FA` | `transparent` | Text/button link |
| `action.primary.destructive.rest` | `#BE2626` | `#FFFFFF` | `transparent` | Destructive primary |
| `action.disabled` | `#EDEDEE` | `#B5B6B9` | `#CBCBCD` | Disabled controls |

## Feedback Colors

| Token | Background | Border | Icon | Text |
| --- | --- | --- | --- | --- |
| `feedback.info.subtle` | `#EBF1FD` | `#BFCAFF` | `#5753FA` | `#363498` |
| `feedback.success.subtle` | `#F1FBF1` | `#BCEBBB` | `#3C6D4A` | `#24432D` |
| `feedback.warning.subtle` | `#FEF8E7` | `#FCC539` | `#966B00` | `#5F4500` |
| `feedback.critical.subtle` | `#FEF4F4` | `#FBB1B1` | `#BE2626` | `#8E1C1C` |
| `feedback.neutral.subtle` | `#EDEDEE` | `#CBCBCD` | `#717279` | `#4A4C53` |

## Typography

| Token | Value |
| --- | --- |
| `font.family.sans` | `Plus Jakarta Sans, serif` |
| `font.family.serif` | `"Noto Serif", serif` |
| `font.family.mono` | `Inconsolata, monospace` |
| `font.weight.regular` | `400` |
| `font.weight.medium` | `500` |
| `font.weight.semi` | `600` |
| `font.weight.bold` | `700` |
| `font.weight.black` | `900` |

### Type Scale

| Role | Size | Line height |
| --- | --- | --- |
| `body.xsmall` | `1.2rem` | `1.6rem` |
| `body.small` | `1.4rem` | `1.8rem` |
| `body.medium` | `1.6rem` | `2.4rem` |
| `heading.small` | `1.6rem` | `2.0rem` |
| `heading.medium` | `1.8rem` | `2.4rem` |
| `heading.large` | `2.0rem` | `2.8rem` |
| `heading.xlarge` | `2.4rem` | `3.2rem` |
| `heading.xxlarge` | `3.2rem` | `4.0rem` |

## Spacing And Sizing

The scale is rem-based with a 10px mental model if the root font size is 62.5%.

| Token | Value |
| --- | --- |
| `size.010` | `0.1rem` |
| `size.020` | `0.2rem` |
| `size.040` | `0.4rem` |
| `size.060` | `0.6rem` |
| `size.080` | `0.8rem` |
| `size.100` | `1.0rem` |
| `size.120` | `1.2rem` |
| `size.160` | `1.6rem` |
| `size.180` | `1.8rem` |
| `size.200` | `2.0rem` |
| `size.240` | `2.4rem` |
| `size.320` | `3.2rem` |
| `size.400` | `4.0rem` |
| `size.440` | `4.4rem` |
| `size.480` | `4.8rem` |
| `size.640` | `6.4rem` |
| `size.800` | `8.0rem` |
| `size.960` | `9.6rem` |

## Radius, Borders, And Shadows

| Token | Value | Usage |
| --- | --- | --- |
| `radius.0` | `0px` | Square/cell reset |
| `radius.040` | `4px` | Compact controls |
| `radius.080` | `8px` | Buttons, cards, menus |
| `radius.120` | `12px` | Pressed cards, modal panels |
| `radius.240` | `24px` | Pills and switches |
| `radius.full` | `50%` | Circular avatars/icons |
| `border.none` | `0px` | Borderless controls |
| `border.thin` | `1px` | Default hairline |
| `border.medium` | `2px` | Focus/pressed states |
| `border.thick` | `4px` | Selected state emphasis |
| `shadow.low` | `0 2px 2px 0 color-mix(in srgb, #252368 20%, transparent)` | Menus/light cards |
| `shadow.mid` | `0 4px 8px 0 color-mix(in srgb, #252368 20%, transparent)` | Raised cards |
| `shadow.high` | `0 8px 16px 0 color-mix(in srgb, #252368 20%, transparent)` | Modals |

## Component Tokens

### Button

| Property | Value |
| --- | --- |
| Radius | `8px`, pressed `12px` |
| Small height | `2.6rem` |
| Medium height | `4.0rem` |
| Large height | `4.4rem` |
| Primary padding | `0.8rem` small, `1.6rem` medium, `1.8rem` large |
| Secondary padding | `0.8rem` small, `1.6rem` medium, `1.8rem` large |
| Font weight | `700` |
| Icon size | `1.2rem` small, `1.8rem` medium, `2.0rem` large |

### Icon Button

| Property | Value |
| --- | --- |
| Radius | `8px`, pressed `12px` |
| XS size | `2.4rem` |
| Small size | `3.2rem` |
| Medium size | `4.0rem` |
| Large size | `4.8rem` |
| Icon XS | `1.6rem` |
| Icon small/medium/large | `2.4rem` |

### Cell / List Item

| Property | Value |
| --- | --- |
| Radius | `8px`, pressed `12px` |
| Min height | `4.4rem` |
| Gap | `1.2rem` |
| Padding block | `1.2rem` |
| Padding inline | `1.2rem` |
| Title line height | `2.0rem` |
| Subtitle size | `1.2rem` |
| Divider | None in `thunderblocks` |

### Banner

| Property | Value |
| --- | --- |
| Radius | `8px` |
| Border | `1px` all sides |
| Padding start | `1.6rem` |
| Gap | `1.2rem` |
| Icon size | `1.8rem` |
| Label size | `1.6rem` |
| Link decoration | Underline |

### Dropdown / Menu

| Property | Value |
| --- | --- |
| Listbox radius | `8px` |
| Listbox padding | `0.8rem` inline and block |
| Listbox shadow | `shadow.low` |
| Opener radius | `8px` |
| Item padding | `1.2rem` block and inline |
| Item pressed radius | `12px` |
| Item font weight | `600` |

### Form Field

| Property | Value |
| --- | --- |
| Radius | `8px` |
| Height | `4.4rem` |
| Padding block | `1.0rem` |
| Padding inline | `1.2rem` |
| Error border | `2px` |
| Press border | `1px` |

### Modal

| Property | Value |
| --- | --- |
| Panel radius | `12px` |
| Dialog shadow | `shadow.high` |
| Overlay | `rgba(25,25,24,0.50)` |

## Widget Design Recipes

These are original component recipes inspired by the token system. They are
intended to capture the useful product feel without copying Khan Academy's
protected assets or exact layouts.

### Learning Progress Card

Purpose: show a course/module with current progress and one next action.

- Container: `background.base.default`, `border.neutral.subtle`, `radius.120`,
  `shadow.low`, padding `2.4rem`
- Top row: circular subject glyph `4.0rem`, soft subject background, title
  `heading.medium`, metadata `body.small`
- Progress: 8px track in `background.neutral.subtle`, fill in
  `background.instructive.default`, radius full
- Footer: primary button height `4.0rem`; secondary text action beside it on
  desktop or below it on mobile
- Interaction: raise to `shadow.mid` on hover, press radius `12px`, focus ring
  `border.instructive.default`

### Practice Task Widget

Purpose: compact card for a recommended exercise or lesson.

- Container: `background.instructive.subtle`, no heavy shadow, `radius.080`,
  padding `1.6rem`, gap `1.2rem`
- Label: `body.xsmall`, uppercase optional, color `foreground.instructive.strong`
- Title: `heading.small`, color `foreground.neutral.strong`
- Body: `body.small`, color `foreground.neutral.default`
- CTA: tertiary progressive action with bold text and right arrow icon
- Status chip: use feedback colors such as `success.subtle` for completed,
  `warning.subtle` for in-progress, and `critical.subtle` only for blocked/error

### Course List Cell

Purpose: scan-friendly row in a course directory or dashboard.

- Row: min height `4.4rem`, padding `1.2rem`, gap `1.2rem`, `radius.080`
- Left icon: `2.4rem`, foreground `instructive.default`
- Title: `body.medium`, weight `600`, color `neutral.strong`
- Subtitle: `body.xsmall`, color `neutral.subtle`
- Right affordance: chevron icon button, `4.0rem`
- Selected state: `background.instructive.subtle` and
  `border.instructive.default`

### Feedback Banner

Purpose: show coach-like information, completion messages, and warnings.

- Container: `radius.080`, `border.thin`, padding start `1.6rem`, gap `1.2rem`
- Use the semantic feedback set by state:
  - Info: `#EBF1FD` background, `#5753FA` icon, `#363498` text
  - Success: `#F1FBF1` background, `#3C6D4A` icon, `#24432D` text
  - Warning: `#FEF8E7` background, `#966B00` icon, `#5F4500` text
  - Critical: `#FEF4F4` background, `#BE2626` icon, `#8E1C1C` text
- Add a dismiss icon button only when the message is non-essential.

## CSS Starter

```css
:root {
  --edu-bg: #F8F9FB;
  --edu-surface: #FFFFFF;
  --edu-text: #191918;
  --edu-text-muted: #4A4C53;
  --edu-primary: #5753FA;
  --edu-primary-strong: #363498;
  --edu-primary-soft: #EBF1FD;
  --edu-border: #CBCBCD;
  --edu-radius-sm: 4px;
  --edu-radius-md: 8px;
  --edu-radius-lg: 12px;
  --edu-shadow-low: 0 2px 2px 0 color-mix(in srgb, #252368 20%, transparent);
  --edu-font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
}

.learning-card {
  background: var(--edu-surface);
  border: 1px solid var(--edu-border);
  border-radius: var(--edu-radius-lg);
  box-shadow: var(--edu-shadow-low);
  color: var(--edu-text);
  font-family: var(--edu-font-sans);
  padding: 2.4rem;
}

.learning-card__button {
  min-height: 4rem;
  border: 0;
  border-radius: var(--edu-radius-md);
  background: var(--edu-primary);
  color: white;
  font-weight: 700;
  padding-inline: 1.6rem;
}

.learning-card__button:active {
  border-radius: var(--edu-radius-lg);
  background: var(--edu-primary-strong);
}
```

## Sources

- Khan Academy Wonder Blocks color-system article:
  https://blog.khanacademy.org/how-we-rebuilt-khan-academys-color-system-from-the-ground-up/
- Public Wonder Blocks tokens package:
  https://unpkg.com/@khanacademy/wonder-blocks-tokens@15.0.0/styles.css
- Public token package metadata:
  https://unpkg.com/@khanacademy/wonder-blocks-tokens@15.0.0/package.json
- Khan Academy trademark and brand usage policy:
  https://support.khanacademy.org/hc/en-us/articles/202263034-What-is-Khan-Academy-s-Trademark-and-Brand-Usage-Policy
