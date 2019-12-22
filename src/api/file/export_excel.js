import FileSaver from "file-saver"
import XLSX from "xlsx"

/**
 * @description 导出excel
 * @param {DOM | Array(DOM)} obj 
 * @param {String} name 
 */
export default (obj, name = 'table') => {
  let vb = ""
  if(obj.length) {
    let table = document.createElement('table')
    for(let i = 0, len = obj.length; i < len; i ++) {
      table.appendChild(obj[i].cloneNode(true))
    }
    vb = XLSX.utils.table_to_book(table);
  }else {
    vb = XLSX.utils.table_to_book(obj);
  }
  let vbout = XLSX.write(vb, { bookType: 'xlsx', bookSST: true, type: 'array' });
  try {
    FileSaver.saveAs(new Blob([vbout], { type: 'application/octet-stream' }), `${name}.xlsx`);
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, vbout);
  }
  return vbout;
}