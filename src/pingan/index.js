/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 数组全排列
 * @param arr int整型一维数组 目标数组
 * @return int整型二维数组
 */
function permutations(arr) {
	// write code here
	const result = [];

	const helper = (path, set) => {
		if (path.length === arr.length) {
			result.push(path.concat());
			return;
		}
		for (let i = 0; i < arr.length; i++) {
			if (!set.has(i)) {
				// 做选择
				path.push(arr[i]);
				set.add(i);
				// 回溯
				helper(path, set);
				// 撤销选择
				path.pop();
				set.delete(i);
			}
		}
	};

	helper([], new Set());

	return result;
}

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 获取年龄
 * @param n int整型 第几个人
 * @return int整型
 */
function getAge(n) {
	// write code here
	if (n === 1) return 10;
	return 2 + getAge(n - 1);
}

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 数组去重
 * @param arr int整型一维数组 待去重数组
 * @return int整型一维数组
 */
function getUnique(arr) {
	// write code here
	const map = new Map();
	for (const item of arr) {
		if (map.get(item) === undefined) {
			map.set(item, 1);
		} else {
			map.set(item, -1);
		}
	}
	const res = [];
	for (const key of map.keys()) {
		res.push(key);
	}
	// console.log(res.sort());
	return res.sort((a, b) => {
		return a - b;
	});
}

module.exports = {
	permutations: permutations,
	getAge: getAge,
	getUnique: getUnique,
};
