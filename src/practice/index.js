/**
 * @author rcliu
 *
 */

// 组合继承
function SuperType(name) {
	this.name = name;
}
SuperType.prototype.say = function () {
	console.log(this.name);
};

function SubType(name) {
	SubType.call(this, name); // 第一次调用父类构造函数
}
SubType.prototype = new SuperType(); // 第二次调用父类构造函数

// 寄生组合继承
function SuperType(name) {
	this.name = name;
}
SuperType.prototype.say = function () {
	console.log(this.name);
};

function SubType(name) {
	SuperType.call(this, name);
}

function inheritPrototype(SubType, SuperType) {
	var prototype = new Object(SuperType.prototype);
	prototype.constructor = SubType;
	SubType.prototype = prototype;
}

inheritPrototype(SubType, SuperType);

// var sub = new SubType("xiaoming");
// sub.say(); // xiaoming

// 最大并发K
const urls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const k = 3;
function fetch(url) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(url);
		}, 2000);
	});
}
function concurrentK(urls, k) {
	const queue = [];
	while (k > 0) {
		queue.push(urls.shift());
		k--;
	}
	helper(queue, urls);
}

function helper(queue, urls) {
	while (queue.length > 0) {
		fetch(queue.shift()).then((data) => {
			console.log(data);
			if (urls.length > 0) queue.push(urls.shift());
			helper(queue, urls);
		});
	}
}

// concurrentK(urls, k);

// 手写 XHR
function xhr(url, method, success, failure, param) {
	const xhr = new XMLHttpRequest();
	xhr.open(method, url, true); // 如果值为false，send()方法直到收到答复前不会返回。如果true，已完成事务的通知可供事件监听器使用

	// 添加事件监听
	xhr.onreadystatechange = () => {
		if (xhr.readyState == 4) {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
				success && success(xhr.responseText);
			} else {
				failure && failure();
			}
		}
	};

	xhr.onerror = (err) => failure && failure(err);
	if (method === "get") xhr.send(null);
	if (method === "post") param && xhr.send(param);
}

// 实现 bind
Function.prototype.bind = function (thisArg) {
	let args = Array.prototype.slice.call(arguments, 1);
	const fn = this;
	return function () {
		// 如果内层函数有参数的话
		const bindArgs = Array.prototype.slice.call(arguments);
		fn.apply(thisArg, args.concat(bindArgs));
	};
};

// 函数科里化
function curry(fn) {
	let arglen = fn.length;
	let args = [];
	let self = this;
	return function tmp() {
		args = args.concat(Array.prototype.slice.call(arguments, 0));
		if (args.length < arglen) {
			return tmp;
		}
		return fn.apply(self, args);
	};
}

function add(a, b, c, d) {
	return a + b + c + d;
}

const cadd = curry(add);
console.log(cadd(1)(2)(3)(4));

// 节流函数
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

// 函数防抖
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






