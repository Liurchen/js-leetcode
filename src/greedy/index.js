/**
 * id 1518
 * url [https://leetcode-cn.com/problems/water-bottles/]
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var numWaterBottles = function (numBottles, numExchange) {
	let drink = numBottles;
	while (1) {
		let remain = numBottles % numExchange;
		let get = Math.floor(numBottles / numExchange);
		drink += get;
		let bottles = remain + get;
		if (bottles < numExchange) break;
		numBottles = bottles;
	}
	return drink;
};

/**
 * id 1005
 * url [https://leetcode-cn.com/problems/maximize-sum-of-array-after-k-negations/]
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumAfterKNegations = function (nums, k) {
	if (nums.length === 0) return;
	nums.sort((a, b) => {
		return a - b;
	});
	while (k > 0) {
		nums[0] = 0 - nums[0];
		nums.sort((a, b) => {
			return a - b;
		});
		k--;
	}
	let sum = 0;
	nums.forEach((num) => {
		sum += num;
	});
	return sum;
};

console.log(largestSumAfterKNegations([1, 2, 3, 8, 7, 6], 3));
