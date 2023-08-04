import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setLoginToken, setNickname } from '../../store/actions';


const KakaoCallback = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchKakaoToken = async () => {
            const params = new URL(document.location.toString()).searchParams;
            const code = params.get('code');
            const grantType = "authorization_code";
            const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
            const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

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

                console.log('User Info:', res.data);
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
