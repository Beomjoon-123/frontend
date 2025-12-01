import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // 백엔드 GET /usr/user/me API 호출 (로그인 사용자 정보 조회)
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                // 프록시 설정 덕분에 'http://localhost:8080' 생략
                const response = await fetch('/usr/user/me');
                const result = await response.json();

                if (result.resultCode === 'S-1') {
                    setUserInfo(result.data);
                } else if (result.resultCode === 'F-3') {
                    // 로그인이 필요한 경우
                    alert('마이페이지에 접근하려면 로그인해야 합니다.');
                    navigate('/login'); 
                } else {
                    setError(result.msg || '사용자 정보를 불러오는데 실패했습니다.');
                }
            } catch (err) {
                // 네트워크 오류 등
                setError('서버와 통신할 수 없습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [navigate]);

    // 로딩 및 오류 상태 표시
    if (loading) {
        return <div style={styles.container}>정보를 불러오는 중...</div>;
    }

    if (error) {
        return <div style={styles.container}><p style={{color: 'red'}}>{error}</p><a href="/login" style={styles.link}>로그인 페이지로</a></div>;
    }

    // 데이터 표시
    return (
        <div style={styles.container}>
            <h2><User size={28} style={styles.iconHeading} /> 마이페이지</h2>
            <div style={styles.userInfoBox}>
                <p style={styles.infoItem}>
                    <Shield size={20} color="#007bff" style={styles.infoIcon} />
                    <strong>아이디:</strong> {userInfo.loginId}
                </p>
                <p style={styles.infoItem}>
                    <User size={20} color="#007bff" style={styles.infoIcon} />
                    <strong>닉네임:</strong> {userInfo.nickname}
                </p>
                <p style={styles.infoItem}>
                    <Mail size={20} color="#007bff" style={styles.infoIcon} />
                    <strong>이메일:</strong> {userInfo.email}
                </p>
            </div>
            
            {/* 임시 로그아웃 버튼 (Spring Security의 Logout 경로 사용) */}
            <form method="POST" action="/usr/user/logout">
                <button type="submit" style={styles.logoutButton}>
                    <LogOut size={18} style={{marginRight: '5px'}} />
                    로그아웃
                </button>
            </form>

            <button style={styles.secondaryButton}>정보 수정</button>
            {/* TODO: 정보 수정 및 탈퇴 로직 추가 예정 */}
        </div>
    );
};

export default MyPage;

// 🚨 스타일 정의 객체
const styles = {
    container: {
        textAlign: 'center',
        padding: '40px',
        maxWidth: '500px',
        margin: '50px auto',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif'
    },
    iconHeading: {
        marginRight: '10px',
        verticalAlign: 'middle'
    },
    userInfoBox: {
        textAlign: 'left',
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '8px',
        marginBottom: '30px'
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
        marginBottom: '10px'
    },
    infoIcon: {
        marginRight: '10px'
    },
    logoutButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '10px'
    },
    secondaryButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#f8f9fa',
        color: '#007bff',
        border: '1px solid #007bff',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: 'bold'
    }
};