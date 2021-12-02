// Array.prototype.forEach
// forEach(fn: (val: number, index: number, arr: number[]) => void, thisArg?: any): void
Array.prototype.forEachRC = function (fn, thisArg) {
	const arr = this;
	if (!Array.isArray(arr)) {
		throw new TypeError("Array must be an array");
	}
	let T;
	if (arguments.length > 1) {
		T = thisArg;
	}
	for (let i = 0; i < arr.length; i++) {
		fn.call(T !== undefined ? T : arr, arr[i], i, arr);
	}
};

// Array.prototype.map
// map(fn:(currentValue: number, index: number, arr: number[]) => number, thisArg?: object): number[]
Array.prototype.mapRC = function (fn, thisArg) {
	const arr = this;
	if (!Array.isArray(arr)) {
		throw new TypeError("Array must be an array");
	}
	let T;
	if (arguments.length > 1) {
		T = thisArg;
	}
	let res = [];
	for (let i = 0; i < arr.length; i++) {
		let tmp = fn.call(T !== undefined ? T : arr, arr[i], i, arr);
		res.push(tmp);
	}
	return res;
};

// Array.prototype.filter
// filter(fn: (value: number, index: number, arr: number[]) => boolean, thisArg?: any): number[]
Array.prototype.filterRC = function (fn, thisArg) {
	const arr = this;
	if (!Array.isArray(arr)) {
		throw new TypeError("Array must be an array");
	}
	let T;
	if (arguments.length > 1) {
		T = thisArg;
	}
	let res = [];
	for (let i = 0; i < arr.length; i++) {
		let success = fn.call(T !== undefined ? T : arr, arr[i], i, arr);
		if (success) {
			res.push(arr[i]);
		}
	}
	return res;
};

// Array.prototype.every
// every(fn: (val: number, index: number, array: number[]) => boolean, thisArg? :any): boolean
Array.prototype.everyRC = function (fn, thisArg) {
	const arr = this;
	if (!Array.isArray(arr)) {
		throw new TypeError("Array must be an array");
	}
	let T;
	if (arguments.length > 1) {
		T = thisArg;
	}
	for (let i = 0; i < arr.length; i++) {
		let tmp = fn.call(T !== undefined ? T : arr, arr[i], i, arr);
		if (!tmp) {
			return false;
		}
	}
	return true;
};

// Array.prototype.reduce
// reduce(fn: (accumulator: number, val: number, index: number, arr: number[]) => number, initialValue: number): number
Array.prototype.reduceRC = function (fn, initialValue) {
	const arr = this;
	if (!Array.isArray(arr)) {
		throw new TypeError("Array must be an array");
	}
	if (arr.length === 0) {
		return 0;
	}
	let accumulator;
	let startIndex = 0;
	if (arguments.length > 1) {
		accumulator = initialValue;
	}
	if (accumulator === undefined) {
		accumulator = arr[0];
		startIndex = 1;
	}
	for (let i = startIndex; i < arr.length; i++) {
		let tmp = fn.call(arr, accumulator, arr[i], i, arr);
		accumulator = tmp;
	}
	return accumulator;
};

// Array.prototype.push
// push(val: any): number
// 返回数组的新长度
// 接受的参数可以是一个数组
Array.prototype.pushRC = function (val) {
	let arr = this;
	if (!Array.isArray(arr)) {
		throw new TypeError("Array must be an array");
	}
	if (arguments.length === 0) {
		throw new TypeError("one argument required");
	}
	if (Array.isArray(val)) {
		arr = arr.concat(val);
	} else {
		arr[arr.length] = val;
	}
	return arr.length;
};

// Array.prototype.pop
// pop(void): any
Array.prototype.popRC = function () {
	let arr = this;
	if (!Array.isArray(arr)) {
		throw new TypeError("Array must be an array");
	}
	let size = arr.length;
	if (size === 0) {
		return undefined;
	} else {
		let last = arr[size - 1];
		arr.length -= 1;
		return last;
	}
};

// Array.prototype.shift
// remove the first element from an array
// shift(void): any
// if the array is empty, return undefined
Array.prototype.shiftRC = function () {
	const arr = this;
	if (!Array.isArray(arr)) {
		throw new TypeError("Array must be an array");
	}
	if (arr.length === 0) return undefined;
	let ele = arr[0];
	arr.splice(0, 1);
	return ele;
};

// Array.prototype.unshift
// add element to array as the first element
// unshift(element: any, element2: any, ...elementn: any): number
// return the length of array
Array.prototype.unshiftRC = function (element, ...rest) {
	let arr = this;
	if (!Array.isArray(arr)) {
		throw new TypeError("Array must be an array");
	}
	if (element !== undefined) {
		arr.splice(0, 0, element);
	}
	if (Array.isArray(rest)) {
		rest.forEach((val) => {
			arr.splice(0, 0, val);
		});
	}
	return arr.length;
};

