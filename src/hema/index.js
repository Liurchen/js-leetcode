// 千分位
/**
 *
 * @param {number} num
 * @return {string}
 */
function thousandth(num) {
	const numArr = (num + "").split("");
	const len = numArr.length;
	let cnt = 1;
	let resStr = "";
	for (let i = len - 1; i >= 0; i--) {
		resStr = numArr[i] + resStr;
		if (cnt % 3 === 0 && i !== 0) {
			resStr = "," + resStr;
		}
		cnt++;
	}
	return resStr;
}

/**
 *
 * @param {number[]} nums
 * @return {number[]} 返回结果数组
 */
function mostRepeated(nums) {
	if (!Array.isArray(nums) || nums.length === 0) return -1;
	if (nums.length === 1 || nums.length === 2) return nums[0];
	const map = {};
	for (const num of nums) {
		if (map[num] === undefined) {
			map[num] = 1;
		} else {
			map[num] = map[num] + 1;
		}
	}
	const sortedKeys = Object.keys(map).sort((a, b) => {
		return map[b] - map[a];
	});
	const res = [parseInt(sortedKeys[0])];
	for (let i = 1; i < sortedKeys.length; i++) {
		if (map[sortedKeys[i]] === map[sortedKeys[0]]) {
			res.push(parseInt(sortedKeys[i]));
		}
		if (map[sortedKeys[i]] < map[sortedKeys[0]]) {
			break;
		}
	}
	return res;
}

console.log(mostRepeated([1, 1, 1, 2, 2, 2, 3, 4, 5, 6]));
