---
name: ProctorPulse Minimal Enterprise
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006242'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d55'
  on-tertiary-container: '#bdffdb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1.5rem
  margin-lg: 2rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system embodies high-integrity administrative control, systematic precision, and cognitive calm. Designed specifically for an Online Examination Management System (線上測驗管理系統), the interface prioritizes immediate comprehension during high-stakes testing windows. The aesthetic combines clean enterprise SaaS structure with ultra-precise data hierarchy, discarding decorative excess in favor of functional clarity.

The visual direction employs a Modern Enterprise SaaS approach: crisp borders, disciplined white space, subtle resting elevations, and prominent functional color signifiers. It delivers an authoritative yet frictionless operational workspace for university proctors, certification officers, and question-bank editors managing concurrent exams, automated scoring, and real-time candidate verification.

## Colors

The palette establishes an authoritative, functional hierarchy with strict state semantics:

- **Primary (`#2563EB`)**: Royal Blue for primary actions, active navigation states, selected rows, and critical batch triggers.
- **Secondary (`#0F172A`)**: Deep Navy-Slate for foundational framing, headings, high-priority typography, and persistent sidebar structures.
- **Success / Tertiary (`#10B981`)**: Vibrant Emerald Green for active proctoring sessions, passing scores, clean integrity validations, and published exam states.
- **Danger (`#EF4444`)**: High-alert Red reserved exclusively for exam termination, proctoring violations, flagged cheat events, and destructive actions.
- **Warning (`#F59E0B`)**: Amber for flagged test-takers, network latency alerts, and pending reviews.
- **Neutral Canvas (`#F8FAFC`)**: A cool, clinical slate-grey backdrop that reduces glare during long evaluation windows and contrasts cleanly against crisp white (`#FFFFFF`) card surfaces.
- **Structural Borders (`#E2E8F0`)**: Low-distraction division lines that reinforce dense table grids and card containers without visual clutter.

## Typography

The type hierarchy prioritizes high information density and tabular precision using **Inter** as the universal interface type face (backed by system fallback `Noto Sans TC` for traditional Chinese script rendering). 

- All data grid values, counters, timers, and scoring breakdowns must enforce OpenType tabular figures (`font-variant-numeric: tabular-nums`) to prevent alignment jitter across live monitoring rows.
- Section titles and modal headers leverage medium and semi-bold weights with negative tracking to maintain a clean, compact profile.
- Micro-labels and status indicators use uppercase transformation with gentle letter spacing (`0.02em` - `0.04em`) to ensure legibility at sizes as small as 11px.

## Layout & Spacing

The portal is architected around a desktop-first, fixed-sidebar and fluid-content shell:
- **Navigation Shell**: Persistent left sidebar fixed at 240px width (collapsible to 64px icon-rail), with a fixed 56px utility top-bar for candidate search, notification bells, and session timers.
- **Content Area**: Fluid container spanning between 1200px and 1600px max-width, maintaining a minimum outer margin of `1.5rem` (`24px`).
- **Data Grids**: 12-column flex-grid system with dense `1rem` (`16px`) gutters to enable comprehensive data side-by-sides (e.g., student live feed vs. proctor event log).
- **Rhythm Principle**: Internal card padding uses a compact default of `1rem` to preserve vertical screen real estate, expanding to `1.5rem` strictly on empty-state banners or multi-step exam configuration flows.

## Elevation & Depth

Visual hierarchy uses a combined strategy of **crisp borders** (`1px solid #E2E8F0`) and **subtle ambient shadows** to establish disciplined structure without visual weight:

- **Level 0 (Canvas)**: Background surface in `#F8FAFC`. Zero elevation.
- **Level 1 (Panels & Cards)**: Pure white `#FFFFFF` surface, framed by `#E2E8F0` border, with ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`.
- **Level 2 (Dropdowns & Action Menus)**: `#FFFFFF` surface, `#CBD5E1` border, elevated with `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)`.
- **Level 3 (Modals & Flyout Drawers)**: `#FFFFFF` surface, floating over an active modal backdrop composed of `#0F172A` tinted at 40% opacity (`rgba(15, 23, 42, 0.40)`) with an integrated `backdrop-filter: blur(4px)`. Shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)`.

## Shapes

The design system utilizes **Soft** corner radiuses (Level 1) to convey architectural rigor, enterprise credibility, and alignment precision:
- Standard buttons, input fields, dropdown toggles, and table cells utilize `0.25rem` (`4px`) to `0.375rem` (`6px`) radii.
- Large panel cards, data tables, and modal dialogs utilize `rounded-lg` at `0.5rem` (`8px`).
- Status badges and state chips depart from the soft rule, applying full pill radius (`9999px`) to create clear visual separation between interactive rectangular controls and passive metadata markers.

## Components

### Buttons
- **Primary**: Solid `#2563EB` fill, `#FFFFFF` text, `4px` radius. Hover: `#1D4ED8`. Active: `#1E40AF`. Focus: 2px ring offset with `rgba(37, 99, 235, 0.35)`.
- **Secondary**: Crisp white `#FFFFFF` fill with `1px solid #E2E8F0`, `#0F172A` text. Hover: `#F1F5F9`.
- **Destructive**: Solid `#EF4444` for primary danger; white background with `#EF4444` border and text for secondary danger triggers.
- **Sizes**: Compact standard: 32px height (for dense table actions); Default: 38px height.

### Badges & State Pills
- **Active / Running**: Emerald Green tint (`#ECFDF5` background, `#047857` text, `#A7F3D0` border).
- **Scheduled / Pending**: Slate tint (`#F1F5F9` background, `#475569` text, `#CBD5E1` border).
- **Flagged / Cheating Alert**: Red tint (`#FEF2F2` background, `#B91C1C` text, `#FECACA` border) accompanied by a pulsating 6px status dot.
- Form factor: 20px height, uppercase `label-sm` typography, `9999px` pill border radius.

### Input Fields & Controls
- **Inputs**: Crisp white background, `1px solid #CBD5E1`, `0.375rem` border radius, padding `0.5rem 0.75rem`. Focus transition to `border-color: #2563EB` paired with `box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15)`.
- **Checkboxes & Radios**: 16px square/circle with `#CBD5E1` border. Checked state: `#2563EB` fill with white checkmark glyph.

### Data Tables
- Sticky header row with `#F8FAFC` background, `1px solid #E2E8F0` bottom border, and uppercase muted column headers (`label-md`).
- Row height: 44px (high-density view). Hover state applies `#F8FAFC`. Selected row applies subtle `#EFF6FF` tint with a 2px left border accent in `#2563EB`.

### Specialized Exam Components
- **Live Proctoring Feed Card**: Pure white card with segmented multi-candidate webcam thumbnails, overlaid with network health markers (ping/latency) and AI-integrity score indicators.
- **Exam Countdown Timer**: High-visibility pill component featuring monospaced tabular numbers (`JetBrains Mono`), changing from `#0F172A` to `#EF4444` when under the 10-minute threshold.