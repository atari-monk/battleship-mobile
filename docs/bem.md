# BEM

**BEM (Block, Element, Modifier)** is a CSS naming convention that promotes code reusability, readability, and maintainability. It divides UI components into three parts:

1. **Block**: Represents a standalone entity or component (e.g., `menu`).
2. **Element**: A child or part of a block, separated by a double underscore (e.g., `menu__item`).
3. **Modifier**: Represents a variation or state of a block or element, separated by a double hyphen (e.g., `menu__item--active`).

Example:

```html
<div class="menu">
  <div class="menu__item menu__item--active">Home</div>
  <div class="menu__item">About</div>
</div>
```

This convention ensures consistent and scalable styles, making it easier to manage large projects.
