@AGENTS.md

## Design System: Bangul (via Veaury)

This project uses Bangul — Mamikos' design system. All components are pre-wrapped for React and ready to use.

### Rules

- Always import Bangul components from `bangul-vue/react`
- Always add `'use client'` to any file that imports from `bangul-vue/react`
- Never use Tailwind classes or custom CSS for UI that Bangul covers
- Never write `className` with `bg-c-*` BEM class names — use component props instead
- Use Vue prop names directly: `variant`, `size`, `loading`, `block`, `disabled`, `placeholder`, etc.
- For available components and their props, read the Vue source at `node_modules/bangul-vue/src/components/{ComponentName}/{ComponentName}.vue`

### Available components (import from `bangul-vue/react`)

`BangulButton` `BangulInput` `BangulInputPassword` `BangulCard` `BangulField`
`BangulText` `BangulIcon` `BangulBadgeCounter` `BangulCheckbox` `BangulRadio`
`BangulSelect` `BangulModal` `BangulAlert` `BangulTag` `BangulLabel`
`BangulTabs` `BangulTab` `BangulAccordion` `BangulDivider` `BangulAvatar`
`BangulSkeleton` `BangulLoadingSpinner` `BangulToast` `BangulTooltip`
(and more — check `node_modules/bangul-vue/dist/src/react/index.js` for the full list)

### Prop / event quick-ref

| Vue template          | React JSX                   |
| --------------------- | --------------------------- |
| `variant="primary"`   | `variant="primary"`         |
| `:loading="true"`     | `loading={true}`            |
| `:block="true"`       | `block` or `block={true}`   |
| `@click="handler"`    | `onClick={handler}`         |
| `@input="handler"`    | `onInput={handler}`         |
| `@change="handler"`   | `onChange={handler}`        |

Default slot → React `children`. Named slots → `slots={{ header: () => <span>...</span> }}`.

### Known limitation: do NOT nest Veaury components inside other Veaury components' slots

Veaury-wrapped components (`BangulCard`, `BangulField`, etc.) mount a Vue app for their slot content. Placing another Veaury-wrapped component inside that slot causes the inner component to silently fail to render.

**Bad** — BangulInput inside BangulCard's slot (nested Veaury-in-Veaury):
```tsx
<BangulCard><BangulInput /></BangulCard>  // BangulInput won't render
```

**Good** — use plain BEM HTML for containers, Veaury only for leaf components:
```tsx
<div className="bg-c-card bg-c-card--md">
  <div className="bg-c-field">
    <div className="bg-c-field__label"><label>Email</label></div>
    <BangulInput type="email" />   {/* leaf — works fine */}
  </div>
  <BangulButton variant="primary">Submit</BangulButton>  {/* string slot — works fine */}
</div>
```
