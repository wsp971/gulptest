var fs=require("fs");
/*未声明encoding */
var bufferStr=fs.readFileSync("test.txt");
console.log(bufferStr);


// 文件同步读取

/*声明encoding*/

var str=fs.readFileSync("index.html",{encoding:"utf-8"});
console.log(str);



/*捕获不存在文件异常异常*/


try{

var str2=fs.readFileSync("noexit.html");
console.log(str2);
}catch(err){
    console.log(err.message);
}


// 文件异步读取


console.log('异步读取文件开始');

fs.readFile("test.txt",{encoding:"utf-8"},function(err,data){
    if(err){
        console.log("文件读取失败");
        consoel.log(err);
    }else{
        console.log(data);
    }
});
