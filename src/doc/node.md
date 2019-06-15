# NodeJs API

## 一、nodejs 模块加载顺序

### 当引入模块的形式是 require('lt')

1. 先找当前文件夹下的node_modules文件夹下的lt文件夹下的package.json 文件指定的main字段文件路径。
	- __如果第一种情况没有找到 ↓__
2. 找当前文件夹下的node_modules文件夹下的lt.js 文件
	- __如果第二种情况没有找到 ↓__
3. 找当前文件夹下的node_modules文件夹下的lt文件夹下的index.js 文件
	- __如果第三种情况没有找到 ↓__
4. 找的上一级node_modules文件夹，查找顺序与上面一样。
	- __如果最后还是没有找到__
5. 那么将会报错 Error: Cannot find module 'lt';

> __注意__
>
> 如果引入模块的自定义模块名字与nodejs内置模块名相同，那么会先找内置模块

## 二、内置对象 Buffer的属性及方法

1. Buffer 对象无需require()引入模块可以直接使用
2. 创建Buffer 对象的方式
```
	(1). new Buffer(size) 参数为一个数字，创建一个指定大小的Buffer对象
	(2). new Buffer(str, [encoding]) 参数为一个字符串,第二个参数为字符编码
	(3). new Buffer(array) 参数为一个数组, 用数组初始化一个缓存区
```
3. Buffer.fill(value, [offset], [end]) 初始化缓存中的所有的内容
4. Buffer.slice(start,end) 截取buffer对象，并没有生成新的buffer对象
5. Buffer.toString([encoding], [start], [end]) 将buffer对象转换为字符串，参数为指定字符编码与开始和结束位置
6. Buffer.write(string, [offset], [length], [encoding]) 写入buffer
7. Buffer对象转换为字符串 JSON.stringify()
8. Buffer.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd]) 把一个buffer对象复制到另一个buffer对象里[(a.copy(b)) 复制a到b里面]
9. Buffer.isBuffer(obj) 判断一个对象是否为一个buffer对象
10. Buffer.length 返回buffer对象的字节长度
11. Buffer.concat(list, [totallength]) 合并buffer对象返回一个新的buffer对象
12. Buffer.isEncoding(encoding) 检测一个字符串是否为有效的编码格式字符串

## 三、fs模块操作文件系统
1. fs.readFile(filename, [options], callback) 异步的读取整个文件，参数分别为 (文件路径, 读取文件时使用的选项, 回调函数->参数[err,data]), 如果读取的文件不存在就会抛出异常
2. fs.readFileSync(filename, [options]) 同步的读取文件, 返回读取后的数据
```	
	(1)、参数 option 对象的值
	var options = {
		// flag-指定文件的操作模式
		flag: 'r'(读取文件)
			'r+'(读取并写入文件,文件不存在则抛出异常)
			'rs'(以同步的方式读取文件并通知操作系统忽略本地文件系统缓存)
			'w'(写入文件,如果文件不存在则创建该文件，如果文件存在则清空文件内容)
			'wx'(以排他的方式写入文件)
			'w+'(读取并写入文件,如果文件不存在则创建该文件,如果文件已存在则清空文件内容)
			'wx+'(以排他方式打开文件)
			'a'(追加写入文件,如果文件不存在则创建该文件)
			'ax'(以排他方式写入文件)
			'a+'(读取并追加写入文件，如果文件不存在则创建该文件)
			'ax+'(以排他方式打开文件)
			// 设置读取文件的编码格式
		encoding: 'utf8' / 'ascii' / 'base64'
		// 文件被打开时对文件的读写权限, 默认是0666(可读写)
		// 1: 执行权限 2: 写权限 4: 读权限
		mode: 0666 (默认值)
	}
```
3. fs.writeFile(filename, data, [options], callback) 写入文件 参数(文件路径,需要写入的内容,配置对象,回调函数 ->参数[err])
4. fs.writeFileSync(filename, data, [option]) 使用同步的方式写入文件
5. fs.appendFile(filename, data, [option], callback) 在一个字符串或一个缓存区中的数据追加到一个文件底部 (文件名,需要写入的内容,配置对象{flag:'a'}默认值, 回调函数 ->参数[err])
6. fs.appendFileSync(filename, data, [option]) 同步追加数据
7. fs.open(filename, flags, [mode], callback) 从指定的位置开始读写文件的处理 参数(文件路径, 文件操作模式, [文件权限], 回调函数 ->参数[err错误对象,fd文件句柄])
8. fs.openSync(filename, flags, [mode]) 同步方式读写文件
9. fs.read(fd, buffer, offset, length, position, callback) 从文件的指定位置处读取文件, 一直读取到底部 参数(open方法回调函数返回的文件描述符, 文件需要读取到的缓存区, 指定向缓存区中写入数据的开始位置, 读取文件时的开始位置, 回调函数 ->参数[err错误对象, bytesRead实际读取的字节数, buffer被读取的缓存区对象] )
10. fs.readSync(fd, buffer, offer, length, position) 以同步的方式打开文件
11. fs.write(fd, buffer, length, position, callback) 从缓存区读取数据并且从文件的指定处开始写入这些数据 参数(文件描述符, 指定读取的缓存区, 读取数据的开始位置, 读取长度, 写入文时的开始位置, 回调函数->参数[err错误对象, written写入的字节数, buffer被读取的缓存区对象])
12. fs.writeSync(fd, buffer, offset, length) 同步读取文件
13. fs.close(fd, [callback]) 关闭文件
14. fs.closeSync(fd, [callback]) 同步的关闭文件
15. fs.mkdir(path, [mode], callback) 创建目录 参数(被创建的文件路径及名字, 目录权限, 回调函数->[err错误对象]);
16. fs.mkdirSync(path, [mode]) 创建目录 同步方式
17. fs.readdir(path, callback) 读取目录 参数(目录的完整路径, 回调函数->参数[err, files所有文件名数组])
18. fs.readdirSync(path) 同步读取文件目录

