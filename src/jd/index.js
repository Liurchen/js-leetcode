const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// no 1
// let idx = 0;
// let num = 0;
// no 2
let idx = 0;
let opNumber = 0;
const taskQueue = [];
rl.on("line", function (line) {
	// no 1
	// if (idx === 0) {
	// 	num = parseInt(line.trim());
	// 	revertNumberToFive(num);
	// 	rl.close();
	// }
	// idx++;
	// no 2
	if (idx === 0) {
		opNumber = parseInt(line.trim());
	} else {
		const input = line.trim().split(" ");
		if (input.length > 0) {
			const task = {};
			const op = parseInt(input[0]);
			if ([1, 2, 3].includes(op)) {
				task.op = op;
				if (op === 1 || op === 2) {
					task.idx = parseInt(input[1]);
				}
				if (op === 1) {
					task.val = parseInt(input[2]);
				}
				taskQueue.push(task);
			}
		}
	}
	if (opNumber === idx) {
		transArray(taskQueue);
		rl.close();
	}
	idx++;
});

function revertNumberToFive(num) {
	num = num.toString().split("").reverse().join("");
	num = parseInt(~~num).toString(5);
	console.log(num);
}

function transArray(tasks) {
	// console.log(JSON.stringify(tasks));
	const initArr = [];
	if (tasks.length === opNumber && tasks.length > 0) {
		for (const task of tasks) {
			switch (task.op) {
				case 1:
					initArr.splice(task.idx - 1, 0, task.val);
					break;
				case 2:
					initArr.splice(task.idx - 1, 1);
					break;
				case 3:
					printArr(initArr);
					break;
			}
		}
	} else {
		console.log("");
	}
}

function printArr(arr) {
	let print = "";
	for (let i = 0; i < arr.length; i++) {
		print += arr[i];
		if (i !== arr.length - 1) {
			print += " ";
		}
	}
	console.log(print.trim());
	// console.log("length", print.length);
}
