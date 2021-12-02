// 快排
function quickSort(arr) {
	let len = arr.length;
	console.log("len", len);
	if (len <= 1) return arr;
	let idx = Math.floor(len / 2);
	let middleValue = arr.splice(idx, 1)[0];
	let left = [];
	let right = [];
	// Q：此处如果直接写 i <len 会提示栈溢出  len永远都是2
	for (let i = 0; i < len; i++) {
		console.log("hhh", i, len);
		if (arr[i] < middleValue) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat([middleValue], quickSort(right));
}

/**
 * id 506
 * @param {number[]} score
 * @return {string[]}
 */
var findRelativeRanks = function (score) {
	const score2idxMap = {};
	score.forEach((item, index) => {
		score2idxMap[item] = index;
	});
	score
		.sort((a, b) => {
			return a - b;
		})
		.reverse();
	const ret = [];
	score.forEach((item, index) => {
		if (index == 0) {
			ret[score2idxMap[item]] = "Gold Medal";
		} else if (index == 1) {
			ret[score2idxMap[item]] = "Silver Medal";
		} else if (index == 2) {
			ret[score2idxMap[item]] = "Bronze Medal";
		} else {
			ret[score2idxMap[item]] = index + 1 + "";
		}
	});
	return ret;
};

findRelativeRanks([10, 3, 8, 9, 4]);
