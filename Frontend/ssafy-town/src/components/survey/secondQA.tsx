import React, { useState } from 'react';
import qa_css from './secondQA.module.css';

interface QAModalProps {
    onClose: () => void;
    onConfirm: (surveyResults: any) => void;
}

const QAModal: React.FC<QAModalProps> = ({ onClose, onConfirm }) => {
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지 관리
    const [desiredAgeRange, setDesiredAgeRange] = useState<string>("");
    const [desiredFaceShape, setDesiredFaceShape] = useState<string>("");
    const [myFaceShape, setMyFaceShape] = useState<string>("");
    const [desiredLocation, setDesiredLocation] = useState<string>("");
    const [myPay, setMyPay] = useState<string>("");
    // 여기까지 1페이지 질문
    const [desiredWorkType, setDesiredWorkType] = useState<string>("");
    const [colorPreference, setColorPreference] = useState<string>("");
    const [musicWhileCoding, setMusicWhileCoding] = useState<string>("");
    const [smartphonePreference, setSmartphonePreference] = useState<string>("");
    const [devClothingPreference, setDevClothingPreference] = useState<string>("");
    const [workLifeBalance, setWorkLifeBalance] = useState<string>("");
    const [exerciseHabit, setExerciseHabit] = useState<string>("");
    const [hobby, setHobby] = useState<string>("");
    const [namePreference, setNamePreference] = useState<string>("");
    const [petPreference, setPetPreference] = useState<string>("");
    // 여기까지 2페이지 질문

    const ageOptions = ["나이 동일", "나의 나이 ± 2", "나의 나이 ± 4", "나의 나이 ± 6", "나의 나이 ± 8"];
    const locationOptions = ["서울", "경기", "부산", "인천", "세종", "대전", "광주", "대구", "울산", "충남", "충북", "전남", "전북", "경남", "경북", "강원", "제주", "해외", "상관없음"];
    const faceShapeOptions = ["강아지", "고양이", "토끼", "말", "꼬부기", "사막여우", "늑대", "없다"];
    const payOptions = ["100억 미만", "100억 이상"];
    const myFaceShapeOptions = ["강아지", "고양이", "토끼", "말", "꼬부기", "사막여우", "늑대", "없다"];
    // 여기까지 1페이지 답변
    const workTypeOptions = ["출근", "재택", "상관없다"];
    const colorOptions = ["다크모드", "라이트모드"];
    const musicOptions = ["듣는다", "안 듣는다"];
    const smartphoneOptions = ["갤럭시", "아이폰"];
    const clothingOptions = ["후드", "체크남방"];
    const balanceOptions = ["💰💰💰⏰", "💰⏰⏰⏰", "💰💰⏰⏰"];
    const exerciseOptions = ["있다", "있다(숨쉬기 운동)"];
    const hobbyOptions = ["있다", "없다"];
    const nameOptions = ["마음에 든다", "마음에 안든다"];
    const petOptions = ["강아지", "고양이", "그 외", "키우기 싫어요"];
    // 여기까지 2페이지 답변

    const onCloseHandler = () => {
        setCurrentPage(1);
        onClose();
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const surveyResults = {
            desiredAgeRange,
            desiredFaceShape,
            desiredLocation,
            myPay,
            myFaceShape,
            desiredWorkType,
            colorPreference,
            musicWhileCoding,
            smartphonePreference,
            devClothingPreference,
            workLifeBalance,
            exerciseHabit,
            hobby,
            namePreference,
            petPreference

        };
        onConfirm(surveyResults);
    };


    let surveyForm;
    if (currentPage === 1) {
        surveyForm = (
            <form onSubmit={() => setCurrentPage(2)}>
                <div>
                    <p>😎 나의 얼굴상은?</p>
                    {myFaceShapeOptions.map(option => (
                        <label key={option}>
                            <input type="radio" name="myFaceShape" value={option} onChange={() => setMyFaceShape(option)} />
                            {option}
                        </label>
                    ))}
                </div>

                <div>
                    <p>💸 나의 연봉은?</p>
                    {payOptions.map(option => (
                        <label key={option}>
                            <input type="radio" name="myPay" value={option} onChange={() => setMyPay(option)} />
                            {option}
                        </label>
                    ))}
                </div>

                <div>
                    <p>🔢 원하는 상대의 연령대</p>
                    {ageOptions.map(option => (
                        <label key={option}>
                            <input 
                            type="checkbox" 
                            name="desiredAgeRange" 
                            value={option} 
                            onChange={() => setDesiredAgeRange(option)} 
                            checked={desiredAgeRange.includes(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>

                <div>
                    <p>🗺️ 원하는 상대의 지역</p>
                    <select name="desiredLocation" onChange={(e) => setDesiredLocation(e.target.value)}>
                        {locationOptions.map(option => (
                            <option key={option} value={option}>
                            {option}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <p>😄 원하는 상대의 얼굴상</p>
                    {faceShapeOptions.map(option => (
                        <label key={option}>
                            <input type="radio" name="desiredFaceShape" value={option} onChange={() => setDesiredFaceShape(option)} />
                            {option}
                        </label>
                    ))}
                </div>
                <br />
                <button type="button" onClick={() => setCurrentPage(2)}>다음 페이지</button>
            </form>
        );
    } else {
        surveyForm = (
            <form onSubmit={handleSubmit}>
            <div>
                <p>💼 원하는 근무형태는 ?</p>
                {workTypeOptions.map(option => (
                    <label key={option}>
                        <input type="radio" name="desiredWorkType" value={option} onChange={() => setDesiredWorkType(option)} />
                        {option}
                    </label>
                ))}
            </div>

            <div>
                <p>🔄 둘 중 하나를 고른다면?</p>
                {colorOptions.map(option => (
                    <label key={option}>
                        <input type="radio" name="colorPreference" value={option} onChange={() => setColorPreference(option)} />
                        {option}
                    </label>
                ))}
            </div>

            <div>
                <p>🎧 나는 개발할때 노래를?</p>
                {musicOptions.map(option => (
                    <label key={option}>
                        <input type="radio" name="musicWhileCoding" value={option} onChange={() => setMusicWhileCoding(option)} />
                        {option}
                    </label>
                ))}
            </div>

            <div>
                <p>📱 사용중인 스마트폰</p>
                {smartphoneOptions.map(option => (
                    <label key={option}>
                        <input type="radio" name="smartphonePreference" value={option} onChange={() => setSmartphonePreference(option)} />
                        {option}
                    </label>
                ))}
            </div>

            <div>
                <p>👕 개발자의 옷은?</p>
                {clothingOptions.map(option => (
                    <label key={option}>
                        <input type="radio" name="devClothingPreference" value={option} onChange={() => setDevClothingPreference(option)} />
                        {option}
                    </label>
                ))}
            </div>

            <div>
                <p>⚖️ 워라밸과 월급 어떤것을 더 선호?</p>
                {balanceOptions.map(option => (
                    <label key={option}>
                        <input type="radio" name="workLifeBalance" value={option} onChange={() => setWorkLifeBalance(option)} />
                        {option}
                    </label>
                ))}
            </div>

            <div>
                <p>🚶 평소 하는 운동이?</p>
                {exerciseOptions.map(option => (
                    <label key={option}>
                        <input type="radio" name="exerciseHabit" value={option} onChange={() => setExerciseHabit(option)} />
                        {option}
                    </label>
                ))}
            </div>

            <div>
                <p>📚 즐겨하는 취미가?</p>
                {hobbyOptions.map(option => (
                    <label key={option}>
                        <input type="radio" name="hobby" value={option} onChange={() => setHobby(option)} />
                        {option}
                    </label>
                ))}
            </div>

            <div>
                <p>✍️ 나의 이름이?</p>
                {nameOptions.map(option => (
                    <label key={option}>
                        <input type="radio" name="namePreference" value={option} onChange={() => setNamePreference(option)} />
                        {option}
                    </label>
                ))}
            </div>

            <div>
                <p>🐰 애완동물을 가진다면?</p>
                {petOptions.map(option => (
                    <label key={option}>
                        <input type="radio" name="petPreference" value={option} onChange={() => setPetPreference(option)} />
                        {option}
                    </label>
                ))}
            </div>
                <input type="submit" value="제출하기" />
            </form>
        );
    }

    return (
        <div className={qa_css.modal_overlay}>
            <div className={qa_css.qa_modal}>
            <button onClick={onCloseHandler}>
                나중에 하기 (작성중인 설문이 초기화됩니다)</button>
                <h1>I DEV U</h1>
                <h2>📝 소개팅 설문조사</h2>
                <h3>* 질문의 답변들이 이용할 정보가 됩니다. *</h3>
                {surveyForm}
            </div>
        </div>
    );
};

export default QAModal;
