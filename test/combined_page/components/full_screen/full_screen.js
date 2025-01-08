import { loadComponent } from '../../script.js'

export function init() {
  console.log('full screen overlay request component')
}

// Wait for the DOM to fully load
//document.addEventListener('DOMContentLoaded', () => {
const fullScreenButton = document.getElementById('fs-fullScreenButton')
const overlay = document.getElementById('fs-overlay')

// Function to enable full screen
const goFullScreen = async () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    // Firefox
    document.documentElement.mozRequestFullScreen()
  } else if (document.documentElement.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    document.documentElement.webkitRequestFullscreen()
  } else if (document.documentElement.msRequestFullscreen) {
    // IE/Edge
    document.documentElement.msRequestFullscreen()
  }
  overlay.style.display = 'none' // Hide the overlay

  await showMenu()
}

// Add event listener to the button
fullScreenButton.addEventListener('click', goFullScreen)
//})

//todo: this should be in menu.js
async function showMenu() {
  //const menu = document.getElementById('menu-container')
  //menu.classList.remove('hide')
  await loadComponent('menu-container', 'menu')
}