// Array.prototype.flat
// flat(deep?: number): number[]
Array.prototype.flatRC = function (deep) {
	const arr = this;
	if (!Array.isArray(arr)) {
		throw new TypeError("must be an array");
	}

	// helper(arr: number[], res: number[], deep: number): void
	// arr 当前遍历的数组
	// res 存放结果的新数组
	// deep 展开的深度
	let helper = function (arr, res, deep) {
		for (let i = 0; i < arr.length; i++) {
			if (Array.isArray(arr[i]) && deep > 0) {
				deep--;
				helper(arr[i], res, deep);
			} else {
				res.push(arr[i]);
			}
		}
	};

	let depth;
	if (arguments.length > 0) {
		depth = deep;
	}
	let res = [];
	helper(arr, res, depth);
	return res;
};

// Array.prototype.toString
// toString(void): string
Array.prototype.toStringRC = function () {
	const arr = this;
	if (arr.length === 0) return "";
	let str = arr.reduce(function (result, val) {
		// null 和 undefined 没有 toString 方法
		if (typeof val === "undefined") {
			return result + "undefined";
		} else if (val === null) {
			return result + "null";
		}
		return result + val.toString();
	});
	return str;
};

// 检测各种变量的类型
// typeof(T: item) => String
function typeofRC(item) {
	// undefined number string boolean null object
	switch (typeof item) {
		case "number":
			return "number";
			break;
		case "string":
			return "string";
			break;
		case "boolean":
			return "boolean";
			break;
		case "undefined":
			return "undefined";
			break;
		case "object":
			return Object.prototype.toString.call(item).slice(8, -1);
			break;
	}
}

// instanceof(leftVal: any, rightVal: any): boolean
function instanceOfRC(leftVal, rightVal) {
	let leftProto = leftVal.__proto__;
	let rightProto = rightVal.prototype;
	// 遍历左值的原型链
	// by leftProto = leftProto.__proto__
	while (leftProto !== null) {
		if (leftProto === rightProto) return true;
		leftProto = leftProto.__proto__;
	}
	return false;
}

// function Father() {}

// function Son() {
// 	Father.call(this);
// }

// Son.prototype = new Father();

// let s = new Son();
// console.log(instanceOfRC(s, Father));

// new(constructor: ()=>void, ...args): object
// 1 创建一个空对象
// 2 空对象的[[prototype]]属性 指向 构造函数的prototype属性
// 3 调用构造函数，并且将this绑定到obj上
// 4 返回这个obj
function newRC(constructor, ...args) {
	let obj = {};
	obj.__proto__ = constructor.prototype;
	const res = constructor.apply(obj, args);
	return res instanceof Object ? res : obj;
}

// quickSort(arr: number[])
function quickSort(arr) {
	if (arr.length <= 1) {
		return arr;
	}

	var pivotIndex = Math.floor(arr.length / 2);

	var pivot = arr.splice(pivotIndex, 1)[0];

	var left = [];

	var right = [];

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}

	return quickSort(left).concat([pivot], quickSort(right));
}

// jsonp
// 前端发起一个script标签
/**
 * @param {string} url http:127.0.0.1:8088?callbackName=cb
 * @return {void}
 */
function jsonp(url) {
	let script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.head.appendChild(script);
}

function cb(data) {
	console.log(data);
}

// (function () {
// 	var a = b = 3;
// })();

// console.log(typeof a !== "undefined");
// console.log(typeof b !== "undefined");

// inner = "window";

// function say() {
// 	console.log(inner);
// 	console.log(this.inner);
// }

// var obj1 = (function () {
// 	var inner = "1-1";
// 	return {
// 		inner: "1-2",
// 		say: function () {
// 			console.log(inner);
// 			console.log(this.inner);
// 		},
// 	};
// })();

// var obj2 = (function () {
// 	var inner = "2-1";
// 	return {
// 		inner: "2-2",
// 		say: function () {
// 			console.log(inner);
// 			console.log(this.inner);
// 		},
// 	};
// })();

// say();
// obj1.say();
// obj2.say();
// obj1.say = say;
// obj1.say();
// obj1.say = obj2.say;
// obj1.say();

// console.log("1");
// setTimeout(() => {
// 	console.log("2");
// }, 0);
// const interval = setInterval(function () {
// 	console.log("3");
// }, 0);
// setTimeout(function () {
// 	console.log("10");
// 	new Promise(function (resolve) {
// 		console.log(11);
// 		resolve();
// 	})
// 		.then(function () {
// 			console.log(12);
// 		})
// 		.then(function () {
// 			console.log(13);
// 			clearInterval(interval);
// 		});
// }, 0);

// Promise.resolve()
// 	.then(function () {
// 		console.log(7);
// 	})
// 	.then(function () {
// 		console.log(8);
// 	});
// console.log(9);

