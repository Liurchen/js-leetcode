/**
 * id 1518
 * url [ https://leetcode-cn.com/problems/water-bottles/ ]
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
