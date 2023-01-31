const config = {
  attributes: true,
  attributeFilter: ['class'],
}

let options

const getOptions = () => {
  chrome.storage.sync.get(null).then((item) => {
    options = item
  })
}

chrome.storage.onChanged.addListener((changes) => {
  for (let [key, { newValue }] of Object.entries(changes)) {
    options[key] = newValue
    if (newValue) {
      addObserver(key)
    } else if (!newValue) {
      deleteObserver(key)
    }
  }
})

const getButton = (validator) => {
  let currentButton = []
  const buttons = $('.vjs-overlay-skip-intro')
  for (let i = 0; i < buttons.length; i++) {
    if (validator(buttons[i])) {
      currentButton.push(buttons[i])
    }
  }
  return currentButton
}

const validateOpenningSkip = (value) => {
  return (
    value.nodeName === 'DIV' &&
    value.classList.contains('vjs-overlay-bottom-left') &&
    value.innerText === 'Пропустить заставку'
  )
}

const validateNextEpisode = (value) => {
  return (
    value.nodeName === 'DIV' &&
    value.classList.contains('vjs-overlay-bottom-right') &&
    value.innerText === 'Следующая серия'
  )
}

const addObserver = (key) => {
  switch (key) {
    case 'skipOpenning':
      const skipOpenningButton = getButton(validateOpenningSkip)
      if (skipOpenningButton[0]) {
        observer.observe(skipOpenningButton[0], config)
      }
      break
    case 'skipEnding':
      const skipEndingButtons = getButton(validateNextEpisode)
      if (skipEndingButtons[0]) {
        observer.observe(skipEndingButtons[0], config)
      }
      break
    case 'nextEpisode':
      const nextEpisodeButtons = getButton(validateNextEpisode)
      if (nextEpisodeButtons[1]) {
        observer.observe(nextEpisodeButtons[1], config)
      } else if (nextEpisodeButtons[0]) {
        observer.observe(nextEpisodeButtons[0], config)
      }
      break
    default:
      break
  }
}

const turnOnObserver = () => {
  for (key in options) {
    if (options[key]) {
      addObserver(key)
    }
  }
}

const deleteObserver = () => {
  observer.disconnect()
  turnOnObserver()
}

const callback = (mutationList) => {
  for (let mutation of mutationList) {
    if (!mutation.target.classList.contains('vjs-hidden')) {
      mutation.target.click()
    }
  }
}

const autoOpenFullscreen = () => {
  $('.vjs-fullscreen-control').click()
}

const observer = new MutationObserver(callback)
getOptions()

$(window).on('load', function () {
  $('body').keyup((event) => {
    if (event.keyCode === 70) {
      $('.vjs-fullscreen-control').click()
    }
  })

  turnOnObserver()
  if (options.autoplayEpisode) {
    setTimeout(() => {
      $('.vjs-big-play-button').click()
    }, 500)
  }
})
