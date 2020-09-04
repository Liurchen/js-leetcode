// task 1
// Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

function moveZero(nums) {
	let slow = 0;
	for (let fast = 0; fast < nums.length; fast++) {
		if (nums[fast] != 0) {
			nums[slow] = nums[fast];
			slow++;
		}
	}
	for (let i = slow; i < nums.length; i++) {
		nums[i] = 0;
	}
	printArray(nums);
}

function printArray(array) {
	let out = "";
	for (const item of array) {
		out += item + " ";
	}
	console.log(out);
}

// const nums = [0, 1, 0, 3, 12];

// moveZero(nums);

// task 2 merge binary trees

// define binary tree node
function Node(val) {
	this.val = val;
	this.left = null;
	this.right = null;
}

// 递归实现
function mergeTrees(root1, root2) {
	if (root1 === null) {
		return root2;
	}
	if (root2 === null) {
		return root1;
	}
	root1.val += root2.val;
	root1.left = mergeTrees(root1.left, root2.left);
	root1.right = mergeTrees(root1.right, root2.right);
	return root1;
}

// 层序遍历
function printBinaryTreeLevelOrder(root) {
	const queue = [];
	if (root !== null) queue.push(root);
	while (queue.length > 0) {
		let tmp = queue.shift();
		console.log(tmp.val);
		if (tmp.left !== null) queue.push(tmp.left);
		if (tmp.right !== null) queue.push(tmp.right);
	}
}

const root1 = new Node(1);
const n1 = new Node(3);
const n2 = new Node(2);

root1.left = n1;
root1.right = n2;

const n3 = new Node(5);
n1.left = n3;

const root2 = new Node(2);
const n4 = new Node(1);
const n5 = new Node(3);

root2.left = n4;
root2.right = n5;

const n6 = new Node(4);
const n7 = new Node(7);

n4.right = n6;
n5.right = n7;

// mergeTrees(root1, root2);
// printBinaryTreeLevelOrder(root1);

// task 3
// 组装 url
// 其实是多叉树的层序遍历

function genURL(requireTree) {
	const base = "http://res.wx.qq.com/";
	const queue = [];
	const stack = [];
	if (requireTree !== null) queue.push(requireTree);
	while (queue.length > 0) {
		let tmp = queue.shift();
		stack.unshift(tmp.name);
		if (tmp.require && tmp.require.length > 0) {
			for (const inner of tmp.require) {
				if (inner !== null) queue.push(inner);
			}
		}
	}
	let requireStr = "";
	for (const page of Array.from(new Set(stack))) {
		requireStr += page + ",";
	}
	return base + requireStr;
}

const requireTree = {
	name: "page.js",
	require: [
		{
			name: "A.js",
			require: [
				{
					name: "C.js",
					require: [
						{
							name: "F.js",
						},
					],
				},
			],
		},
		{
			name: "B.js",
			require: [
				{
					name: "D.js",
					require: [
						{
							name: "F.js",
						},
					],
				},
				{
					name: "E.js",
					require: [],
				},
			],
		},
	],
};

genURL(requireTree);

// task 4
// 下一个更大的数

function nextGreaterNum(nums) {
	const doubleNums = [...nums, ...nums];
	const len = doubleNums.length;
	if (len === 0) return [];
	let stack = [];
	let res = new Array(len).fill(-1);
	for (let i = 0; i < len; i++) {
        console.log(res);
        console.log(stack);
		while (stack.length && doubleNums[i] > doubleNums[stack[stack.length - 1]]) {
			let index = stack.pop();
			res[index] = doubleNums[i];
		}
		stack.push(i);
	}
	return res.slice(0, res.length / 2);
}

const nums = [1, 2, 1];
console.log(nextGreaterNum(nums));
