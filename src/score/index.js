const fs = require("fs");

const cs_sub_list = ["835", "971", "924", "927", "940", "814", "933", "964", "968", "910"];

const te_sub_list = ["e950", "e955", "e980", "e967", "e801", "e882", "e906", "962", "951"];

const path_name = "/Users/rc/Documents/source";
const ext_name = "tdf";

const student_score_map = new Map();
for (const code of te_sub_list) {
	const file_path = path_name + "/" + code + "." + ext_name;
	const data = fs.readFileSync(file_path, "utf8");
	const data_list = data.split(/\n/);
	data_list.splice(0, 1);
	for (const item of data_list) {
		if (item.length > 0) {
			const item_list = item.trim().split(/\s+/);
			let student_no = item_list[8];
			let student_score = Math.round(parseFloat(item_list[9]));
			// 计算机 暑期
			// if (code === "835") {
			// 	student_no = item_list[0];
			// 	student_score = Math.round(parseFloat(item_list[10]));
			// }
			// if (code === "910") {
			// 	student_no = item_list[0];
			// 	student_score = Math.round(parseFloat(item_list[12]));
			// }
			// 电通 暑期
			if (code === "962") {
				student_no = item_list[0];
				student_score = Math.round(parseFloat(item_list[11]));
			}
			if (code === "951") {
				student_no = item_list[0];
				student_score = Math.round(parseFloat(item_list[12]));
			}
			if (student_score_map.get(student_no) !== undefined) {
				student_score_map.set(student_no, student_score_map.get(student_no).concat([student_score]));
			} else {
				student_score_map.set(student_no, [student_score]);
			}
		}
	}
}

const student_avg_map = new Map();

for (const key of student_score_map.keys()) {
	let sum = 0;
	for (const score of student_score_map.get(key)) {
		sum += score;
	}
	const avg = parseFloat(sum / student_score_map.get(key).length).toFixed(2);
	student_avg_map.set(key, avg);
}

let idx = 1;
for (const student_no of student_avg_map.keys()) {
	console.log(`${student_no} ${student_score_map.get(student_no)} ${student_avg_map.get(student_no)}`);
	idx++;
}
console.log(idx);
