import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, User, LogOut } from 'lucide-react'; 
// 🚨 이미지 로고를 임포트합니다. 경로와 파일명을 확인하세요.
import TruthifyLogo from '../assets/truthify-logo.png'; 

const Header = ({ userInfo }) => {
    // 임시 로그인 상태 확인 로직 (App.js에서 전달받음)
    const isAuthenticated = userInfo && userInfo.loginId;

    return (
        <header style={styles.header}>
            {/* 왼쪽: 로고 및 홈 링크 */}
            <div style={styles.logo}>
                <Link to="/" style={styles.link}>
                    {/* 🚨 로고 이미지 사용 */}
                    <img className="truthify_logo" src={TruthifyLogo} alt="Truthify Logo" style={styles.logoImage} />
                </Link>
            </div>

            {/* 오른쪽: 네비게이션 링크 */}
            <nav style={styles.nav}>
                {isAuthenticated ? (
                    // 로그인 상태일 때
                    <>
                        <NavLink to="/mypage" icon={User} text="마이페이지" />
                        {/* 로그아웃은 POST 요청을 보내야 하므로 폼 사용 */}
                        <form method="POST" action="/usr/user/logout" style={{margin: 0}}>
                            <button type="submit" style={styles.logoutButton}>
                                <LogOut size={16} style={{marginRight: '4px'}} />
                                로그아웃
                            </button>
                        </form>
                    </>
                ) : (
                    // 로그아웃 상태일 때
                    <>
                        <NavLink to="/login" icon={LogIn} text="로그인" />
                        <NavLink to="/join" icon={UserPlus} text="회원가입" />
                    </>
                )}
            </nav>
        </header>
    );
};

// 네비게이션 링크 보조 컴포넌트
const NavLink = ({ to, icon: Icon, text }) => (
    <Link to={to} style={styles.navLink}>
        <Icon size={16} style={{marginRight: '4px'}} />
        {text}
    </Link>
);

export default Header;

// 인라인 스타일 정의
const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 40px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #eee',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },

    logo: {
        fontSize: '20px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center'
    },
    logoImage: {
        height: '100px',
        weight: 'auto'
        , verticalAlign: 'middle'
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    link: {
        textDecoration: 'none',
        color: '#333',
        display: 'flex',
        alignItems: 'center',
    },
    navLink: {
        textDecoration: 'none',
        color: '#666',
        fontSize: '15px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        transition: 'color 0.2s',
    },
    logoutButton: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#dc3545',
        fontSize: '15px',
        fontWeight: '500',
        cursor: 'pointer',
        padding: 0,
    }
};