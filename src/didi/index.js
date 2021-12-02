const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
rl.on("line", function (line) {
	const n = line.trim();
	pairs(n);
	rl.close();
});

function pairs(n) {
	if (n < 202) {
		console.log(0);
		return;
	}
	if (n > 1975) {
		console.log(0);
		return;
	}
	let abc = 102;
	const maxAbc = 987;
	let acc = 100;
	const notAcc = [111, 222, 333, 444, 555, 666, 777, 888, 999];
	const needReset = [210, 310, 410, 510, 610, 710, 810, 910];

	const res = [];

	while (acc < 1000) {
		if (needReset.includes(acc)) {
			acc -= 10;
		}
		if (notAcc.includes(acc)) {
			if (acc === 999) break;
			acc += 11;
			continue;
		}
		if (n - acc === abc) {
			res.push(abc + " " + acc);
		}
		if (n - acc > abc) {
			// abc ++
			let currentAbc = abc;
			while (currentAbc <= maxAbc) {
				currentAbc++;
				if (n - acc === currentAbc) {
					const str = (currentAbc + "").split("");
					if (str[0] !== str[1] && str[1] !== str[2]) res.push(currentAbc + " " + acc);
					break;
				}
			}
		}
		if (n - acc < abc) {
			if (res.length === 0) res.push("0");
			break;
		}
		acc += 11;
	}

	for (const str of res.reverse()) {
		console.log(str);
	}
}
