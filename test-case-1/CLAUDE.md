@AGENTS.md

## Design System: Bangul
This project uses the Bangul design system (Mamikos). CSS is already imported.
Rules:
- Always read `node_modules/bangul-vue/docs/COMPONENTS.md` for Bangul component class reference
- Always read `node_modules/bangul-vue/docs/DESIGN.md` for design tokens and principles
- Use Bangul BEM class names : do not write custom CSS or Tailwind for components that exist in Bangul
- Class pattern: `bg-c-{component}` + `bg-c-{component}--{modifier}`