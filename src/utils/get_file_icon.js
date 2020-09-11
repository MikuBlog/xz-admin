/**
 * @author xuanzai
 * @description 传入文件url获取对应的文件图片
 * @returns String
 */
export function getFileTypeIconWithSuffix(ext) {
  if (arrayContain(['jpg', 'png', 'gif'], ext)) {
    return require('@/assets/img/file_img.png')
  } else if (arrayContain(['mp4', 'mp3', 'avi'], ext)) {
    return require('@/assets/img/file_excle.png')
  } else if (arrayContain(['xlsx', 'xls', 'XLSX', 'XLS'], ext)) {
    return require('@/assets/img/file_excle.png')
  } else if (arrayContain(['doc', 'docx', 'DOC', 'DOCX'], ext)) {
    return require('@/assets/img/file_word.png')
  } else if (arrayContain(['rar', 'zip'], ext)) {
    return require('@/assets/img/file_zip.png')
  } else if (ext === 'pdf') {
    return require('@/assets/img/file_pdf.png')
  } else if (ext === 'ppt' || ext === 'pptx') {
    return require('@/assets/img/file_ppt.png')
  } else if (arrayContain(['txt', 'text'], ext)) {
    return require('@/assets/img/file_txt.png')
  }
  return require('@/assets/img/file_unknown.png')
}