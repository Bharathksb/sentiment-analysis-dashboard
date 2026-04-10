import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import { motion } from 'framer-motion';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await loginUser({ username, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid username or password!');
        }
        setLoading(false);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated background circles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                        width: `${150 + i * 80}px`,
                        height: `${150 + i * 80}px`,
                    }}
                    animate={{
                        x: [0, 30, -30, 0],
                        y: [0, -30, 30, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.5,
                    }}
                />
            ))}

            <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(20px)',
                    padding: '50px 40px',
                    borderRadius: '24px',
                    boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
                    width: '420px',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    style={{
                        width: '70px',
                        height: '70px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        fontSize: '32px',
                        boxShadow: '0 10px 30px rgba(102,126,234,0.4)',
                    }}
                >
                    📊
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        fontSize: '28px',
                        color: '#333',
                        marginBottom: '8px',
                        fontWeight: '700',
                    }}
                >
                    Welcome Back!
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ color: '#888', marginBottom: '32px', fontSize: '15px' }}
                >
                    Sign in to Sentiment Dashboard
                </motion.p>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                            background: '#fff0f0',
                            border: '1px solid #ffcccc',
                            color: '#e53e3e',
                            padding: '12px',
                            borderRadius: '10px',
                            marginBottom: '16px',
                            fontSize: '14px',
                        }}
                    >
                        ⚠️ {error}
                    </motion.div>
                )}

                <form onSubmit={handleLogin}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <input
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                marginBottom: '16px',
                                borderRadius: '12px',
                                border: '2px solid #e8e8e8',
                                fontSize: '15px',
                                boxSizing: 'border-box',
                                outline: 'none',
                                transition: 'border-color 0.3s',
                                background: '#f8f9ff',
                            }}
                            type="text"
                            placeholder="👤 Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <input
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                marginBottom: '24px',
                                borderRadius: '12px',
                                border: '2px solid #e8e8e8',
                                fontSize: '15px',
                                boxSizing: 'border-box',
                                outline: 'none',
                                background: '#f8f9ff',
                            }}
                            type="password"
                            placeholder="🔒 Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: loading
                                ? '#aaa'
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            boxShadow: '0 8px 25px rgba(102,126,234,0.4)',
                            letterSpacing: '0.5px',
                        }}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? '⏳ Signing in...' : '🚀 Sign In'}
                    </motion.button>
                </form>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    style={{ marginTop: '24px', color: '#888', fontSize: '14px' }}
                >
                    Don't have an account?{' '}
                    <Link to="/register" style={{
                        color: '#667eea',
                        fontWeight: '600',
                        textDecoration: 'none',
                    }}>
                        Create Account →
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
}

export default Login;