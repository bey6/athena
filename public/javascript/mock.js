onload = function () {
  function verify() {
    let form = document.getElementsByTagName('form')[0]
    if (!form) return false
    if (!form.api_name.value) return false
    if (!form.api_path.value) return false
    return true
  }

  let btnPreview = document.getElementById('preview')
  if (btnPreview) {
    btnPreview.onclick = function (e) {
      if (!verify()) {
        console.log('false')
        e.preventDefault()
        return false
      }
      console.log('true')
    }
  }

  let btnSubmit = document.getElementById('submit')
  if (btnSubmit) {
    btnSubmit.onclick = function (e) {
      if (!verify()) return false
    }
  }

  let paramsBlock = document.getElementsByClassName('params-panel')[0]
  if (paramsBlock) {
    paramsBlock.onclick = function (e) {
      e = e || window.event
      if (e.target.tagName === 'BUTTON' && e.target.textContent === '+') {
        console.log('添加一个新字段')
      } else {
        console.log('删除当前字段')
      }
      return false
    }
  }
}
