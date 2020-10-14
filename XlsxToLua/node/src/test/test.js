function testParseInt() {
    //测试js类型转换
    var convertInt = parseInt("a")
    console.log(convertInt)

    //NaN判断
    var isRight = isNaN(convertInt)
    if(isRight) {
        throw new Error("类型转换异常")
    }
    console.log(isRight)
}
// testParseInt()

function testParseJson() {
    var obj = {}
    obj.name = "liujin"
    obj.age = 18

    var jsonStr = JSON.stringify(obj)
    console.log(jsonStr)

    try {
        var jsonStr = jsonStr.substring(0, jsonStr.length - 2)
        console.log(JSON.parse(jsonStr))
    } catch (error) {
        console.log(error)
    }

}

testParseJson()

