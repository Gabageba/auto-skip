const config = {
  attributes: true,
  attributeFilter: ['class'],
}

function validateOpenningSkip(value) {
  return (
    value.nodeName === 'DIV' &&
    value.classList.contains('vjs-overlay-bottom-left') &&
    value.innerText === 'Пропустить заставку'
  )
}

const callback = function (mutationList) {
  for (let mutation of mutationList) {
    if (!mutation.target.classList.contains('vjs-hidden')) {
      mutation.target.click()
    }
  }
}

const getSkipOpenningButton = (validator) => {
  let skipOpenning
  const buttons = $('.vjs-overlay-skip-intro')
  for (let i = 0; i < buttons.length; i++) {
    if (validator(buttons[i])) {
      skipOpenning = buttons[i]
    }
  }
  return skipOpenning
}

const observer = new MutationObserver(callback)

$(window).on('load', function () {
  const skipOpenningButton = getSkipOpenningButton(validateOpenningSkip)
  if (skipOpenningButton) {
    observer.observe(skipOpenningButton, config)
  }
})