19. fs.stat(path, callback) 查看文件或目录的信息 参数->(err, stats)
```	
	或者fs.lstat(path, callback) 查看文件或目录的信息 参数->(err, stats)
	与其对应的同步方法为 fs.statSync(path)/ fs.lstatSync(path) // 返回一个文件描述符对象
	
	回调函数stats的一些方法
	stats.isFile() 用于判断被查看的对象是否为一个文件, 返回一个Boolean值
	stats.isDirectory() 用于判断被查看的对象是否为一个目录, 返回一个Boolean值
	stats.isBlockDevice() 用于判断被查看的文件是否为一个块设备文件 返回一个Boolean值 (仅UNIX操作系统有效)
	stats.isCharacterDevice() 用于判断被查看的文件是否为一个字符设备文件, 返回一个Boolean值 (仅UNIX操作系统有效)
	stats.isSymbolicLink() 用于判断被查看的文件是否为一个符号链接文件，如果是的话返回true，如果不是返回false，该方法仅在lstat方法的回调函数中有效
	stats.isFIFO() 用于判断被查看的文件是否为一个FIFO文件，如果是的话则返回true，如果不是返回false(仅UNIX操作系统有效)
	stats.isSocket() 用于判断被查看的文件是否为一个socket文件,如果是的话返回true，如果不是返回false (仅UNIX操作系统下有效)
	
	回调函数stats的一些属性
	stats.dev 该属性值为文件或目录所在设备ID (仅UNIX操作系统下有效)
	stats.ino 该属性值为文件或目录的索引编号 (仅UNIX操作系统下有效)
	stats.mode 该属性值为使用数值形式代表的文件或目录的权限标志
	stats.nlink 该属性值为文件或目录的硬连接数量
	stats.uid 该属性值为文件或目录的所用者的用户ID (仅在UNIX操作系统下有效)
	stats.gid 该属性值为文字或目录的所有者的组ID (仅UNIX操作系统下有效)
	stats.size 该属性值为文件尺寸(即文件中的字节数)
	stats.atime 该属性值为文件的访问时间
	stats.mtime 该属性值为文件的修改时间
	stats.ctime 该属性值为文件的创建时间
```	
20. fs.exists(path,callback) 该方法用于检查一个文件或目录是否存在 参数(目录路径, 回调函数->参数[exists] 文件或目录存在时为true反之为false)
21. fs.realpath(path,[cache],callback) 获取一个文件的或目录的绝对路径 参数(目录路径, 可选参数, 回调函数->参数[err,resolvedPath文件的绝对路径])
22. fs.realpathSync(path,[cache]) 同步的方式获取文件或目录的绝对路径 参数(路径,可选参数对象)
23. fs.utimes(path,atime,mtime,callback) 修改文件的访问时间及修改时间 参数(路径, 修改后的访问时间,修改后的修改时间, 回调函数 参数->[err])
24. fs.utimesSync(path, atime, mtime) 同步方法
25. fs.futimes(fd,atime,mtime,callback) 在文件使用fs.open()方法打开文件时使用文件描述符修改文件的访问时间或修改时间 参数(文件描述符, 修改后的访问时间, 修改后的修改时间, 回调函数)
26. fs.futimesSync(fd, atime, mtime) 同步方法
27. fs.chmod(path,mode,callback) 修改文件或目录的读写权限 参数(路径, 修改后文件或目录的读写权限, 回调函数)
```
	常用mode 值 0660 代表所有者可读写, 其他人没有任何权限
	0644 代表所有者可读写, 其他人只读
	0755 代表所有者有所有权限, 其他所有人可读和执行
	0740 代表所有者有所有权限, 所有者所在的组只读
```	
28. fs.chomdSync(path, mode) 同步方法
29. fs.fchmod(fd, mode, callback) 使用文件描述符修改文件的读写权限
30. fs.fchmodSync(fd, mode) 同步方法
31. fs.rename(oldpath,newpath,callback) 移动文件或目录, 当移动后的路径与原路径为同一路径，而移动的文件或目录名与源文件名或目录名不同时则执行文件或目录的重命名 参数(移动前的路径, 移动后的路径, 回调函数->参数[err])

