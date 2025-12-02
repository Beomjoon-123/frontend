import React, { useState } from 'react';
// 💡 필요한 경우 여기에 추가 import를 작성합니다.

// 💡 모달 컴포넌트 정의
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <p style={{fontSize: '16px', fontWeight: '500', marginBottom: '20px'}}>{children}</p>
                <button onClick={onClose} style={styles.modalButton}>확인</button>
            </div>
        </div>
    );
};


const LoginPage = () => {
    // 💡 ID/PW 상태
    const [loginId, setLoginId] = useState('');
    const [loginPw, setLoginPw] = useState('');
    
    // 💡 모달 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(''); 

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    };

    // 기존의 handleLogin 대신 Email/PW 로그인 처리 함수 정의
    const handleEmailLogin = (e) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지
        
        if (loginId.trim() === '' || loginPw.trim() === '') {
            openModal('아이디와 비밀번호를 입력해주세요.');
            return;
        }

        openModal('로컬 로그인 기능 구현 필요: Spring Security Form Login 또는 API 연동');
        
        // 🚨 (TO-DO: 실제 API 연동 로직 추가)
        // 실제 연동 시, API 호출 후 성공/실패에 따라 openModal('로그인 성공!') 또는 openModal('로그인 실패: 오류 메시지') 호출
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>로그인</h2>
                
                {/* 1. Email/Password Login Form */}
                <form onSubmit={handleEmailLogin} style={styles.form}>
                    <input
                        type="text"
                        placeholder="아이디 또는 이메일"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={loginPw}
                        onChange={(e) => setLoginPw(e.target.value)}
                        style={{...styles.input, marginBottom: '20px'}}
                    />
                    <button type="submit" style={styles.submitButton}>
                        로그인
                    </button>
                </form>
                
                <div style={styles.divider}>
                    <span style={styles.dividerText}>또는</span>
                </div>
                
                {/* 2. Social Login Buttons */}
                <div style={styles.socialLoginContainer}>
                    {/* Google 로그인 버튼 (Spring Security 기본 URL) */}
                    <a href="/oauth2/authorization/google" style={{...styles.socialButton, ...styles.googleButton}}>
                        <svg aria-label="Google logo" width="16" height="16" style={styles.icon} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Google 로그인
                    </a>

                    {/* Kakao 로그인 버튼 (Spring Security 기본 URL) */}
                    <a href="/oauth2/authorization/kakao" style={{...styles.socialButton, ...styles.kakaoButton}}>
                        <svg aria-label="Kakao logo" width="16" height="16" style={styles.icon} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="#181600" d="M255.5 48C299.345 48 339.897 56.5332 377.156 73.5996C414.415 90.666 443.871 113.873 465.522 143.22C487.174 172.566 498 204.577 498 239.252C498 273.926 487.174 305.982 465.522 335.42C443.871 364.857 414.46 388.109 377.291 405.175C340.122 422.241 299.525 430.775 255.5 430.775C241.607 430.775 227.262 429.781 212.467 427.795C148.233 472.402 114.042 494.977 109.892 495.518C107.907 496.241 106.012 496.15 104.208 495.248C103.486 494.706 102.945 493.983 102.584 493.08C102.223 492.177 102.043 491.365 102.043 490.642V489.559C103.126 482.515 111.335 453.169 126.672 401.518C91.8486 384.181 64.1974 361.2 43.7185 332.575C23.2395 303.951 13 272.843 13 239.252C13 204.577 23.8259 172.566 45.4777 143.22C67.1295 113.873 96.5849 90.666 133.844 73.5996C171.103 56.5332 211.655 48 255.5 48Z"></path></svg>
                        카카오 로그인
                    </a>
                </div>

                {/* 회원가입/비밀번호 찾기 링크 */}
                <div style={styles.linkContainer}>
                    <a href="/signup" style={styles.link}>회원가입</a> 
                    <span style={{color: '#ccc'}}>|</span>
                    <a href="/find-password" style={styles.link}>비밀번호 찾기</a>
                </div>
            </div>

            {/* 💡 모달 컴포넌트 렌더링 */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </Modal>
        </div>
    );
};

// 💡 스타일 업데이트 및 추가
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f8f8',
        padding: '20px',
        fontFamily: 'Inter, sans-serif',
    },
    card: {
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        marginBottom: '30px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginBottom: '20px',
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        fontSize: '16px',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
    },
    submitButton: {
        backgroundColor: '#1890ff',
        color: '#ffffff',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    divider: {
        position: 'relative',
        margin: '30px 0',
        height: '1px',
        backgroundColor: '#e0e0e0',
    },
    dividerText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ffffff',
        padding: '0 10px',
        color: '#a0a0a0',
        fontSize: '14px',
    },
    socialLoginContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '30px',
    },
    socialButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        textDecoration: 'none',
        border: '1px solid',
        cursor: 'pointer',
        transition: 'background-color 0.2s, border-color 0.2s'
    },
    googleButton: {
        backgroundColor: '#ffffff',
        color: '#000000',
        borderColor: '#e5e5e5',
    },
    kakaoButton: {
        backgroundColor: '#FEE502',
        color: '#181600',
        borderColor: '#f1d800',
    },
    icon: {
        marginRight: '8px',
    },
    linkContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        fontSize: '14px',
    },
    link: {
        color: '#1890ff',
        textDecoration: 'none',
        transition: 'color 0.2s',
    },
    // 💡 Modal Styles
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '12px',
        maxWidth: '350px',
        width: '90%',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#1890ff',
        color: '#ffffff',
        padding: '10px 20px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background-color 0.2s',
    }
};

export default LoginPage;