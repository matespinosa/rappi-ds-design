---
"@rappi-ds/react": minor
"@rappi-ds/tokens": patch
---

Add the `Flag` primitive and improve layout flexibility across `Drawer`, `CardTable`, and `SegmentedControl`.

- **Drawer**: internal content padding aligned with the header, plus `showPrimaryAction` to hide individual footer CTAs
- **CardTable**: two-column fields align to content width instead of splitting the card evenly
- **SegmentedControl**: options size to their content; thumb repositioning on resize
- **Tokens**: add `--drawer-content-padding` linked to the drawer header padding
