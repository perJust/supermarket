var http = require('http');
var fs = require('fs');//引入文件读取模块
var path = require('path');
// var documentRoot = 'I:/WebServer';
//需要访问的文件的存放目录
var server= http.createServer(function(req,res){
    // console.log(req)
    // console.log("requestURL:  ",req.url)
	var url = req.url; 
	var file = path.join(__dirname, url);
	// console.log("file:   ",file)
    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html 


    var m = url.split('.');//分割出文件后缀
    var bool = m[1] === 'css'?true:false; //判断是否为css请求引入

    fs.readFile( file , function(err,data){
        if(err){
            // console.log(err);
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else if(bool){
            res.writeHeader(200,{
                'content-type' : 'text/css',
            });
            res.write(data);//将css传给客户端
            res.end();
        }else{

            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"',
            });
            res.write(data);//将index.html传给客户端
            res.end();

        }

    });

}).listen(8080);

console.log('Server Running');