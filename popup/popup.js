function localizeHtmlPage() {
  const objects = $('html')
  for (let j = 0; j < objects.length; j++) {
    const obj = objects[j]

    const valStrH = obj.innerHTML.toString()
    const valNewH = valStrH.replace(/__MSG_(\w+)__/g, function (match, v1) {
      return v1 ? chrome.i18n.getMessage(v1) : ''
    })

    if (valNewH != valStrH) {
      obj.innerHTML = valNewH
    }
  }
}
localizeHtmlPage()

const options = $('.customCheckboxInput')

const getOptions = (options) => {
  for (let i = 0; i < options.length; i++) {
    chrome.storage.sync.get({ [options[i].id]: true }).then((item) => {
      options[i].checked = item[options[i].id]
    })
  }
}

const setOption = (key, value) => {
  chrome.storage.sync.set({ [key]: value })
}

options.change(function () {
  setOption(this.id, this.checked)
})

getOptions(options)
