function findSingle(arr) {
	let res = 0;
	for (let i = 0; i < arr.length; i++) {
		res = res ^ arr[i];
	}
	return res;
}

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
rl.on("line", (line) => {
	const arr = line.split(",");
	for (let i = 0; i < arr.length; i++) {
		arr[i] = parseInt(arr[i]);
	}
	console.log(findSingle(arr));
	rl.close();
});
