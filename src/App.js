import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import MyPage from './pages/MyPage';

function App() {
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태
  const [loadingUser, setLoadingUser] = useState(true);

  // 컴포넌트 마운트 시 한 번, 로그인 상태를 확인하는 API 호출 (GET /usr/user/me)
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/usr/user/me');
        const result = await response.json();
        
        if (result.resultCode === 'S-1') {
          // 로그인 성공: 사용자 정보를 저장합니다.
          setUserInfo(result.data);
        } else {
          // 로그인 실패 또는 세션 만료
          setUserInfo(null); 
        }
      } catch (e) {
        console.error("로그인 상태 확인 실패:", e);
        setUserInfo(null);
      } finally {
        setLoadingUser(false);
      }
    };
    
    checkLoginStatus();
  }, []);

  if (loadingUser) {
    // 초기 로딩 시 깜빡임 방지
    return <div style={{textAlign: 'center', marginTop: '50px'}}>로딩 중...</div>;
  }

  // Header 컴포넌트에 userInfo 상태를 전달합니다.
  return (
    <Router>
      <Header userInfo={userInfo} /> {/* 👈 모든 페이지 상단에 Header 렌더링 */}
      <div className="App" style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          {/* MyPage에도 userInfo를 전달하여 활용할 수 있도록 합니다. */}
          <Route path="/mypage" element={<MyPage userInfo={userInfo} />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

const styles = {
    mainContent: {
        paddingTop: '20px' // 헤더 아래에 내용이 위치하도록 간격 조정 (필요 시)
    }
};