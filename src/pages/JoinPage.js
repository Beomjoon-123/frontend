import React, { useState } from 'react';
import { User, Lock, Mail, BadgeCheck, CheckCircle, UserPlus } from 'lucide-react';

const JoinPage = () => {
    const [loginId, setLoginId] = useState('');
    const [loginPw, setLoginPw] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    
    const [dupChkMsg, setDupChkMsg] = useState('');
    const [isIdAvailable, setIsIdAvailable] = useState(false);

    // 백엔드 GET /usr/user/loginIdDupChk 연동 함수
    const handleIdCheck = async () => {
        if (!loginId) {
            setDupChkMsg('아이디를 입력해주세요.');
            return;
        }

        // 🚨 프록시 설정 덕분에 'http://localhost:8080'를 생략할 수 있습니다.
        const response = await fetch(`/usr/user/loginIdDupChk?loginId=${loginId}`);
        const result = await response.json();

        if (result.resultCode === 'S-1') {
            setDupChkMsg(result.msg);
            setIsIdAvailable(true);
        } else {
            setDupChkMsg(result.msg);
            setIsIdAvailable(false);
        }
    };

    // 백엔드 POST /usr/user/join 연동 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isIdAvailable) {
            alert('아이디 중복 확인을 먼저 해주세요.');
            return;
        }

        const response = await fetch('/usr/user/join', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ loginId, loginPw, email, nickname }),
        });
        const result = await response.json();
        
        if (result.resultCode === 'S-1') {
            alert(result.msg);
            window.location.href = '/login'; // 성공 시 로그인 페이지로 이동
        } else {
            alert(`가입 실패: ${result.msg}`);
        }
    };

    return (
        <div style={styles.container}>
            <h2><UserPlus size={28} style={styles.iconHeading} /> 회원가입</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                
                {/* 1. 아이디 및 중복 확인 */}
                <div style={styles.inputGroup}>
                    <User size={20} color="#666" style={styles.inputIcon} />
                    <input 
                        type="text" 
                        placeholder="아이디"
                        style={styles.inputField} 
                        value={loginId}
                        onChange={(e) => {
                            setLoginId(e.target.value);
                            setIsIdAvailable(false); 
                            setDupChkMsg('');
                        }}
                        required 
                    />
                    <button 
                        type="button" 
                        onClick={handleIdCheck} 
                        style={styles.buttonSecondary}
                        disabled={isIdAvailable} // 중복 확인 완료 시 버튼 비활성화
                    >
                        {isIdAvailable ? <CheckCircle size={16} color="green" /> : "중복 확인"}
                    </button>
                </div>
                <p style={{ ...styles.message, color: isIdAvailable ? 'green' : 'red' }}>{dupChkMsg}</p>

                {/* 2. 비밀번호 */}
                <div style={styles.inputGroup}>
                    <Lock size={20} color="#666" style={styles.inputIcon} />
                    <input 
                        type="password" 
                        placeholder="비밀번호" 
                        value={loginPw} 
                        onChange={(e) => setLoginPw(e.target.value)} 
                        style={styles.inputField} 
                        required 
                    />
                </div>
                
                {/* 3. 닉네임 */}
                <div style={styles.inputGroup}>
                    <BadgeCheck size={20} color="#666" style={styles.inputIcon} />
                    <input 
                        type="text" 
                        placeholder="닉네임" 
                        value={nickname} 
                        onChange={(e) => setNickname(e.target.value)} 
                        style={styles.inputField} 
                        required 
                    />
                </div>

                {/* 4. 이메일 */}
                <div style={styles.inputGroup}>
                    <Mail size={20} color="#666" style={styles.inputIcon} />
                    <input 
                        type="email" 
                        placeholder="이메일" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        style={styles.inputField} 
                        required 
                    />
                </div>

                <button 
                    type="submit" 
                    style={styles.buttonPrimary} 
                    disabled={!isIdAvailable || !loginPw || !nickname || !email} // 필수 필드 및 중복 확인 체크
                >
                    가입하기
                </button>
            </form>
        </div>
    );
};

export default JoinPage;

// 🚨 누락되었던 스타일 정의 객체를 여기에 추가합니다.
const styles = {
    container: {
        textAlign: 'center',
        padding: '40px',
        maxWidth: '400px',
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
    form: {
        marginTop: '20px'
    },
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '5px 10px',
        backgroundColor: '#fff'
    },
    inputIcon: {
        marginRight: '10px'
    },
    inputField: {
        flexGrow: 1,
        padding: '8px 0',
        border: 'none',
        outline: 'none',
        fontSize: '16px'
    },
    buttonPrimary: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px'
    },
    buttonSecondary: {
        padding: '8px 15px',
        fontSize: '14px',
        backgroundColor: '#f8f9fa',
        color: '#007bff',
        border: '1px solid #007bff',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    linkText: {
        marginTop: '20px',
        fontSize: '14px',
        color: '#666'
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: 'bold'
    },
    message: {
        textAlign: 'left',
        marginTop: '-10px',
        marginBottom: '15px',
        fontSize: '12px',
        paddingLeft: '35px'
    }
};