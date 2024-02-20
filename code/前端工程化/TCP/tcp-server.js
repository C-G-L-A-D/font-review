/**
 * 使用 Nodejs 内置 net 模块
 * 创建TCP服务，监听端口，接收远程客户端连接
 * 可使用浏览器访问TCP端口，模拟客户端发送TCP请求
 */

const net = require("net");

// 将回复信息封装成TCP报文，才能再浏览器显示出来
// 报文前不能又空格
function responseData(str, status = 200, desc = "OK") {
  return `HTTP/1.1 ${status} ${desc}
Connection: keep-alive
Date: ${new Date()}
Content-Length: ${str.length}
Content-Type: text/html

${str}\n\n`;
}

const server = net
  .createServer((socket) => {
    // 连接建立时调用
    socket.on("data", (data) => {
      const matched = data.toString("utf-8").match(/^GET ([/\w]+) HTTP/);
      if (matched) {
        const path = matched[1];
        // 默认路径才能找到资源
        if (path === "/") {
          socket.write(responseData("<h1>Hello world</h1>"));
        } else {
          socket.write(responseData("<h1>Not Found</h1>", 404, "NOT FOUND"));
        }
      }

      console.log(`DATA:\n\n${data}`);
    });

    socket.on("close", () => {
      console.log("连接关闭！\n\n");
    });
  })
  .on("error", (err) => {
    throw err;
  });

// 通过listen方法与客户端建立连接
server.listen(
  {
    // 全0默认都可以建立连接
    host: "0.0.0.0",
    port: 8080,
  },
  () => {
    console.log("打开服务监听", server.address());
  }
);
