// server 入口文件

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const {
	PORT,
	host,
	staticPath,
	fileMatch,
	maxAge,
	zipMatch,
	homePage,
	showList,
	mime
} = require('./config');

// 实现一个简单的静态服务器
let server = http.createServer(function(req, res){
	// 获取当前请求路径，不包含参数
	let pathname = url.parse(req.url).pathname;
	
	req.isok = false;
	// 添加更目录文件夹
	let realPath = staticPath + pathname;
	pathHandle(req, res, realPath);
});

server.listen(PORT, host, function(){
	console.log('server is running at port:'+ host+':'+ PORT);
});


// 对文件路径进行映射函数
function pathHandle(req, res, realPath){
	// 获取文件的相关信息
	fs.stat(realPath, function(err, stats){
		// 如果发生错误 返回404
		if(err) {
			if(showList && req.isok) { // 如果需要显示文件列表
				// 如果路径错误数于查找首页错误则显示列表
				fileList(req, res, realPath);
			} else {
				res.writeHead(404, 'Not Found', {'Content-Type': 'text/plain'});
				res.write(`This request URL ${req.url} was not found on this server`);
				res.end();
			}
		} else {
			if(stats.isDirectory()) { // 如果是文件加
				// 添加默认首页
				let realPath2 = path.join(realPath, '/', homePage);
				req.isok = true;
				pathHandle(req, res, realPath2);
			} else { // 否则是文件

				// 获取文件对应的后缀名
				let ext = path.extname(realPath);
				// 由于获取的该文件的后缀名包含(.)所有需要截取掉前面的点
				ext = ext ? ext.slice(1): 'unknow';
				// 获取文件对应的mime类型
				let contentType = mime[ext] || 'text/plain';
				// 设置文件相应头
				res.setHeader('Content-Type', contentType);

				// 获取文件最后修改的时间
				let lastModified = stats.mtime.toUTCString();
				// 设置文件最后修改时间 响应头
				res.setHeader('Last-Modified', lastModified);
				// 判断当前请求的文件类型是否是需要缓存的文件类型
				if(ext.match(fileMatch)) { // 如果是则进行缓存处理
					let expires = new Date();
					// 在当前的时间加上需要缓存的时间
					expires.setTime(expires.getTime() + maxAge * 1000);

					// 设置响应头
					// 允许客户端列出某请求所要求的服务器行为
					res.setHeader('Expires',expires.toUTCString());
					// 用于随报文传送缓存指示
					res.setHeader('Cache-Control', 'max-age='+ maxAge);
				}

				// 除非在某个指定的日期之后资源被修改过，否则就限制这个请求
				let ifModifiedSince = 'If-Modified-Since'.toLowerCase();
				// 判断请求头中是否有 If-Modified-Since 字段
				// 并且该字段的值是否等于 刚刚获取的文件修改时间
				if(req.headers[ifModifiedSince] && req.headers[ifModifiedSince] == lastModified) {
					// 如果没有修改过返回状态吗304状态吗,使用浏览器缓存
					res.writeHead(304, 'Not Modified');
					res.end();
				} else { // 如果修改过

					// 以流的形式读取文件
					let raw = fs.createReadStream(realPath);
					raw.on('error',function(err){
						res.writeHead(500, 'Internal Server Error', {'Content-Type': 'text/palin'});
						res.end(err);
					});
					// 获取请求头中的对应字段
					let acceptEncoding = req.headers['accept-encoding'] || '';
					// 判断当前文件类型是否是需要压缩的文件类型
					let matched = ext.match(zipMatch);

					if(matched && acceptEncoding.match(/\bgzip\b/)) {
						// 设置响应头信息
						// 对请求主题进行gzip格式压缩
						res.writeHead(200, 'OK', {'Content-Encoding': 'gzip'});
						// 压缩并写入到响应信息中
						raw.pipe(zlib.createGzip()).pipe(res);
					} else if (matched && acceptEncoding.match(/\bdeflate\b/ig)){
						res.writeHead(200, 'OK', {'Content-Encoding': 'deflate'});
						raw.pipe(zlib.createDeflate()).pipe(res);
					} else {
						res.writeHead(200, 'OK');
						raw.pipe(res);
					}
				}
			}
		}
	});
}

function fileList(req, res, realPath){
	// 获取文件所在的文件夹
	let pathname = path.dirname(realPath);
	fs.readdir(pathname, function(err, files){
		if(err) {
			throw err;
		}

		// 创建异步序列
		let arr = [];
		for(let i = 0; i< files.length; i++) {
			arr.push(new Promise(function(resolve, reject){
				fs.stat(pathname+'/'+files[i], function(err, stats){
					if(err) {
						return reject(err);
					}
					// 如果是文件夹
					if(stats.isDirectory()) {
						resolve({
							state: 100 + i,
							filename: files[i],
							mtime: stats.mtime,
							size: stats.size,
							url: path.join(req.url,'/',files[i])
						});
					}
					// 如果是文件
					if(stats.isFile()) {
						resolve({
							state: 200 + i,
							filename: files[i],
							mtime: stats.mtime,
							size: stats.size,
							url: path.join(req.url,'/',files[i])
						});
					}
				})
			}));
		}

		Promise.all(arr).then(ars=>{
			res.writeHead(200, 'OK', {'Content-Type': 'text/html'});
			ars.sort((a,b)=>a.state-b.state);
			res.write(renderTemplate(ars));
			res.end();
		})
	})
}

// 模板函数
function renderTemplate(c){
	let txt = c.map(item=>{
		return `<tr>
			<td><a class="icon ${(~~(item.state/100) === 1)? 'dir' : 'file'}" href="${item.url}">${item.filename}</a></td>
			<td>${item.size}B</td>
			<td>${item.mtime.toUTCString()}</td>
		</tr>`
	}).join('');


	let template = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>list</title>
	    <link rel="stylesheet" href="/css/bootstrap-3.3.7/css/bootstrap.min.css">
	    <style>
	    	.icon {
	    		padding-left: 24px;
	    	}
	    	.dir {
	    		background: url(/img/w.png) no-repeat left center;
	    	}
	    	.file {
	    		background: url(/img/f.png) no-repeat left center;
	    	}
	    </style>
	</head>
	<body>
		<div class="container">
			<h1>目录列表</h1>
		    <table class="table">
		        <thead>
		            <tr class="header" id="theader">
		                <th>名称</th>
		                <th class="detailsColumn">
		                    大小
		                </th>
		                <th class="detailsColumn">
		                    修改日期
		                </th>
		            </tr>
		        </thead>
		        <tbody id="tbody">${txt}</tbody>
		    </table>
		</div>
	</body>
	</html>`;
	return template;
}