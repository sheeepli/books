// 4.5 惰性单例

// 是单例没错，这样做的话，无论我们是否需要，都会创建这个弹窗
/**
const loginLayer = (function() {
  const div = document.createElement('div')
  div.innerHTML = 'login modal'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
})()

document.getElementById('loginBtn').onclick = function() {
  loginLayer.style.display = 'block'
}
*/

// 失去了单例的效果。这样做的话，每次点击都会创建要给新的弹窗
/**
const createLoginLayer = function() {
  const div = document.createElement('div')
  div.innerHTML = 'login modal'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}
document.getElementById('loginBtn').onclick = function() {
  const loginLayer = createLoginLayer()
  loginLayer.style.display = 'block'
}
*/

//
/**
const createLoginLayer = function () {
  let div;
  return function () {
    if (!div) {
      div = document.createElement("div");
      div.innerHTML = "login modal";
      div.style.display = "none";
      document.body.appendChild(div);
    }
    return div;
  };
}();
document.getElementById('loginBtn').onclick = function() {
  const loginLayer = createLoginLayer()
  loginLayer.style.display = 'block'
}
*/

// 上面这段代码仍然违反单一职责原则，创建对象和管理单例的逻辑都放在了 createLoginLayer 对象内部。
// 如果下次我们需要创建页面中唯一的标签（比如 iframe），我们需要如法炮制，将对象完整抄一遍

// 管理单例
const getSingle = function (fn) {
  /** 将逻辑中不变的部分提取出来
   * 
   * let obj;
   * if (!obj) {
   *   obj = xxx
   * }
   */

  let result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};

// 创建实例对象
/**
 * 将用于创建登录浮窗的方法用参数 fn 的形式传入 getSingle，不仅仅可以传入 createLoginLayer，还能传入
 * createScript、createIframe、createXhr 等。
 * 
 * 之后让 getSingle 返回一个新的函数，并且用一个变量 result 来保存 fn 的计算结果。
 * result 变量因为身在闭包中，它永远不会被销毁。
 * 
 */
const createLoginLayer = function () {
  div = document.createElement("div");
  div.innerHTML = "login modal";
  div.style.display = "none";
  document.body.appendChild(div);
  return div
};

const createSingleLoginLayer = getSingle(createLoginLayer)

document.getElementById('loginBtn').onclick = function() {
  const loginLayer = createSingleLoginLayer()
  loginLayer.style.display = 'block'
}
