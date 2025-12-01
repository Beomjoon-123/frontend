import React from 'react';
import { User, Lock, LogIn } from 'lucide-react';

const LoginPage = () => {
    return (
        <div style={styles.container}>
            <h2><LogIn size={28} style={styles.iconHeading} /> 로그인</h2>
            <form method="POST" action="/usr/user/login" style={styles.form}> 
                <div style={styles.inputGroup}>
                    <User size={20} color="#666" style={styles.inputIcon} />
                    <input 
                        type="text" 
                        id="loginId" 
                        name="username" 
                        placeholder="아이디"
                        style={styles.inputField} 
                        required 
                    /> 
                </div>
                <div style={styles.inputGroup}>
                    <Lock size={20} color="#666" style={styles.inputIcon} />
                    <input 
                        type="password" 
                        id="loginPw" 
                        name="password" 
                        placeholder="비밀번호"
                        style={styles.inputField} 
                        required 
                    /> 
                </div>
                <button type="submit" style={styles.buttonPrimary}>
                    로그인 하기
                </button>
            </form>
            <p style={styles.linkText}>계정이 없으신가요? <a href="/join" style={styles.link}>회원가입</a></p>
        </div>
    );
};

export default LoginPage;

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
};