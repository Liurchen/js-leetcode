class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

function reverse(head) {
	if (head === null || head.next === null) {
		return head;
	}
	const tmp = reverse(head.next);
	head.next.next = head;
	head.next = null;
	return tmp;
}

/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */

function createLinkedList(n) {
    let head = new Node(0);
    let p = head;
    for(let i = 1; i <= n - 1; i++) {
        let tmp = new Node(i);
        p.next = tmp;
        p = p.next;
    }
    p.next = head;
    return head;
}

let lastR = function(n, m) {
    let head = createLinkedList(n);
    console.log(head.next)
    while (head.next != head) {
        console.log(head.val)
        head = head.next;
    }
}

lastR(6,3)

var lastRemaining = function(n, m) {
    if(m === 1 && n < 1) return n;
    let head = createLinkedList(n);
    let count = 1;
    let pre = null;
    let cur = head;
    console.log('22',head.next == head)
    while(head.next != head) {
        console.log('count',head.next.val, head.val);
        if(count == m) {
            count = 1;
            pre.next = cur.next;
            cur = pre.next;
        } else {
            count++;
            pre = cur;
            cur = cur.next;
        }
    }
    return head.val;
};


