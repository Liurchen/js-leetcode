class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

function reverse(head) {
	if (head === null) {
		return head;
	}
	const tmp = reverse(head.next);
	h.next.next = h;
	h.next = null;
	return tmp;
}

const h = new Node(1);
const n = new Node(2);
h.next = n;

const res = reverse(h);
console.log(res);
