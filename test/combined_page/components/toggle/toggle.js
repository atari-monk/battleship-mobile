import { hitToggle, paintOnHover } from './../grid/grid.js'

const toggleButton = document.getElementById('toggle-button')

// Toggle functionality
let isToggled = false

// Function to handle toggling
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

  // Call paintOnHover if necessary (pass simulated event for touch or click)
  const simulatedEvent = {
    clientX: event.clientX,
    clientY: event.clientY,
    touches: event.touches,
  }
  paintOnHover(simulatedEvent)
}

// Add click and touch event listeners
toggleButton.addEventListener('click', handleToggle)
toggleButton.addEventListener('touchstart', handleToggle, { passive: true }) // Passive for touch events

// Initialize default state
toggleButton.classList.add('toggle__button--toggled-off')

const messages = {
  initMsg: 'toggle button',
}

export function init() {
  console.log(messages.initMsg)
}
