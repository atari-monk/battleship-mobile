import { loadComponent } from '../../script.js'

export function init() {
  console.log('menu component')
}

document.getElementById('start-button').addEventListener('click', async () => {
  await showGridStatic()
})

async function showGridStatic() {
  console.log('showGridStatic test')
  const menu = document.getElementById('menu-container')
  menu.classList.add('hide')

  //const gridStatic = document.getElementById('grid-static-container')
  //gridStatic.classList.remove('hide')
  await loadComponent('grid-static-container', 'grid_static')
}
