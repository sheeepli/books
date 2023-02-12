// 普通
// var mult = function () {
//   var a = 1;
//   for (var i = 0, l = arguments.length; i < l; i++) {
//     a = a * arguments[i]
//   }
//   return a
// }

// console.log(mult(1,2,3,4))

// ==================================================================

// 缓存

// var cache = {};

// var mult = function () {
//   var args = Array.prototype.join.call(arguments, ",");
//   if (cache[args]) return cache[args];
//   var a = 1;
//   for (var i = 0, l = arguments.length; i < l; i++) {
//     a = a * arguments[i];
//   }
//   return cache[args] = a
// };

// console.log(mult(1,2,3,4))
// console.log(mult(1,2,3,4))

// ==================================================================

// 变量私有
// 这里直接使用了一个立即执行函数，很棒。
// var mult = (function () {
//   var cache = {};
//   return function () {
//     var args = Array.prototype.join.call(arguments, ",");
//     if (cache[args]) return cache[args];
//     var a = 1;
//     for (var i = 0, l = arguments.length; i < l; i++) {
//       a = a * arguments[i];
//     }
//     return (cache[args] = a);
//   };
// })();

// console.log(mult(1,2,3,4))
// console.log(mult(1,2,3,4))

// ==================================================================

// 提炼函数（重构）
// var mult = (function() {
//   var cache = {}
//   var calculate = function() {
//     var a = 1;
//     for (var i = 0, l = arguments.length; i < l; i++) {
//       a = a * arguments[i];
//     }
//     return a
//   }
//   return function() {
//   var args = Array.prototype.join.call(arguments, ",");
//     if (cache[args]) return cache[args];
//     // arguments 是一个数组，所以要使用 apply 拆出来传给 calculate 函数
//     return cache[args] = calculate.apply(null, arguments)
//   }
// })()

// console.log(mult(1,2,3,4))
// console.log(mult(1,2,3,4))

// ==================================================
// 3.1.4 (01)
// var extent = function() {
//   var value = 0;
//   return {
//     call: function() {
//       value++;
//       console.log(value)
//     }
//   }
// }

// var extent = extent()

// extent.call()
// extent.call()
// extent.call()

// 3.1.4 (02)
// var extent = {
//   value: 0,
//   call: function() {
//     this.value ++
//     console.log(this.value)
//   }
// }

// extent.call()
// extent.call()
// extent.call()

// 3.1.4 (03)
// var Extent = function() {
//   this.value = 0
// }

// Extent.prototype.call = function() {
//   this.value++;
//   console.log(this.value)
// }

// var extent = new Extent()
// extent.call()
// extent.call()
// extent.call()

// ===========================================
// 3.1.5
// var Tv = {
//   open: function() {
//     console.log('打开电视机')
//   },
//   close: function() {
//     console.log('关闭电视机')
//   }
// }
// var OpenTvCommand = function(receiver) {
//   this.receiver = receiver
// }

// OpenTvCommand.prototype.execute = function() {
//   this.receiver.open()
// }

// OpenTvCommand.prototype.undo = function() {
//   this.receiver.close()
// }

// var setCommand = function(command) {
//   document.getElementById('execute').onclick = function() {
//     command.execute()
//   }
//   document.getElementById('undo').onclick = function() {
//     command.undo()
//   }
// }

// setCommand(new OpenTvCommand(Tv))

// ======================================================

// 命令模式的意图是把请求封装为对象，从而分离请求的发起者和请求的接收者（执行者）之间的耦合关系。在命令被执行之前，可以预先往命令对象中植入命令的接收者。

// 使用闭包的一部分原因是我们选择主动把一些变量封闭在闭包中，应为可能在以后还需要使用这些变量，把这些变量放在闭包中和放在全局作用域中，对内存方面的影响是一致的，这里并不能说成内存泄漏。
// 如果在将来需要回收这些变量，我们手动把这些变量设为 null。

// 跟闭包和内存泄漏有关系的地方是，使用闭包的同时比较容易形成循环引用，如果闭包的作用域链中保存着一些 DOM 节点，这时候就有可能造成内存泄漏。但这本身并非闭包的问题，也并非 JS 的问题。
// 在 IE 浏览器中，由于 BOM 和 DOM 中的对象是使用 C++ 以 COM 对象的方式实现的，而 COM 对象的垃圾手机机制采用的是引用计数策略。
// 在基于引用计数策略的垃圾回收机制中，如果两个对象之间形成了循环引用，那么这两个对象都无法被回收，但循环引用造成的内存泄漏本质也不是闭包造成的。
// 同样，如果要解决循环引用带来的内存泄漏问题，我们只需要把循环引用中的变量设为 null 即可。将变量设为 null 意味着切断变量与它此前引用的值之间的连接。
// 当垃圾收集器下次运行时，就会删除这些值并回收它们占用的内存。

// 3.2.2

// 高阶函数是指至少满足下列条件之一的函数
// 1. 函数可以作为参数被传递
// 2. 函数作为返回值输出

// var isString = function(obj) {
//   return Object.prototype.toString.call(obj) === '[object String]'
// }

// var isArray = function(obj) {
//   return Object.prototype.toString.call(obj) === '[object Array]'
// }

// var isNumber = function(obj) {
//   return Object.prototype.toString.call(obj) === '[object Number]'
// }

