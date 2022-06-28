const SocketIO = require('socket.id');

module.exports = (server) => {
  const io = SocketIO(server, { path: '/socket.id' }); // 프론트랑 일치시키면 된다.

  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip); // socket.id는 어떤 사람이 웹소켓 접속했을 때 고유한 id가 부여된다. 그 고유한 id로 그 사람에 대한 작업을 할 수 있다. 어떤 채팅방에 있는지 알 수 있고 쫓아낼 때도 쓰일 수 있다.
    socket.on('disconnect', () => {
      // 연결 종료 시
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });
    socket.on('error', (error) => {
      // 에러 시
      console.error(error);
    });
    socket.on('reply', (data) => {
      console.log(data);
    });
    socket.interval = setInterval(() => {
      socket.emit('news', 'Hello Socket.IO');
    }, 3000);
  });
};