## 四、path模块的方法

1. path.normalize(url); 将一个非标准的url路径转换为一个标准的路径 参数(路径名)
2. path.join(path1,path2,...) 将多个路径合并为一个正常的路径
3. path.resolve(path1,path2,...) 根据多个路径的关系返回一个绝对路径
4. path.relative(from, to) 返回两个路径之间的相对路径 (to相对于from的路径）
5. path.dirname(p) 返回一个文件或目录所在的文件夹路径
6. path.basename(p, [ext]) 返回一个路径中的文件名 参数(文件的完整路径及文件名, 可选参数[去除文件后缀名])
7. path.extname(p) 返回一个文件路径中文件的扩展名
8. path.sep属性 指定操作系统的文件分隔符
9. path.delimiter属性 为操作系统指定路径分隔符

## 五、net模块实现TCP通信

1. net.createServer([options], [connectionListener]); 创建一个TCP服务 参数(可选配置对象, 可选回调函数->参数[socket]为一个连接对象);

```js
	let server = net.createServer();
	server.on('connection', function(socket){
		// 当有客户端连接成功时就会出发该事件
		console.log('连接成功'); 
		
		// 用于查看当前连接的信息, 包括ip, 端口, ip类型
		let address = socket.address();
		
		// 可以选择设置接收客户端数据的字符编码
		socket.setEncoding('utf8');

		// 可以将信息写入文件中,file为一个可以写入数据的数据流对象
		socket.pipe(file);
		
		socket.on('data', function(data){
			// 当客户端发送消息给服务端时就会触发该事件
			console.log(data); // 默认是Buffer类型
		});

		socket.on('end', function(){
			// 当客户端断开连接的时候回触发该事件
			console.log('客户端断开了连接');
		});

		server.getConnections((err, count) => {
			// 获取服务器当前的连接数量
			console.log('当前连接数：'+ count)
		});

		server.close(function(){
			// 用于关闭TCP连接
			console.log(服务器关闭了);
		});
	});

	server.on('error', function(err){
		// 当连接出现错误就会触发该事件
		if(err) {
			console.log(err);
		}
	});
	// 该方法用于启动服务器, 参数(需要监听的端口, 服务器的ip或域名, 回调函数)
	server.linsten(8000, 'localhost', ()=>{
		console.log('服务器启动成功');
		
		// 查看服务器信息, 包括ip,端口号, ip类型
		let address = server.address(); 
		console.log(address);
	});

```
2. let client = new net.Socket([options]); 创建一个TCP客户端连接, 参数(可选配置对象)

```js
	client.connect(8000, 'localhost', ()=>{
		// 当客户端连接成功服务端就会触发该函数
		console.log('客户端连接服务端成功');
		
		// 发送信息, 有三个参数,分别为(发送的信息, 可选参数信息编码, 可选参数回调函数)
		client.write('发送给服务端的信息');

		// 客户端断开连接
		client.end('断开连接')
	});

	client.on('data', function(data){
		// 当服务器发送消息给客户端是会触发该事件
		console.log('接收到服务器的信息:'+ data);
	});

	client.on('error', function(err){
		// 当客户端练级发生错误时触发该事件
		if(err) {
			console.log(err);
		}
	});

```

3. net模块中的一些类方法

```js
	net.isIP(ip); 判断一个字符串是否是ip地址, 返回对应的ip地址类型, 如果不是则返回 0
	net.isIPv4(ip); 判断一个字符串是否为一个IPv4类型的ip地址
	net.isIPv6(ip); 判断一个字符串是否为一个IPv6类型的ip地址
```

## 六、dgram模块实现UDP通信

1. let socket = dgram.createSocket(type, [cllvack]); 创建一个UPD通信对象, 参数(通信的协议类型upd4/6, 可选参数回调函数->[msg, rinfo]分别为接收到的信息,发送信息对象的信息,包含ip地址端口等);

```js
	let server = dgram.createSocket('udp4');
	server.on('message', function(msg, rinfo){
		// 当客户端发送数据时就会触发该事件

		console.log(msg); // 客户端发送的消息
		console.log(rinfo); // 客户端的信息
		
		server.setBroadcast(true); // 实现广播

		// 创建一个Buffer对象
		let buf = new Buffer('服务端已经收到信息');
		// 将数据发送给客户端表示数据已经接收到, 参数为(需要发送个客户端的信息类型为buffer, buffer的开始位置, buffer的结束位置, 客户端的端口, 客户端的address信息, 可选参数回调函数);
		server.send(buf, 0, buf.length, rinfo.port,rinfo.address);


		// 关闭服务器
		server.close();
	});

	server.on('listening', function(){
		// 启动服务器成功时会触发该事件
		console.log('服务器开始监听');

		// address为服务器的信息
		let address = server.address();
	});
	// 选择监听的端口
	server.bind(8080, 'localhost');
```

## 七、http模块

1. let server = http.createServer([requestListener]); 创建一个http服务, 参数(可选参数为一个回调函数->[request, response]分别表示请求对象和响应对象);

```js
	let server = http.createServer();
	// 监听服务器请求事件，当发生请求时触发该方法
	server.on('request', function(request, response){
		console.log(request, response);
	});
	
	// 监听服务器对应的端口号, 参数(端口号, 服务器地址, 可选参数规定连接的最大数量, 可选参数回调函数)
	server.listen(8080, 'localhost', function(){
		console.log('服务器启动成功');
	});
	// 也可以选择这样启动服务器
	server.on('listening', function(){
		// 
		当服务器启动成功时调用次函数
	});


	server.close(); // 关闭服务器
	// 或者 这样关闭服务器
	server.on('close', function(){
		// 关闭服务器的回调函数
	});

	server.on('error', function(err){
		if(err.code == 'EADDRINUSE'){ // 表示端口被占用
			console.log(err);
		}
	});
	
	// 没当客户端发起一个http请求就会建立一次连接
	server.on('connection', function(socket){
		console.log('客户端连接已建立');
	});
	
	// 设置服务器请求超时的时间和超时回调函数, 服务器默认超时时间为2分钟
	server.setTimeout(100, function(socket){
		// 当请求超时时触发该函数
	});

	// 也可以使用超时时的回调函数
	server.on('timeout', function(socket){});

	// 可以获取或设置服务器超时时间
	server.timeout

```

2. http请求的请求对象request

```js
	let server = http.createServer(function(req, res){
		// req 指的就是发出请求时的请求信息

		req.method // 获取请求时的请求对象
		req.url // 获取请求的url
		req.headers // 获取客户端请求时的请求头信息
		req.httpVersion // 获取客户端的http请求的版本号

	}).listen(8080, '127.0.0.1');

```

3. http请求的请求对象response

```js
	const http = require('http');

	http.createServer(function(req, res){
		// res 就是后端返回给前端请求数据的响应信息

		res.writeHead(statusCode, [reasonPhrase], [headers]); // 设置响应头信息只能使用一次，参数(响应的状态码，状态描述信息，指定服务端创建的响应头对象)
		// 响应头中包含的一些常用字段
		/*
			content-type: 用于指定内容类型
			location: 用于指定一个被下载的文件名
			content-disponsition: 用于指定一个被下载的文件名
			content-length: 用于指定服务器端响应内容的字节数
			set-cookie: 用于在客户端创建一个cookie
			content-encoding: 用于指定服务器端响应的内容的编码方式
			Cache-Control: 用于开启缓存机制
			Expires: 用于指定缓存过期时间
			Etag: 用于指定服务器响应内容没有变化时不从新下载数据
			Access-Control-Allow-Origin: 设置允许对应的网址跨域请求
		*/
		
		res.setHeader(name, value); // 单独设置响应头信息可以使用多次， 参数(响应头字段，对应的值)
		res.getHeader(name); // 获取对应的响应头字段的值
		res.removeHeader(name); // 删除对应的响应头字段
		res.write(chunk,[encoding]); // 发送后端的响应数据给前端, 参数(字符串或buffer类型,编码格式)
		res.end([chunk], [encoding]); // 结束响应,有两个可选参数，和write方法的参数一样
		res.on('close', function(){
			// 当结束响应后需要执行的回调函数
		})
		res.setTimeout(msecs, [callback]); // 设置响应超时时间，参数(超时时间, 回调函数)
	});
```

4. http.request(option, callback); 向其他服务器发出请求并读取该网站的响应数据

```
	// option 对象的配置属性
	
	1. host: 用于指定域名或主机的IP地址，默认属性值为"localhost"。
	2. hostname: 用于指定域名或目标主机IP。默认属性值为"localhost"。如果hostname属性值与host属性值都被指定，优先使用hostname属性值。
	3. prot: 用于指定目标服务器用于HTTP客户端连接的端口号
	4. localAddress: 用于指定专用于网络连接的本地接口
	5. socketPath: 用于指定目标UNIX域端口
	6. method: 用于指定HTTP请求方式。默认值为GET
	7. path： 用于指定请求路径及查询字符串，默认属性值为 "/"
	8. headers: 用于指定客户端请求头对象
	9. auth: 用于指定认证信息部分
	10. agent: 用于指定HTTP代理

	// 回调函数中有一个参数
	http.request(option,function(response){
		// 回调函数代码
	});

	// 使用事件监听的形式
	let request = http.request(option);

	request.on('response', function(res){
		// 回调函数代码
		// res.statusCode 请求的状态码
		// res.headers 请求头信息
	    // res.setEncoding('utf-8'); 设置响应体的编码格式，默认是buffer

		res.on('data',function(chunk){
			// 返回请求的响应体
		})
	});

	request.write(chunk, [encoding]); // 向目标网站发送数据
	request.end(chunk, [encoding]); // 结束请求, 每次发出请求都需要记得结束请求，不然会一直挂起并且无法接收到请求的数据

	request.setTimeout(1000, function(){
		// 当请求事件超过1000ms,则设置请求超时，终止请求
		request.abort();
	})
	request.abort(); // 终止请求
```



## 八、querystring 模块

1. querystring.parse(str, [sep], [eq], [option]); 将一个字符串转换为一个对象 第一个参数为需要转换的字符串，第二参数为该字符串的分割符号(默认是&),第三个参数为字符串中的分配符(默认是=),第四个参数为一个配置对象

> 注意：当参数字符串中有相同的字段时会转换为一个数组
>
> 例如： hobby=打篮球&hobby=打羽毛球      ===>   {hobby;['打篮球', '打羽毛球']}

2. querystring.stringify(obj,[sep],[eq]); 将一个对象转换为url形式的字符串 第一个参数为需要转换的对象，第二参数为该字符串的分割符号(默认是&),第三个参数为字符串中的分配符(默认是=),第四个参数为一个配置对象


## 九、url模块

1. url.parse(urlStr, [parseQueryString]) 将一个完整的url转换成对象, 返回对象的属性有
	- href: 被转换的原url字符串
	- protocol： 客户端发出请求使用的协议
	- slashes: 在协议与路径中间是否使用'//'分隔符
	- host: url字符串中完成地址及端口号，该地址可能为一个IP地址，也有可能为一个主机名
	- auth: url字符串中的认证信息部分
	- port: url字符串中的端口号
	- pathname: url字符串中的路径，不包含查询字符串
	- search： url字符串中的查询字符串，包含起始字符 "?"
	- path: url字符串中的路径，包含查询字符串
	- query: url字符串中的查询字符串，不包含起始字符串 "?" 
	- hash: url字符串中的散列字符串，包含起始符号 "#"

2. url.format(urlObj); // 可以将url.parse() 返回后的对象再转回为原来的url路径

3. url.resolve(form, to); // 可以将两个url路径合并成一个，一般(第一个为起始路径，第二个参数为拼接路径)






























