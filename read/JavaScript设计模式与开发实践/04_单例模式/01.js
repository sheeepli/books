// 4.1
let Singleton = function(name) {
    this.name = name
    this.instance = null
}

Singleton.prototype.getName = function() {
    console.log(this.name)
}

Singleton.getInstance = function(name) {
    if (!this.instance) {
        this.instance = new Singleton(name)
    }
    return this.instance
}

let a = Singleton.getInstance('a')
let b = Singleton.getInstance('b')

a.getName() // a
console.log('====')
b.getName() // a

console.log(a === b) // true