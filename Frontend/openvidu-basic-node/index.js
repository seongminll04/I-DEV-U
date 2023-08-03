require("dotenv").config(!!process.env.CONFIG ? {path: process.env.CONFIG} : {});
var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var OpenVidu = require("openvidu-node-client").OpenVidu;
var socketIo = require('socket.io');
var cors = require("cors");
var app = express();

// 노드서버
var SERVER_PORT = process.env.SERVER_PORT;
// openvidu 서버
var OPENVIDU_URL = process.env.OPENVIDU_URL;
// opvidu 서버 비번
var OPENVIDU_SECRET = process.env.OPENVIDU_SECRET;

// Cors 지금은 전체인데 나중에 바꿔줘야함
app.use(
  cors({
    origin: "*",
  })
);

// express 로 HTTP 서버를 생성
var server = http.createServer(app);
// openvidu 클라이언트 객체를 초기화
var openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
// socket.io 초기화
var io = socketIo(server);

// express 앱에 bodyParser 미들웨어를 추가하여 POST 요청의 body를 쉽게 파싱
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// '/public' 디렉토리의 정적 파일을 호스팅
app.use(express.static(__dirname + '/public'));

// 지정된 포트에서 HTTP 서버를 시작
server.listen(SERVER_PORT, () => {
  console.log("Application started on port: ", SERVER_PORT);
  console.warn('Application server connecting to OpenVidu at ' + OPENVIDU_URL);
});

// openvidu 세션을 생성하는 API 엔드포인트를 정의
app.post("/api/sessions", async (req, res) => {
  var session = await openvidu.createSession(req.body);
  res.send(session.sessionId);
});

// 지정된 세션 ID에 연결을 생성하는 API 엔드포인트를 정의
app.post("/api/sessions/:sessionId/connections", async (req, res) => {
  var session = openvidu.activeSessions.find(
    (s) => s.sessionId === req.params.sessionId
  );
  if (!session) {
    res.status(404).send();
  } else {
    var connection = await session.createConnection(req.body);
    res.send(connection.token);
  }
});

// 미처리된 예외를 처리
process.on('uncaughtException', err => console.error(err));

// 유저 세션 초기화
var userSessions = {};


// 여긴 p2p 시그널링서버 이벤트 핸들러

io.on('connection', function(socket) {
    socket.on('offer', function(data){
        socket.to(data.target).emit('offer', data);
    });

    socket.on('answer', function(data){
        socket.to(data.target).emit('answer', data);
    });

    socket.on('ice-candidate', function(data){
        socket.to(data.target).emit('ice-candidate', data);
    });

    socket.on('join-session', function(data) {
      
      // 유저의 세션 정보를 저장
      userSessions[socket.id] = {
          userId: data.userId,
          sessionId: data.sessionId
      };
      
      // socket.io의 방을 사용하여 세션별로 유저들을 그룹화
      socket.join(data.sessionId);
    });

    socket.on('disconnect-user', function() {
        console.log('유저 접속해제:', socket.id);

        // 유저의 세션 참가 정보를 제거
        if (userSessions[socket.id]) {
            const userSession = userSessions[socket.id];
            socket.leave(userSession.sessionId);

            console.log('유저 :', userSession.userId, '세션 :', userSession.sessionId);
            
            delete userSessions[socket.id];
        }
    });``
});