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

<<<<<<< HEAD
// Cors 지금은 전체인데 나중에 바꿔줘야함
app.use(
  cors({
    origin: "*",
  })
);



// express 로 HTTP 서버를 생성
var server = http.createServer(app);
=======
const privateKey = fs.readFileSync("privkey.pem", "utf8");
const certificate = fs.readFileSync("cert.pem", "utf8")
const ca = fs.readFileSync("fullchain.pem", "utf8")

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

// Cors 지금은 전체인데 나중에 바꿔줘야함
app.use(
  cors({
    // origin: "*",
        origin: "https://i9b206.p.ssafy.io",
  })
);


// express 로 HTTPS 서버를 생성
var server = https.createServer(credentials, app);

>>>>>>> 630feb622527dfd00bf57d30b618bcfb139ed9db
// openvidu 클라이언트 객체를 초기화
var openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
openvidu.activeSessions = [];
// socket.io 초기화
<<<<<<< HEAD
const io = socketIo(server, {
=======
var io = socketIo(server, {
>>>>>>> 630feb622527dfd00bf57d30b618bcfb139ed9db
    cors: {
      origin: "*",
    }
  });

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
  try {
      const session = await openvidu.createSession();
      res.send(session.sessionId);
  } catch (error) {
      res.status(500).send("Error creating session: " + error.message);
  }
});

// 지정된 세션 ID에 연결을 생성하는 API 엔드포인트를 정의
app.post("/api/sessions/:sessionId/connections", async (req, res) => {
  console.log("0번");
  console.log("Request params:", req.params);
  console.log("Request body:", req.body);

  const sessionId = req.params.sessionId;
  
  let session;
  try {
      session = await openvidu.createSession({ customSessionId: sessionId });
  } catch (error) {
      console.error("Error fetching the session:", error);
      res.status(500).send("Error fetching the session: " + error.message);
      return;
  }

  try {
      const token = await session.generateToken();
      console.log("Token created:", token);
      res.send(token);
  } catch (error) {
      console.error("Error creating token:", error);
      res.status(500).send("Error creating token: " + error.message);
  }
});



// 미처리된 예외를 처리
process.on('uncaughtException', err => console.error(err));

// 유저 세션 초기화
var userSessions = {};


// 여긴 p2p 시그널링서버 이벤트 핸들러

io.on('connection', function(socket) {
    socket.on('offer', function(data){
        const targetSocketId = Object.keys(userSessions).find(key => userSessions[key].userId === data.target);
        if (targetSocketId) {
            socket.to(targetSocketId).emit('offer', data);
        }
        console.log("22222222222222222222222222222222222")
        console.log(data.target,"offer")
    });

    socket.on('answer', function(data) {
        const targetSocketId = Object.keys(userSessions).find(key => userSessions[key].userId === data.target);
        if (targetSocketId) {
            socket.to(targetSocketId).emit('answer', data);
        }
        console.log("333333333333333333333333333333333333333");
        console.log(data.target,"answer")
    });

    socket.on('ice-candidate', function(data) {
        const targetSocketId = Object.keys(userSessions).find(key => userSessions[key].userId === data.target);
        if (targetSocketId) {
            socket.to(targetSocketId).emit('ice-candidate', data);
        }
        console.log("444444444444444444444444444444444444");
        console.log(data.target, "ice");
    });

    socket.on('join-session', function(data) {
        // 1. 현재 세션에 참여하고 있는 다른 사용자들의 ID를 가져옵니다.
        const otherUserIdsInSession = Object.values(userSessions)
        .filter(session => session.sessionId === data.sessionId && session.userId !== data.userId)
        .map(session => session.userId);

        // 2. 새로운 사용자에게 현재 세션에 참여하고 있는 다른 모든 사용자들의 ID를 전송합니다.
        socket.emit('current-users', { userIds: otherUserIdsInSession });

        // 3. 다른 사용자들에게 새로운 사용자가 참여했다는 것을 알립니다.
        socket.to(data.sessionId).emit('new-peer', { userId: data.userId });

        // 유저의 세션 정보를 저장
        userSessions[socket.id] = {
        userId: data.userId,
        sessionId: data.sessionId
        };

        console.log(userSessions[socket.id], "@@@@@@@@@@@@@@@@@@@@@@"); // 현재 소켓의 세션 정보 출력
        console.log(userSessions, "###### Entire userSessions object ######"); // 전체 userSessions 객체 출력

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
