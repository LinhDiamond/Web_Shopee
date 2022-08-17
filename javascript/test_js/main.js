// Tạo ra hàm reduce() của mảng
Array.prototype.reduce2 = function(callBack, result){
    var i = 0
    if(arguments.length < 2) {
        result = this[0]
        i = 1
    }
    for( ; i < this.length; i++)
    {
        result = callBack(result, this[i], i, this)
    }
    return result
}

const numbers = [1, 2, 3, 4, 5]

const result = numbers.reduce2((total, number) => {
    return total + number;
})
// console.log(result)





function arrToObj(array){
    var inFo = array.reduce((acc, cur) => {
        for(var i = 0; i < cur.length ;i++)
        {
            acc[cur[0]] =  cur[1]
        }
        return acc;
    }, {})
    return inFo
}

// Expected results:
var arr = [
    ['name', 'Sơn Đặng'],
    ['age', 18],
];
// console.log(arrToObj(arr)); // { name: 'Sơn Đặng', age: 18 }
