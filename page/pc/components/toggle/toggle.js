import {
  hitToggle,
  paintOnHover,
  currentHoverPosition,
} from './../grid/grid.js'

const toggleButton = document.getElementById('toggle-button')

let isToggled = false

function handleToggle(event) {
  isToggled = !isToggled

  if (isToggled) {
    toggleButton.classList.add('toggle__button--toggled-on')
    toggleButton.classList.remove('toggle__button--toggled-off')
  } else {
    toggleButton.classList.add('toggle__button--toggled-off')
    toggleButton.classList.remove('toggle__button--toggled-on')
  }

  hitToggle()

  paintOnHover(currentHoverPosition)
  console.log('isToggled', isToggled)
}

let isTouch = false

toggleButton.addEventListener(
  'touchstart',
  (event) => {
    isTouch = true
    handleToggle(event)
  },
  { passive: true }
)

toggleButton.addEventListener('click', (event) => {
  if (isTouch) {
    isTouch = false
    return
  }
  handleToggle(event)
})

toggleButton.classList.add('toggle__button--toggled-off')

const messages = {
  initMsg: 'toggle button',
}

export function init() {
  console.log(messages.initMsg)
}