// 实现函数柯里化
function sum(a, b, c, d) {
	return a + b + c + d;
}

/**
 * @param {function} fn
 * @return {function}
 */
function curry(fn) {
	let arglen = fn.length;
	let args = [];
	let self = this;
	return function () {
		args = args.concat(Array.prototype.slice.call(arguments, 0));
		if (args.length < arglen) {
			return arguments.callee;
		}
		return fn.apply(self, args);
	};
}

let adder = curry(sum);
let res = adder(1)(2)(3)(4);
// console.log(res); // 4

// Array.prototype.reverse
// 原地反转数组
/**
 * @param {void}
 * @return {void}
 */
Array.prototype.reverseRC = function () {
	let arr = this;
	if (!Array.isArray(arr)) return;
	let h = 0;
	let t = arr.length - 1;
	while (h < t) {
		if (arr[h] !== arr[t]) {
			let tmp = arr[h];
			arr[h] = arr[t];
			arr[t] = tmp;
		}
		h++;
		t--;
	}
};

// 实现bind函数
/**
 * @param {object} context
 */
Function.prototype.bindRC = function (context) {
	let fn = this;
	let args = Array.prototype.slice.call(arguments, 1);
	return function () {
		let bindArgs = Array.prototype.slice.call(arguments);
		fn.apply(context, args.concat(bindArgs));
	};
};

// 实现Promise.all
/**
 *
 * @param {Promise[]} promises
 * @return {Promise}
 */
function promiseAll(promises) {
	return new Promise((resolve, reject) => {
		if (!Array.isArray(promises)) {
			reject(new TypeError("promises must be an array"));
		}
		let cnt = 0;
		let len = promises.length;
		let res = [len];
		for (let i = 0; i < len; i++) {
			promises[i].then(
				(val) => {
					res[i] = val;
					cnt++;
					if (cnt === len) {
						resolve(res);
					}
				},
				(err) => {
					reject(err);
				}
			);
		}
	});
}

// 函数防抖
// 函数一直触发，烦的不行，设置一个定时器，每次触发定时器都重新即使，啥时候冷静下来再执行
/**
 *
 * @param {function} fn
 * @param {number} delay
 */
function debounce(fn, delay) {
	let timer = null;
	return function () {
		let self = this;
		let args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(self, args);
		}, delay);
	};
}

// 函数节流
//
function throttle(fn, delay) {
	let timer;
	return function () {
		let self = this;
		let args = arguments;
		if (!timer) {
			timer = setTimeout(function () {
				fn.apply(self, args);
				timer = null;
			}, delay);
		}
	};
}

class A {
	constructor() {
		this.a = 1;
	}
	aFun() {}
}

class B extends A {
	constructor() {
		super();
		this.b = 2;
	}
	bFun() {}
}

// 数组去重
let arr = [4, 7, 2, 0, 5, 6, 7, 0, 11, 7, 4];
/**
 *
 * @param {number[]} arr
 * @return {number[]}
 */
function removeDup(arr) {
	let sorted = arr.sort((a, b) => {
		return a - b;
	});
	let res = [];
	res.push(sorted[0]);
	let ptr = 1;
	while (ptr < sorted.length) {
		if (sorted[ptr] !== res[res.length - 1]) {
			res.push(sorted[ptr++]);
		} else {
			ptr++;
		}
	}
	return res;
}

/**
 * 数组去重不样排序
 * @param {number[]} arr
 * @return {number[]}
 */
function removeDupNoSort(arr) {
	return Array.from(new Set(arr));
}

// 遍历对象
// 1 let key in obj
let a = { k1: 1, k2: 2, k3: 3 };
for (let key in a) {
	// console.log(a[key]);
}
// 2 Object.keys() 返回一个key组成的数组
// console.log(Object.keys(a));

// 3 Object.values() 返回由value组成的数组
// console.log(Object.values(a));

// es6 class

var data = [
	{
		userId: 8,
		title: "tit1",
	},
	{
		userId: 11,
		title: "other",
	},
	{
		userId: 15,
		title: "tit3",
	},
];

var find = function (origin) {
	return {
		where: function (obj) {
			const keys = Object.keys(obj);
			let res = [];
			keys.forEach(function (key) {
				let result = origin.filter(function (item) {
					return item[key].match(obj[key]);
				});
				res = res.concat(result);
			});
			return {
				orderBy: function (primaryKey, direction) {
					if (direction === "desc") {
						res.sort(function (a, b) {
							return a[primaryKey] < b[primaryKey];
						});
					} else {
						res.sort(function (a, b) {
							return a[primaryKey] > b[primaryKey];
						});
					}
					return res;
				},
			};
		},
	};
};

var result = find(data)
	.where({
		title: /\d$/,
	})
	.orderBy("userId", "desc");

console.log(result);
