// 4.3 用代理实现单例模式
const CreateDiv = function(html) {
  this.html = html
  this.init()
}

CreateDiv.prototype.init = function() {
  const div = document.createElement('div')
  div.innerHTML = this.html
  document.body.appendChild(div)
}

// 引入代理
const ProxySingletonCreateDiv = (function() {
  let instance;
  return function(html) {
    if (!instance) {
      instance = new CreateDiv(html)
    }
    return instance
  }
})()

var a = new ProxySingletonCreateDiv('sven1')
var b = new ProxySingletonCreateDiv('sven2')

console.log(a===b)