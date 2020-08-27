const { parse } = require("path");
const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// no 1
// let idx = 0;
// let nameCount = 0;
// const nameList = [];
// no 2
// let idx = 0;
// let totalOrder = 0;
// let pickNumber = 0;
// const orderList = [];
// no3
// let idx = 0;
// let cargoNumber = 0;
// let cargoWeights = [];
// let cargoPickNumber = [];
// no4
rl.on("line", function (line) {
	// no 1
	// if (idx === 0) {
	// 	nameCount = parseInt(line.trim());
	// } else {
	// 	nameList.push(line.trim());
	// }
	// if (nameList.length === nameCount) {
	// 	for (const name of nameList) {
	// 		checkUserName(name);
	// 	}
	// 	rl.close();
	// }
	// idx++;
	// no 2
	// if (idx === 0) {
	// 	totalOrder = parseInt(line.split(" ")[0]);
	// 	pickNumber = parseInt(line.split(" ")[1]);
	// } else {
	// 	let orderInfo = {
	// 		v: parseInt(line.split(" ")[0]),
	// 		w: parseInt(line.split(" ")[1]),
	// 	};
	// 	orderList.push(orderInfo);
	// 	if (orderList.length === totalOrder) {
	// 		findBestOrder(orderList, pickNumber);
	// 		rl.close();
	// 	}
	// }
	// idx++;
	// no3
	// if (idx === 0) {
	// 	cargoNumber = parseInt(line.trim());
	// } else if (idx === 1) {
	// 	cargoWeights = line.trim().split(" ");
	// 	for (let i = 0; i < cargoWeights.length; i++) {
	// 		cargoWeights[i] = parseInt(cargoWeights[i]);
	// 	}
	// } else if (idx === 2) {
	// 	cargoPickNumber = line.trim().split(" ");
	// 	for (let i = 0; i < cargoPickNumber.length; i++) {
	// 		cargoPickNumber[i] = parseInt(cargoPickNumber[i]);
	// 	}
	// 	if (cargoNumber !== cargoWeights.length || cargoNumber !== cargoPickNumber.length) {
	// 		console.log("Wrong");
	// 	} else {
	// 		rl.close();
	// 	}
	// }
	// idx++;
	// no4
});

function checkUserName(userName) {
    if (userName === "") console.log("Wrong");
	const reg1 = /^[a-zA-Z](.*)[0-9]+(.*)/;
	const reg2 = /^[a-zA-Z]([0-9a-zA-Z]+$)(?![a-zA-Z]+$)/;
	if (reg1.test(userName) && reg2.test(userName)) {
		console.log("Accept");
	} else {
		console.log("Wrong");
	}
}

function findBestOrder(orderList, pickNumber) {
	const profitsMap = {};
	for (let i = 0; i < orderList.length; i++) {
		let profit = orderList[i].v + 2 * orderList[i].w;
		let orderId = i + 1;
		profitsMap[orderId] = profit;
	}
	let profitSorted = Object.keys(profitsMap).sort((a, b) => {
		return profitsMap[b] - profitsMap[a];
	});
	profitSorted = profitSorted.slice(0, pickNumber);
	profitSorted.sort((a, b) => {
		return a - b;
	});
	let output = "";
	for (let i = 0; i < profitSorted.length; i++) {
		if (i === 0) {
			output += profitSorted[i];
		} else {
			output += " " + profitSorted[i];
		}
	}
	console.log(output);
}
