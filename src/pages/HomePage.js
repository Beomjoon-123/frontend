import React from 'react';
import { LogIn, UserPlus, User, Zap } from 'lucide-react'; // 필요한 아이콘 임포트

const HomePage = () => {
    return (
        <div style={styles.container}>
            <h1><Zap size={36} color="#007bff" /> Truthify - 광고 분석 서비스</h1>
            <p style={styles.subtitle}>인공지능 기반으로 광고 문구의 리스크를 분석하고 피드백을 받아보세요.</p>
            
            <div style={styles.navBar}>
                <NavItem icon={LogIn} text="로그인" to="/login" />
                <NavItem icon={UserPlus} text="회원가입" to="/join" />
                <NavItem icon={User} text="마이페이지" to="/mypage" />
            </div>
            
            {/* 분석 기능으로 바로 가기 버튼 (로그인 후 사용 가정) */}
            <button style={styles.mainButton}>
                <Zap size={20} style={{ marginRight: '8px' }} />
                광고 문구 분석 시작
            </button>
        </div>
    );
};

// 아이콘과 텍스트를 함께 보여주는 컴포넌트
const NavItem = ({ icon: Icon, text, to }) => (
    <a href={to} style={styles.navItem}>
        <Icon size={20} color="#333" />
        <span style={styles.navText}>{text}</span>
    </a>
);

// 간단한 스타일 정의 (인라인 스타일)
const styles = {
    container: {
        textAlign: 'center',
        padding: '40px',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
    },
    subtitle: {
        color: '#666',
        marginBottom: '30px'
    },
    navBar: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '40px',
        padding: '10px 0',
        borderBottom: '1px solid #eee'
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: '#333',
        fontWeight: 'bold'
    },
    navText: {
        marginLeft: '5px'
    },
    mainButton: {
        padding: '12px 25px',
        fontSize: '18px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto'
    }
};

export default HomePage;