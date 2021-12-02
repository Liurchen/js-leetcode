// 快排
function quickSort(arr) {
    let len = arr.length;
    console.log('len', len);
    if(len <= 1) return arr;
    let idx = Math.floor(len / 2);
    let middleValue = arr.splice(idx, 1)[0];
    let left = [];
    let right =[];
    // Q：此处如果直接写 i <len 会提示栈溢出  len永远都是2
    for(let i = 0; i < len; i++) {
        console.log('hhh', i , len)
        if(arr[i] < middleValue) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([middleValue], quickSort(right));
 }

 let arr = [5,4,3,2,1];

 console.log(quickSort(arr));