// Select the toggle button
const toggleButton = document.getElementById('toggle-button')

// Toggle functionality
let isToggled = false

toggleButton.addEventListener('click', () => {
  isToggled = !isToggled

  if (isToggled) {
    console.log('Toggled ON')
    toggleButton.classList.add('toggle__button--toggled-on')
    toggleButton.classList.remove('toggle__button--toggled-off')
  } else {
    console.log('Toggled OFF')
    toggleButton.classList.add('toggle__button--toggled-off')
    toggleButton.classList.remove('toggle__button--toggled-on')
  }
})

// Initialize default state
toggleButton.classList.add('toggle__button--toggled-off')
