document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.overlay')

  overlay.addEventListener('click', () => {
    overlay.classList.add('overlay--hidden')
  })
})
