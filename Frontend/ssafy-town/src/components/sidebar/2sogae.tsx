import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sogae_css from './2sogae.module.css';

type User = {
  name: string;
  matchRate: number;
};

const ITEMS_PER_PAGE = 10;

const Sogae: React.FC = () => {
  const [data, setData] = useState<any | null>(null);
  const [users, setUsers] = useState<User[]>([
    { name: "홍길동1", matchRate: 95 },
    { name: "홍길동2", matchRate: 90 },
    { name: "홍길동3", matchRate: 87 },
    { name: "홍길동4", matchRate: 89 },
    { name: "홍길동5", matchRate: 91 },
    { name: "홍길동6", matchRate: 85 },
    { name: "홍길동7", matchRate: 88 },
    { name: "홍길동8", matchRate: 92 },
    { name: "홍길동9", matchRate: 90 },
    { name: "홍길동10", matchRate: 94 },
    { name: "홍길동11", matchRate: 93 }
  ].sort((a, b) => b.matchRate - a.matchRate));
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(users.length);

  useEffect(() => {
    // 소개팅 등록이 되어있는 유저인가?
    axios.get("/date/detail/$user_idx").then(response => { //${user_idx} 로 jwt 토큰에서 뽑아오는거 나중에 jwt되면 구현
      setData(response.data);
    }).catch(error => {
      console.error("등록 확인 실패", error);
    });

    // 유저 100명의 목록 가져오기
    axios.get("/date/list").then(response => {
      const sortedUsers = response.data.sort((a: User, b: User) => b.matchRate - a.matchRate);
      setUsers(sortedUsers);
    }).catch(error => {
      console.error("리스트 불러오기 실패", error);
    });
  }, []);

  useEffect(() => {
    setTotalItems(users.length);
  }, [users]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return users.slice(startIndex, endIndex);
  };

  return (
    <div className={sogae_css.mypage_modal}>
      <div className={sogae_css.mypage_welcome}>
        <div>
          <h1>if(소개팅) {"{🤍=❤️}"}</h1>
        </div>

        {!data && (
          <>
            <button className={sogae_css.button}>등록하기</button>
            <div>
              <span className={sogae_css.redText}>소개팅 정보가 등록되어 있지 않습니다.</span><br/>
              <span className={sogae_css.redText}> 추가 사용을 원하시면 정보를 등록하셔야합니다.</span>
              <br/><br/>
            </div>
          </>
        )}

        {users.length > 0 && (
          <table className={sogae_css.table}>
            <thead>
              <tr>
                <th className={sogae_css.userInfo}>유저 정보</th>
                <th className={sogae_css.matchRate}>일치율</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData().map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.matchRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        <div className={sogae_css.pagination}>
          {Array.from({ length: Math.ceil(totalItems / ITEMS_PER_PAGE) }, (_, i) => i).map((num) => (
            <button
              key={num}
              className={num + 1 === currentPage ? `${sogae_css.currentPage}` : ''}
              onClick={() => handlePageChange(num + 1)}
            >
              {num + 1}
            </button>
          ))}
        </div>
        <button className={sogae_css.button}>매칭</button>
      </div>
    </div>
  );
};

export default Sogae;
