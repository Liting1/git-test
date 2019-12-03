let mime = {
	"css": "text/css",
	"gif": "image/gif",
	"html": "text/html",
	"ico": "image/x-icon",
	"jpeg": "image/jpeg",
	"jpg": "image/jpeg",
	"js": "text/javascript",
	"json": "application/json",
	"pdf": "application/pdf",
	"png": "image/png",
	"svg": "image/svg+xml",
	"swf": "application/x-shockwave-flash",
	"tiff": "image/tiff",
	"txt": "text/plain",
	"wav": "audio/x-wav",
	"wma": "audio/x-ms-wma",
	"wmv": "video/x-ms-wmv",
	"xml": "text/xml"
}



module.exports = {
	mime,
	// 设置主机名
	host: '127.0.0.1',
	// 服务器的端口号
	PORT: 1910,
	// 配置需要静态的文件目录
	staticPath: './assets',
	// 设置服务器需要缓存的文件类型
	fileMatch: /^(gif|png|jpg|js|css)$/ig,
	// 设置缓存时间为1年
	maxAge: 20,
	// 设置需要压缩的文件类型
	zipMatch: /css|js|html/ig,
	// 默认首页
	homePage: 'index.html',
	// 显示文件列表
	showList: true
}