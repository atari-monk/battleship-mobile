# CSS

## Not selectable

To make an element not selectable in CSS, you can use the user-select property. This property controls the user's ability to select text or elements on a page.

To prevent selection, you can set user-select to none like this:

```css
.element {
  user-select: none;
}
```

This will disable text selection for the .element class.
This will make the content of the element non-selectable across modern browsers.

## BEM

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
