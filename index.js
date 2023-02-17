const wrapper = document.getElementById('wrapper')

/**
 * Example 2: element removed
 */

const delete1 = document.getElementById('delete-1')
const delete2 = document.getElementById('delete-2')
const delete3 = document.getElementById('delete-3')
const delete4 = document.getElementById('delete-4')
const example2 = document.getElementById('example-2')
const rows = [...example2.querySelectorAll('.row')]
const inputs = [...example2.querySelectorAll('input')]
const block = example2.querySelector('.block')
const hideRow = index => rows[index].classList.add('hidden')

delete1.addEventListener('click', () => {
  hideRow(0)
  rows[1].focus()
})

delete2.addEventListener('click', () => {
  hideRow(1)
  delete3.focus()
})

delete3.addEventListener('click', () => {
  hideRow(2)
  inputs[3].focus()
})

delete4.addEventListener('click', () => {
  hideRow(3)
  const emptyMsg = document.createElement('span')
  emptyMsg.innerHTML = 'You deleted all items :('
  block.appendChild(emptyMsg)
  block.focus()
  const newButton = document.createElement('button')
  newButton.innerHTML = 'Restore all items'
  newButton.style.display = 'block'
  newButton.style.margin = '1em auto'
  block.appendChild(newButton)
  newButton.addEventListener('click', () => {
    rows.forEach(r => r.classList.remove('hidden'))
    inputs[0].focus()
    block.removeChild(emptyMsg)
    block.removeChild(newButton)
  })
})

/**
 * Example 3: element added
 */

const example3 = document.getElementById('example-3')
const addItemButton = example3.querySelector('button')
const newItem = example3.querySelector('.row[role=region]')

addItemButton.addEventListener('click', () => {
  newItem.classList.remove('hidden')
  newItem.focus()
})

/**
 * Example 4: modal dialog
 */

const trigger = document.getElementById('modal-launcher')
const modal = document.querySelector('.modal')
const modalClose = modal.querySelector('button')
const closeModal = () => {
  modal.classList.add('hidden')
  wrapper.setAttribute('aria-hidden', 'false')
  wrapper.inert = false
  trigger.focus()
}

trigger.addEventListener('click', () => {
  modal.classList.remove('hidden')
  modal.focus()
  wrapper.setAttribute('aria-hidden', 'true')
  wrapper.inert = true
})

modalClose.addEventListener('click', closeModal)

modal.addEventListener('keydown', e => {
  if (e.which === 27) {
    closeModal()
    return
  }

  if ((e.target !== modal) || e.which !== 9) {
    return
  }

  e.preventDefault()
  modalClose.focus()
})

modalClose.addEventListener('keydown', e => {
  if (e.which !== 9) {
    return
  }

  e.preventDefault()
})

/**
 * Example 5: SPA navigation
 */

const example5 = document.getElementById('example-5')
const spaPageLink = document.getElementById('new-page-link')
const spaPage = document.getElementById('spa-page')
const spaPageHeading = spaPage.querySelector('h1')
const back = document.getElementById('back')
const loaderWrapper = document.querySelector('.loader')
const loader = loaderWrapper.querySelector('[role="progressbar"]')

const MAX_TIMEOUT = 2200
const MIN_TIMEOUT = 650
const randomTimeout = () => Math.floor(Math.random() * (MAX_TIMEOUT - MIN_TIMEOUT + 1) + MIN_TIMEOUT)
const renderLoader = callback => {
  loaderWrapper.classList.remove('hidden')
  loader.focus()

  setTimeout(() => {
    loaderWrapper.classList.add('hidden')
    callback()
  }, randomTimeout())
}

spaPageLink.addEventListener('click', e => {
  e.preventDefault()
  wrapper.classList.add('hidden')

  renderLoader(() => {
    spaPage.classList.remove('hidden')
    spaPageHeading.focus()
  })
})

back.addEventListener('click', e => {
  e.preventDefault()
  spaPage.classList.add('hidden')

  renderLoader(() => {
    wrapper.classList.remove('hidden')
    example5.focus()
  })
})
