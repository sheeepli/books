type PerformanceLevel = "S" | "A" | "B";
/**
 * 函数内容庞大，包含多个 if-else 语句，这些语句需要覆盖所有的逻辑分支
 * 函数缺乏弹性，当需要添加一个新的绩效等级或者绩效奖金系数，就需要完整了解过这个函数才能够进行修改，违反开放-封闭原则
 * 算法的复用性差，如果程序在其他地方需要重用这些计算奖金的算法，我们大概率会复制粘贴，之后就需要修改很多地方。
 */
/**
const calculateBonus = function (
  performanceLevel: PerformanceLevel,
  salary: number
) {
  if (performanceLevel === "S") return salary * 4;
  if (performanceLevel === "A") return salary * 3;
  if (performanceLevel === "B") return salary * 2;
};

console.log(calculateBonus("B", 20000));
console.log(calculateBonus("S", 6000));
 */

/**
 * 使用函数组合的方式重构代码
 * 但依旧没有解决上述问题
 */
/**
const performanceS = function (salary: number) {
  return salary * 4;
};
const performanceA = function (salary: number) {
  return salary * 3;
};
const performanceB = function (salary: number) {
  return salary * 2;
};

const calculateBonus = function (
  performanceLevel: PerformanceLevel,
  salary: number
) {
  if (performanceLevel === "S") return performanceS(salary);
  if (performanceLevel === "A") return performanceA(salary);
  if (performanceLevel === "B") return performanceB(salary);
};

console.log(calculateBonus("B", 20000));
 */

/**
 * 使用策略模式重构代码
 */

const performanceS = function() {}
performanceS.prototype.calculate = function(salary: number) {
  return salary * 4
}

const performanceA = function() {}
performanceA.prototype.calculate = function(salary: number) {
  return salary * 3
}

const performanceB = function() {}
performanceB.prototype.calculate = function(salary: number) {
  return salary * 2
}

const Bonus = function() {
  this.salary = null;  // 原始工资
  this.strategy = null;  // 绩效等级对应的策略对象
}

Bonus.prototype.setSalary = function(salary:number) {
  this.salary = salary;  // 设置员工的原始工资
}

Bonus.prototype.setStrategy = function(strategy) {
  this.strategy = strategy
}

Bonus.prototype.getBonus = function() {
  return this.strategy.calculate(this.salary)
}

const bonus = new Bonus();
bonus.setSalary(10000)
bonus.setStrategy(new performanceS())
console.log(bonus.getBonus())