// console.log(isString('1'), isString(1))
// console.log(isArray([]), isArray(1))
// console.log(isNumber(1), isNumber('1'))

// 这么写是可以，但是有点不好
// var isType = function(obj, type) {
//   return Object.prototype.toString.call(obj) === `[object ${type}]`
// }
// console.log(isType('1', 'String'), isType(1,'String'))
// console.log(isType([], 'Array'), isType(1, 'Array'))
// console.log(isType(1, 'Number'), isType('1', 'Number'))

// 进行柯里化（使用高阶函数），返回一个函数，更加语义化
// var isType = function (type) {
//   return function(obj) {
//     return Object.prototype.toString.call(obj) === `[object ${type}]`
//   }
// }

// var isString = isType('String')
// var isArray = isType('Array')
// var isNumber = isType('Number')

// console.log(isString('1'), isString(1))
// console.log(isArray([]), isArray(1))
// console.log(isNumber(1), isNumber('1'))

//====================================================================
// 3.2.3 高阶函数实现AOP（面向切面编程）

// Function.prototype.before = function (beforefn) {
//   var __self = this; // 保存原函数的引用
//   return function () {
//     // 返回包含了原函数和新函数“代理”函数
//     console.log("二", ...arguments);
//     beforefn.apply(this, arguments); // 执行新函数，修正 this
//     console.log("四", ...arguments);
//     return __self.apply(this, arguments); // 执行原函数
//   };
// };

// Function.prototype.after = function (afterfn) {
//   var __self = this;
//   return function () {
//     console.log("一", ...arguments);
//     var ret = __self.apply(this, arguments);
//     console.log("六", ...arguments);
//     afterfn.apply(this, arguments);
//     return ret;
//   };
// };

// var func = function () {
//   console.log("五");
//   console.log(2);
// };
// func = func
//   .before(function () {
//     console.log("三");
//     console.log(1);
//   })
//   .after(function () {
//     console.log("七");
//     console.log(3);
//   });
// func(1); // 这里的参数首先会传递到 after 方法，然后

// ================================================
// 3.2.4 currying

// var monthlyCost = 0
// var cost = function(money) {
//   monthlyCost += money
// }

// cost(100)
// cost(200)
// cost(300)
// console.log(monthlyCost)

// ===

// var cost = (function() {
//   var args = []
//   return function() {
//     if(arguments.length === 0) {
//       var money = 0;
//       for (let i = 0; i < args.length; i++) {
//         money += args[i];
//       }
//       console.log('money', money)
//       return money
//     } else {
//       [].push.apply(args, arguments)
//     }
//   }
// })()
// cost(100)
// cost(200)
// cost(300)
// console.log(cost())

// console.log([].push.apply([2,2,6,5], [1]))

// ===
// 函数柯里化的简便写法
// var currying = function(fn) {
//   var args = []
//   return function() {
//     if (arguments.length === 0) {
//       // 当传入的参数个数为 0 的时候，执行传入的fn，这里值的是 cost 方法
//       // 并将 args 作为参数传入
//       return fn.apply(this, args)
//     } else {
//       // 将 arguments 添加到 args 中去
//       [].push.apply(args, arguments)
//       // 下面这个效果是一样的，
//       // 但是 es6 之前没有 ... 运算符，所以使用 apply（apply和call都是立即执行的）
//       // args.push(...arguments)

//       // 并且返回这个函数本身，以供后续调用即 fn(x)(y) 
//       return arguments.callee
//     }
//   }
// }

// var cost = (function() {
//   var money = 0;
//   return function() {
//     for (let i = 0, l = arguments.length; i < l; i++) {
//       money += arguments[i];
//     }
//     return money
//   }
// })()

// var cost = currying(cost); // 转化成 currying 函数
// cost(100, 200)
// cost(200)(100)
// cost(300)
// console.log(cost())

// ===============================
// 3.2.4  uncurrying

// (function() {
//   Array.prototype.push.call(arguments, 4)
//   console.log(arguments)
// })(1,2,3)

// Function.prototype.uncurrying = function() {
//   var self = this;
//   return function() {
//     var obj = Array.prototype.shift.call(arguments)
//     console.log(obj)
//     return self.apply(obj, arguments)
//   }
// }

// var push = Array.prototype.push.uncurrying()

// (function() {
//   push(arguments, 4);
//   console.log(arguments)
// })(1,2,3)

// =============================
// 3.2.4 函数节流
// 场景
// window.onresize，mousemove，上传进度
// 原理 
// 借助 setTimeout 
// 代码实现
// var throttle = function(fn, interval) {
//   var __self = fn, // 保存需要被延迟执行的函数引用
//      timer, // 定时器
//      firstTime = true; // 是否第一次调用
  
//   return function() {
//     var args = arguments,
//         __me = this;
//     if (firstTime) { // 如果是第一次调用，不需要延迟执行
//       __self.apply(__me, args);
//       return firstTime = false
//     }
//     if (timer) {  // 如果定时器还在，说明前一次延迟执行还没有完成
//       return false
//     }
//     timer = setTimeout(() => {
//       clearTimeout(timer)
//       timer = null
//       __self.apply(__me, args)
//     }, interval || 500);
//   }
// }

// setInterval(throttle(function() {console.log(1)}, 5000), 0);
