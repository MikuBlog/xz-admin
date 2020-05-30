function removePrintHeader(page) {
  const style = document.createElement('style')
  style.className = "print"
  style.innerHTML = "@page { margin: .5rem }"
  page.document.querySelector('head').appendChild(style)
}

/**
 * @author xuanzai
 * @description 打印
 * @param { HTML } page 
 */
function toPrint(page = "") {
  const iframe = document.createElement('iframe')
  iframe.style.cssText = `
    position: absolute;
    width: 0;
    height: 0;
    border: none;
  `
  document.body.appendChild(iframe)
  const doc = iframe.contentWindow.document
  if((typeof page).toLowerCase() === 'string') {
    doc.write(page)
  }else {
    doc.body.appendChild(page.cloneNode(true))
  }
  doc.close()
  removePrintHeader(iframe.contentWindow)
  iframe.contentWindow.focus()
  iframe.contentWindow.print()
  setTimeout(() => {
    document.body.removeChild(iframe)
  }, 1000)
}


export default toPrint