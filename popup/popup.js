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
