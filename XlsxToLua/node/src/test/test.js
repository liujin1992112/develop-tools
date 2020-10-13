//测试js类型转换
var convertInt = parseInt("a")
console.log(convertInt)

//NaN判断
var isRight = isNaN(convertInt)
if(isRight) {
    throw new Error("类型转换异常")
}
console.log(isRight)