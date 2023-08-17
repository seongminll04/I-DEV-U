// import express from 'express';
// import axios from 'axios';

// const app = express();
// const SERVER_URL = 'https://i9b206.p.ssafy.io:3000';
// const OPENVIDU_URL = 'https://i9b206.p.ssafy.io:4443';  // 실제 OpenVidu 서버의 URL로 수정해주세요.
// const OPENVIDU_SECRET = 'qkrgowhdB206';      // OpenVidu 서버의 Secret으로 수정해주세요.

// app.get('/create-session', async (req: express.Request, res: express.Response) => {
//     const response = await createSession();
//     res.send(response.data);
// });

// async function createSession() {
//     try {
//         const response = await axios.post(
//             `${OPENVIDU_URL}/api/sessions`,
//             {},
//             {
//                 headers: {
//                     Authorization: 'Basic ' + Buffer.from('OPENVIDUAPP:' + OPENVIDU_SECRET).toString('base64'),
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         return response.data;
//     } catch (error) {
//         console.error('Error creating session:', error);
//         throw error;
//     }
// }

// app.get('/generate-token/:sessionId', async (req, res) => {
//     const sessionId = req.params.sessionId;
//     try {
//         const tokenData = await generateToken(sessionId);
//         res.send(tokenData);
//     } catch (error) {
//         console.error('Error generating token:', error);
//         res.status(500).send({ error: 'Token generation failed' });
//     }
// });

// async function generateToken(sessionId: string) {
//     try {
//         const response = await axios.post(
//             `${OPENVIDU_URL}/api/tokens`,
//             { session: sessionId },
//             {
//                 headers: {
//                     Authorization: 'Basic ' + Buffer.from('OPENVIDUAPP:' + OPENVIDU_SECRET).toString('base64'),
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         return response.data;
//     } catch (error) {
//         console.error('Error generating token:', error);
//         throw error;
//     }
// }


// app.listen(3000, () => {
//     console.log(`Server started on ${SERVER_URL}`);
// });

// export {};