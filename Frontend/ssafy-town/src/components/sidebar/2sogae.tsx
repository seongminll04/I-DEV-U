import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sogae_css from './2sogae.module.css';
import SecondQAModal from '../survey/secondQA';


type User = {
  name: string;
  matchRate: number;
};

const MAX_FILTERS = 4;
const ITEMS_PER_PAGE = 10;
const words = ["#가", "#나", "#다", "#라", "#마", "#바", "#사"];

const Sogae: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  // const [data, setData] = useState<any | null>(null); //실제 상태용 데이터의 상황에따라 변화
  const [data, setData] = useState<any>(true); //개발용 항상 ok인 상태
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
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  useEffect(() => {
    // 소개팅 등록이 되어있는 유저인가?
    axios.get("/date/survey/$user_idx").then(response => { //${user_idx} 로 jwt 토큰에서 뽑아오는거 나중에 jwt되면 구현
      setData(response.data);
    }).catch(error => {
      console.error("등록 확인 실패", error);
    });

    // 유저 100명의 목록 가져오기 , 나중에 백엔드가 완성되면 정렬도 없애고
    axios.get("/date/list/$user_idx").then(response => {
      const sortedUsers = response.data.sort((a: User, b: User) => b.matchRate - a.matchRate);
      setUsers(sortedUsers);
    }).catch(error => {
      console.error("리스트 불러오기 실패", error);
    });
  }, []);

  useEffect(() => {
    setTotalItems(users.length);
  }, [users]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    // 여기에 onConfirm 했을때의 로직
};

const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const wordValue = e.target.value;

  setSelectedWord(wordValue);

  // 필터 추가 및 제거 로직
  if (selectedFilters.includes(wordValue)) {
    // 단어가 이미 선택되어 있다면 필터에서 제거
    setSelectedFilters((prevFilters) => prevFilters.filter(filter => filter !== wordValue));
  } else if (selectedFilters.length < MAX_FILTERS) {
    // 최대 필터 수를 초과하지 않았다면 필터에 추가
    setSelectedFilters((prevFilters) => [...prevFilters, wordValue]);
  } else {
    // 최대 필터 수를 초과했을 때 경고 메시지 출력 
    alert(`최대 ${MAX_FILTERS}개의 필터까지만 선택 가능합니다.`);
  }
};

const handleFilterSearch = () => {
  // 필터된 요청을 서버에 보냅니다.
  axios.get(`/date/filteredList/$user_idx`, {
    params: {
      filters: selectedFilters // 필터 정보를 params로 보내고
    }
  })
  .then(response => {
    const sortedUsers = response.data.sort((a: User, b: User) => b.matchRate - a.matchRate);
    setUsers(sortedUsers);
  })
  .catch(error => {
    console.error("필터링 실패", error);
  });
};



  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return users.slice(startIndex, endIndex);
  };

  return (
    <div className='sidebar_modal'>
      <div>
      
          <h1>if(소개팅) {"{🤍=❤️}"}</h1>
      

        {!data ? (
          <>
            <button className={sogae_css.button} onClick={handleModalOpen}>등록하기</button>
            <div>
              <span className={sogae_css.redText}>소개팅 정보가 등록되어 있지 않습니다.</span><br/>
              <span className={sogae_css.redText}> 추가 사용을 원하시면 정보를 등록하셔야합니다.</span>
              <br/><br/>
            </div>
          </>
        ) : (
          <div><br/>
            <div>
              <label htmlFor="wordFilterSelect" className={sogae_css.selectfilter}>필터: </label>
              <select 
                id="wordFilterSelect" 
                value={selectedWord || ""}
                onChange={handleSelectChange}
                className={sogae_css.selectbox}
              >
                <option value="" disabled>선택하세요</option>
                {words.map(word => (
                  <option key={word} value={word}>{word}</option>
                ))}
              </select>
            </div><br/>
            <div className={sogae_css.selectfilter}>
              선택된 필터: {selectedFilters.join(', ')}
            </div>
            <button onClick={handleFilterSearch} className={sogae_css.button}>필터로 검색하기</button>
          </div>
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
        <SecondQAModal isOpen={isModalOpen} onClose={handleModalClose} onConfirm={handleConfirm} />
      </div>
    </div>
  );
};

export default Sogae;