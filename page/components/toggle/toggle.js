import { guiContener } from '../../script.js'

let isToggled = false
let isTouch = false

const messages = {
  initMsg: 'toggle button',
}

export default function init() {
  const toggleButton = document.getElementById('toggle-button')
  const gridInstance = guiContener.getInstanceById('fleet-grid-1').jsInstance

  function handleToggle(event) {
    isToggled = !isToggled

    if (isToggled) {
      toggleButton.classList.add('toggle__button--toggled-on')
      toggleButton.classList.remove('toggle__button--toggled-off')
    } else {
      toggleButton.classList.add('toggle__button--toggled-off')
      toggleButton.classList.remove('toggle__button--toggled-on')
    }

    gridInstance.fleetService.toggleOrientation()

    gridInstance.paintOnHover(
      gridInstance.placementHandler.currentHoverPosition
    )
  }

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

  console.log(messages.initMsg)
}
