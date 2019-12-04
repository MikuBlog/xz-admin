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
const newPage = window.open()
newPage.document.body.innerHTML = page
removePrintHeader(newPage)
newPage.print()
}


export default toPrint