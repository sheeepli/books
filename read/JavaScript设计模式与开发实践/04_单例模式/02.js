// 4.2 透明的单例模式
let CreateDiv = (function () {
  let instance;

  let CreateDiv = function (html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    return (instance = this);
  };

  CreateDiv.prototype.init = function () {
    let div = document.createElement("div");
    div.innerHTML = this.html
    document.body.appendChild(div)
  };

  return CreateDiv
})();


let a = new CreateDiv('test1')
let b = new CreateDiv('test2')

console.log(a === b)