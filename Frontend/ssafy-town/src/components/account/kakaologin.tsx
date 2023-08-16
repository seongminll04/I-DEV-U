import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
    const navigate = useNavigate();
    const [kakaotoken, setKakaotoken] = useState('')
    const [nickname, setNickname] = useState('')

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
                setNickname('kakao_'+res.data.id)
                setKakaotoken(access_token)
            } catch (error) {

            }
        };

        fetchKakaoToken();

    }, [navigate]);

    useEffect(() => {
        if (kakaotoken && nickname) {

            axios({
                method:'get',
                url:`https://i9b206.p.ssafy.io:9090/user/signUp/emailCheck/${nickname}`,
            })
            .then(res => {
                if (res.data.status.statusCodeValue===200) {
                    navigate('/kakaosignup',{
                        state:{
                            nickname:nickname,
                        }
                    });
                }
                else{
                    axios({
                        method:'post',
                        url:'https://i9b206.p.ssafy.io:9090/user/kakaologin',
                        data:{'email': nickname}
                    })
                    .then(res => {
                        // 로그인 시, 로컬 스토리지에 토큰 저장
                        localStorage.setItem('userToken',res.headers.authorization);
                        localStorage.setItem('userIdx', res.data.userIdx);
                        // if (res.data.user.status === "D") {
                        //   throw new ValidationError("탈퇴처리된 회원입니다!");
                        // } 
                        navigate('/home')
                    })
                    .catch(() => {
                        alert('카카오 로그인 실패')
                        navigate('/login')
                    })
                }
            })
        }
    }, [kakaotoken, nickname, navigate]);
    
    return (
        <div></div>
    );
}

export default KakaoCallback;
