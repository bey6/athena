// 验证
function verify() {
  let form = document.getElementsByTagName('form')[0]
  if (!form) return false
  if (!form.api_name.value) {
    let names = document.getElementsByName('api_name')
    if (names.length > 0) {
      names[0].focus()
    }
    return false
  }
  if (!form.api_path.value) {
    let paths = document.getElementsByName('api_path')
    if (paths.length > 0) {
      paths[0].focus()
    }
    return false
  }
  return true
}

// 添加字段
function handleAdd(e) {
  e = e || window.event
  let containerDiv = document.createElement('div')
  containerDiv.className = 'res-params'
  containerDiv.innerHTML = `
  <div class="text-align-center">
    <button onclick="handleRemove();return false;">❌</button>
  </div>
  <div class="flex flex-4 text-align--center">
    <select class="flex-1" name="fields_layer">
      <option value="root">root</option>
      <option value="list">list</option>
    </select>
  </div>
  <div class="flex flex-4 text-align--center">
    <input class="flex-1" type="text" name="fields_name" autocomplete="off" spellcheck="false" required/>
  </div>
  <div class="flex flex-4 text-align--center">
    <select class="flex-1" name="fields_type">
      <option value="undefined">无值</option>
      <option value="id">id</option>
      <option value="name">姓名</option>
      <option value="gender">性别</option>
      <option value="address">地址</option>
      <option value="nation">民族</option>
      <option value="date">日期</option>
      <option value="datetime">日期时间</option>
      <option value="number">数字</option>
      <option value="float">小数</option>
      <option value="colorhex">颜色hex</option>
      <option value="colorrgb">颜色rgb</option>
      <option value="dictionary">字典</option>
    </select>
  </div>
  <div class="flex flex-4 text-align--center">
    <input class="flex-1" type="text" name="fields_range" autocomplete="off" spellcheck="false" 
           onchange="handleRangeChange" value=" "/>
  </div>
  `

  document.getElementsByClassName('params-panel')[0].appendChild(containerDiv)
  return false
}

// 删除字段
function handleRemove(e) {
  e = e || window.event
  e.target.parentNode.parentNode.remove()
  return false
}

// 至少给个空格
function handleRangeChange(e) {
  e = e || window.event
  if (!e.target.value) {
    e.target.value = ' '
  }
}
