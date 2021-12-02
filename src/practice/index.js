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

// const cadd = curry(add);

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

const input = [
	{
		province: '四川省',
		city: '成都市',
		country: '天府街道'
	},
	{
		province: '四川省',
		city: '绵阳市',
		country: 'xx区'
	},
	{
		province: '河南省',
		city: '信阳市',
		country: '浉河区'
	},
]

const convert = function (input) {

}

const output = [
	{
		type: 'province',
		name: '四川省',
		children: [{
			type: 'city',
			name: '成都市',
			children: [{
				type: 'country',
				name: '天府街道',
			}]
		}, {
			type: 'city',
			name: '绵阳市',
			children: [{
				type: 'country',
				name: 'xx区',
			}]
		}]
	},
	{
		type: 'province',
		name: '河南省',
		children: [{
			type: 'city',
			name: '信阳市',
			children: [{
				type: 'country',
				name: '浉河区',
			}]
		}]
	}
]

const _formatDateJson = (date, type, split = '-') => {
	//格式化日期
	return date.toString().replace(/\/Date\(\-?(\d+)(?:\-|\+)(?:\d+)\)\//g, function () {
		//console.log(arguments);
		var date = new Date(parseFloat(arguments[1])),
			yyyy = date.getFullYear(),
			MM = ("0" + (date.getMonth() + 1)).slice(-2),
			dd = ("0" + date.getDate()).slice(-2),
			hh = ("0" + date.getHours()).slice(-2),
			mm = ("0" + date.getMinutes()).slice(-2),
			ss = ("0" + date.getSeconds()).slice(-2);
		return yyyy + split + MM + split + dd + " " + hh + ":" + mm + ":" + ss;
	});
};

const generateID = (length = 10) => Number(Math.random().toString().substr(3, length) + Date.now()).toString(36).substr(0, length);


var userList = [
	{ name: 'user1', age: 18, province: '四川', city: '成都', district: '高新区' },
	{ name: 'user2', age: 19, province: '四川', city: '成都', district: '天府新区' },
	{ name: 'user3', age: 20, province: '四川', city: '南充', district: '顺庆区' },
	{ name: 'user4', age: 22, province: '江苏', city: '南京', district: '鼓楼区' },
	{ name: 'user5', age: 21, province: '江苏', city: '南京', district: '玄武区' },
	{ name: 'user6', age: 21, province: '江苏', city: '镇江', district: '京口区' }
]

function list2tree(list, path) {
	if (path.length > 0) {
		const root = { "id": "root", "name": "root", "children": [] }
		if (list.length > 0) {
			let keys = Object.keys(list[0])
			root.children = helper(list, path, root, keys)
			return root
		}
	} else {
		return null
	}
};

function helper(list, path, root, keys) {
	const res = []
	if (path.length > 0) {
		let path_arr = path.split('/')
		let key = path_arr.shift()
		let idx = keys.findIndex(item => item === key)
		if (idx !== -1) keys.splice(idx, 1)
		path = path_arr.join('/')

		let tmp_map = {}
		let obj_arr = []

		list.forEach((item) => {
			if (item[root.level] === root.name || root.name === "root") {
				if (tmp_map[item[key]]) {
					return
				} else {
					tmp_map[item[key]] = 1
				}
				let name = item[key]
				let tmp = { name: name, level: key }
				if (path.length > 0) {
					tmp.children = helper(list, path, tmp, keys)
				} else {
					if (tmp.name === item[tmp.level]) {
						let obj = {}
						keys.forEach((key) => {
							obj[key] = item[key]
						})
						obj_arr.push(obj)
						tmp.children = obj_arr
						obj_arr = []
					}
				}
				res.push(tmp)
			}

		})
		return res
	}
}

//var userTree = list2tree(userList, 'province/city/district');
//console.log(userTree)


//---------- 需要同样适用以下数据----------------
var data = [
	{ name: 'name1', a: 'a1', b: 'b1', c: 'c1', d: 'd1', e: 'e1', f: 'f1' },
	{ name: 'name2', a: 'a2', b: 'b2', c: 'c2', d: 'd2', e: 'e2', f: 'f2' },
	{ name: 'name2', a: 'a3', b: 'b3', c: 'c3', d: 'd3', e: 'e3', f: 'f3' },
]

var dataTree = list2tree(data, 'a/c');

console.log(dataTree);


