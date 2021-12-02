const fs = require("fs");

const csSubList = ["835", "971", "924", "927", "940", "814", "933", "964", "968", "910"];

const teSubList = ["e950", "e955", "e980", "e967", "e801", "e882", "e906", "962", "951"];

const pathname = "/Users/rc/Documents/source";
const extName = "tdf";

const studentScoreMap = new Map();
for (const code of teSubList) {
	const filePath = pathname + "/" + code + "." + extName;
	const data = fs.readFileSync(filePath, "utf8");
	const dataList = data.split(/\n/);
	dataList.splice(0, 1);
	for (const item of dataList) {
		if (item.length > 0) {
			const itemList = item.trim().split(/\s+/);
			let studentNo = itemList[8];
			let studentScore = Math.round(parseFloat(itemList[9]));
			// 计算机 暑期
			// if (code === "835") {
			// 	studentNo = itemList[0];
			// 	studentScore = Math.round(parseFloat(itemList[10]));
			// }
			// if (code === "910") {
			// 	studentNo = itemList[0];
			// 	studentScore = Math.round(parseFloat(itemList[12]));
			// }
			// 电通 暑期
			if (code === "962") {
				studentNo = itemList[0];
				studentScore = Math.round(parseFloat(itemList[11]));
			}
			if (code === "951") {
				studentNo = itemList[0];
				studentScore = Math.round(parseFloat(itemList[12]));
			}
			if (studentScoreMap.get(studentNo) !== undefined) {
				studentScoreMap.set(studentNo, studentScoreMap.get(studentNo).concat([studentScore]));
			} else {
				studentScoreMap.set(studentNo, [studentScore]);
			}
		}
	}
}

const studentAvgMap = new Map();

for (const key of studentScoreMap.keys()) {
	let sum = 0;
	for (const score of studentScoreMap.get(key)) {
		sum += score;
	}
	const avg = parseFloat(sum / studentScoreMap.get(key).length).toFixed(2);
	studentAvgMap.set(key, avg);
}

let idx = 1;
for (const studentNo of studentAvgMap.keys()) {
	console.log(`${studentNo} ${studentScoreMap.get(studentNo)} ${studentAvgMap.get(studentNo)}`);
	idx++;
}
console.log(idx);
