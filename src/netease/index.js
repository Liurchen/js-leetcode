function maxSumSubset(nums) {
	const sortedNums = nums.sort((a, b) => {
		return b - a;
	});
	let maxSum = 0;
	let sum = 0;
	for (const val of sortedNums) {
		sum += val;
		if (sum % 7 === 0) maxSum = sum;
	}
	return maxSum;
}

function numberOfPalindromeSubstr(str) {
	let cnt = 0;
	for (let i = 0; i < str.length - 1; i++) {
		for (let j = i + 1; j <= str.length; j++) {
			const tmp = str.substring(i, j);
			if (isPalindrome(tmp) && tmp.length > 1) cnt++;
		}
	}
	return cnt;
}

function isPalindrome(str) {
	const str2arr = str.split("");
	const reverse = str2arr.reverse();
	return str === reverse.join("");
}

function lengthOfMaxSubstr(str) {
	let maxLen = 0;
	for (let i = 0; i < str.length - 1; i++) {
		for (let j = i + 1; j <= str.length; j++) {
			const tmp = str.substring(i, j);
			// console.log(tmp);
			if (requirementChecker(tmp) && tmp.length > maxLen) maxLen = tmp.length;
		}
	}
	return maxLen;
}

function requirementChecker(str) {
	// 验证是否满足条件 返回boolean
	let map = { a: 0, b: 0, c: 0, x: 0, y: 0, z: 0 };
	const str2arr = str.split("");
	for (const key of str2arr) {
		if (map[key] !== undefined) {
			map[key] = map[key] + 1;
		}
	}
	for (const key of Object.keys(map)) {
		if (map[key] % 2 !== 0) return false;
	}
	return true;
}

function cherryPick(root) {
	if (root !== null) {
		if (
			root.left !== null &&
			root.right !== null &&
			root.left.left === null &&
			root.right.right === null &&
			root.left.right === null &&
			root.right.left === null
		) {
			return 1 + cherryPick(root.left) + cherryPick(root.right);
		} else {
			return cherryPick(root.left) + cherryPick(root.right);
		}
	} else {
		return 0;
	}
}

function TreeNode(val) {
	this.val = val;
	this.right = null;
	this.left = null;
}

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let idx = 0;
let nodeNumber = 0;
let lineNumber = 0;
const heap = {};
rl.on("line", (line) => {
	// const arr = line.split(" ");
	// for (let i = 0; i < arr.length; i++) {
	// 	arr[i] = parseInt(arr[i]);
	// }
	// console.log(maxSumSubset(arr));

	// console.log(numberOfPalindromeSubstr(line));

	// console.log(lengthOfMaxSubstr(line));

	if (idx === 0) {
		const line1 = line.trim().split(" ");
		nodeNumber = parseInt(line1[0]);
		lineNumber = parseInt(line1[1]);
		for (let i = 1; i < nodeNumber + 1; i++) {
			heap[i] = new TreeNode(i);
		}
	} else {
		const nodeInfo = line.trim().split(" ");
		if (nodeInfo[1] === "left") {
			heap[nodeInfo[0]].left = heap[nodeInfo[2]];
		} else {
			heap[nodeInfo[0]].right = heap[nodeInfo[2]];
		}
		if (idx === lineNumber) {
			console.log(cherryPick(heap["1"]));
			rl.close();
		}
	}
	idx++;
});
