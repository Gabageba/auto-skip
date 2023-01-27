const validate = (element) => {
  return (
    this.permitted &&
    element.nodeName === 'DIV' &&
    element.classList.contains('vjs-overlay-bottom-left') &&
    !element.classList.contains('vjs-hidden') &&
    element.innerText === 'Пропустить заставку'
  )
}

const action = (element) => {
  element.click()
}
