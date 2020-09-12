function unique(arr) {
	const map = new Map();
	for (const item of arr) {
		let key = item;
		let arrOrObj = false;
		if (Array.isArray(item) || item instanceof Object) {
			key = JSON.stringify(item);
			arrOrObj = true;
		}
		if (map.get(key) === undefined) {
			map.set(key, arrOrObj ? 0 : 1);
		}
	}
	// 遍历 map 的 key 得到结果数组
	const res = [];
	for (const key of map.keys()) {
		res.push(map.get(key) === 0 ? JSON.parse(key) : key);
	}
	return res;
}

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
rl.on("line", (line) => {
	let arr = JSON.parse(line);
	console.log(unique(arr));
	rl.close();
});
