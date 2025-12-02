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
