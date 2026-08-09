---
name: Press & Provocation
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#414942'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#717971'
  outline-variant: '#c1c9c0'
  surface-tint: '#3c674a'
  primary: '#09371e'
  on-primary: '#ffffff'
  primary-container: '#234e33'
  on-primary-container: '#90be9c'
  inverse-primary: '#a2d2ae'
  secondary: '#a63b0a'
  on-secondary: '#ffffff'
  secondary-container: '#fe7a48'
  on-secondary-container: '#671e00'
  tertiary: '#333020'
  on-tertiary: '#ffffff'
  tertiary-container: '#4a4635'
  on-tertiary-container: '#bab49e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#beeec9'
  primary-fixed-dim: '#a2d2ae'
  on-primary-fixed: '#00210f'
  on-primary-fixed-variant: '#244f34'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#ffb59b'
  on-secondary-fixed: '#380d00'
  on-secondary-fixed-variant: '#812800'
  tertiary-fixed: '#e9e2cb'
  tertiary-fixed-dim: '#cdc6b0'
  on-tertiary-fixed: '#1e1c0d'
  on-tertiary-fixed-variant: '#4b4736'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-xl:
    fontFamily: Anton
    fontSize: 96px
    fontWeight: '400'
    lineHeight: 100%
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 110%
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 120%
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 160%
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 150%
  label-caps:
    fontFamily: Archivo Narrow
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 120%
    letterSpacing: 0.1em
spacing:
  unit: 4px
  gutter: 24px
  margin: 32px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system adopts a **Bold Brutalist** aesthetic, drawing inspiration from mid-century analog political posters and satirical newsprint. It prioritizes high-impact communication through heavy typography, raw structural elements, and a distinct lack of digital "polish."

The personality is intentionally provocative and unrefined, using heavy borders and physical-style offsets to create a tactile, "printed" feel. This shift transforms technical infrastructure into a medium for bold statements, moving away from sleek SaaS trends toward a more authoritative, editorial, and slightly irreverent tone.

## Colors
This design system utilizes a palette inspired by natural pigments and vintage ink.

- **Primary (Forest Green):** Used for large-scale headlines and major brand elements. It conveys authority and a "grassroots" foundation.
- **Secondary (Burnt Orange):** A high-action accent color reserved for primary calls to action and critical highlights.
- **Surface (Warm Cream):** Replaces clinical whites with an off-white tint to mimic the texture of aged paper or parchment.
- **Neutral (Charcoal):** Used for body copy, borders, and shadows. It is never pure black, retaining a softer, "inked" quality.

## Typography
The typography is the core of this system's identity. 

- **Display & Headlines:** Use **Anton** for all major headings. Its condensed, bold nature allows for maximum impact. Headlines should be tightly tracked and scaled aggressively.
- **Body Text:** Use **Hanken Grotesk** for readability. It provides a clean, neutral contrast to the aggressive display face, ensuring technical information remains accessible.
- **Microcopy & Metadata:** Use **Archivo Narrow** in uppercase for labels, navigational elements, and captions to maintain the "editorial" aesthetic.

## Layout & Spacing
The layout follows a **Rigid Grid** philosophy. Content is contained within heavy structural borders that define clear boundaries. 

- **Grid:** A 12-column grid is used for desktop, but elements frequently span the full width to emphasize the poster-like style.
- **Density:** High information density is preferred. Spacing should feel intentional and structural rather than "airy." 
- **Borders:** All major sections are separated by solid 2px or 4px charcoal borders.

## Elevation & Depth
Depth is created through **Hard Offsets** rather than soft shadows. This system avoids blurs, gradients, or transparency.

- **Hard Shadows:** Interactive elements (like primary buttons) feature a solid, non-blurred offset to the bottom-right, typically in the neutral charcoal color.
- **Layering:** Components appear as physical layers of paper stacked atop one another. 
- **Flattened Hierarchy:** Visual importance is signaled through color blocks and border weight rather than Z-axis elevation.

## Shapes
This design system uses a strictly **Sharp** shape language. All corners are 0px radius. This reinforces the "cut" feel of traditional press and the brutalist nature of the brand. Rectilinear forms are mandatory for containers, buttons, and input fields.

## Components
- **Buttons:** Rectangular with a 2px solid border. The primary button uses the secondary (burnt orange) fill with a 4px solid charcoal offset shadow.
- **Input Fields:** Thick 2px bottom border or full box border with the surface (cream) background.
- **Cards:** Defined by heavy 2px charcoal borders. Internal padding should be generous (24px+) to keep text from touching the structural lines.
- **Lists:** Items are separated by horizontal 1px or 2px lines, creating a spreadsheet or table-of-contents feel.
- **Chips/Badges:** Simple boxes with Archivo Narrow caps, using the primary forest green for positive status and neutral for general tags.
- **Progress Bars:** Flat blocks of color within a bordered container; no rounded caps or glows.