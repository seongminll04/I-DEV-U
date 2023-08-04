import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setLoginToken, setNickname } from '../../store/actions';

const KakaoCallback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchKakaoToken = async () => {
            const params = new URL(document.location.toString()).searchParams;
            const code = params.get('code');
            const grantType = "authorization_code";
            const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
            const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
            // const BACKEND_SERVER_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

            // function generateRandomString(length:number) {
            //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            //     let result = '';
            
            //     for (let i = 0; i < length; i++) {
            //         const randomIndex = Math.floor(Math.random() * characters.length);
            //         result += characters.charAt(randomIndex);
            //     }
            
            //     return result;
            // }
            
            // const randomString = generateRandomString(14);       

            try {
                const responseToken = await axios.post(
                    `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
                    {},
                    { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
                );

                const { access_token } = responseToken.data;

                const res = await axios.post(
                    `https://kapi.kakao.com/v2/user/me`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                        }
                    }
                );

                const nickname = res.data.properties.nickname;

                dispatch(setLoginToken(access_token))
                dispatch(setNickname(nickname))

                navigate('/home');
                
            } catch (error) {
                console.log(error);
            }
        };

        fetchKakaoToken();

    }, [navigate,dispatch]);

    return (
        <div></div>
    );
}

export default KakaoCallback;
