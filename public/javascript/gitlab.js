onload = function () {
  function bindVerifyHandler(node) {
    if (node.getAttribute('required')) {
      node.oninvalid = function (e) {
        e.target.validationMessage = '这是一个必填字段: ' + node.target.name
      }
      node.oninput = function (e) {
        setCustomValidity('')
      }
    }
  }
  var inputs = document.getElementsByTagName('input')
  for (var i = 0; i < inputs.length; i++) {
    bindVerifyHandler(inputs[i])
  }
}
