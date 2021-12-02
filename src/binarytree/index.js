function Node (val) {
    this.val = val;
    this.next = null;
}

function TreeNode (val) {
    this.val = val;
    this.right = null;
    this.left = null;
}

const root = new TreeNode(1)
const n1 = new TreeNode(2)
const n2 = new TreeNode(3)
const n3 = new TreeNode(4)
const n4 = new TreeNode(5)

root.left = n1;
root.right = n2;
n1.left = n3;
n1.right = n4;

const head = new Node(root.val)
const p = head;

function preorder(node) {
    if (node !== null) {
        if (node !== root) {
            let tmp = new Node(node.val)
            p.next = tmp;
            p = p.next;
        }
        preorder(node.left)
        preorder(node.right)
    }
}

var iterator1 = function (treeNodes) {
    var stack = [];
    stack.push(treeNodes)

    var item;

    while (stack.length) {
        item = stack.shift();

        console.log(item.key);

        //如果该节点有子节点，继续添加进入栈底
        if (item.children && item.children.length) {
            //len = item.children.length;

            // for (i = 0; i < len; i++) {
            //  stack.push(item.children[i]);
            // }

            stack = stack.concat(item.children);
        }
    }
};

console.log('------------- 非递归广度优先实现 ------------------');
iterator1(treeNodes);