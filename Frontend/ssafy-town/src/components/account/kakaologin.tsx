import { useEffect } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
    const navigate = useNavigate(); // React Router의 useNavigate 훅을 사용하여 페이지 이동 기능 추가

    useEffect(() => {
        const params= new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        const grantType = "authorization_code";
        const REST_API_KEY = `${process.env.REACT_APP_REST_API_KEY}`;
        const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;

        axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
            {},
            { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
        )
        .then((res: any) => {
            console.log(res);
            const { access_token } = res.data;
            axios.post(
                `https://kapi.kakao.com/v2/user/me`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    }
                }
            )
            .then((res: any) => {
                console.log('2번쨰', res);
                localStorage.setItem('usertoken', res.data.access_token);
                navigate('/home'); // 로그인 성공 후 /home으로 이동
            })
        })
        .catch((Error: any) => {
            console.log(Error)
        })
    }, [navigate]) // useEffect의 종속성 배열에 navigate를 추가
    
    return (
        <div>
        </div>
    )
}

export default KakaoCallback;
