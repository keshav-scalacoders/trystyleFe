# Theme customizer

This project includes a runtime theme customizer available at the /theme route.

- Change primary and secondary colors, font family and base font size.
- Changes are applied immediately and saved to localStorage so they'll persist across visits.

How to use

1. Run the dev server and open the site.
2. Visit `/theme` to open the customizer UI.
3. Pick colors, choose the font and adjust the base font size. The app updates instantly.

Notes

- Colors update CSS variables (`--primary`, `--secondary`) so Tailwind utilities which rely on those variables will reflect the change.
- Foreground contrast for primary/secondary is auto-adjusted (simple heuristic) so white/black text will be chosen for readability.

What changed (design-focused)

- Navbar: updated to use `--background` on scroll and semantic tokens for text and menu items (sticky header will now blend with the current theme).
- Hero: headline uses a gradient derived from `--primary` → `--secondary`, the promo badge and background accent use `--secondary` making the hero align with chosen colors.
- NotFound page: uses semantic background/foreground colors and uses `--destructive` for the alert icon.
- Buttons & UI: core `Button` component already uses `--primary` and `--secondary` variables; focus rings now use `--ring` (set to primary by default) so focus styles also follow chosen primary.

Design rationale

- Changes were applied to high-impact, meaningful places only (header, hero, global card background and action buttons). I intentionally avoided replacing every neutral color — many small UI elements should remain muted to preserve visual hierarchy: backgrounds, tertiary text and input placeholders remain using `--muted`/`--muted-foreground`.

Next steps / optional

- Bundle or preload a set of fonts (Google Fonts) so selecting 'Poppins' or 'Roboto' in the customizer changes immediately without requiring the developer to load fonts manually.
- Improve contrast calculation and permit an accessibility preview to flag low-contrast color combos.
