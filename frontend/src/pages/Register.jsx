import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import { motion } from 'framer-motion';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await registerUser({ username, email, password });
            setMessage(res.data);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError('Registration failed! Try again.');
        }
        setLoading(false);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 50%, #667eea 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Arial, sans-serif',
            position: 'relative',
            overflow: 'hidden',
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
                        x: [0, 40, -40, 0],
                        y: [0, -40, 40, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 6 + i,
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
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    style={{
                        width: '70px',
                        height: '70px',
                        background: 'linear-gradient(135deg, #11998e, #38ef7d)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        fontSize: '32px',
                        boxShadow: '0 10px 30px rgba(17,153,142,0.4)',
                    }}
                >
                    📝
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
                    Create Account!
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ color: '#888', marginBottom: '32px', fontSize: '15px' }}
                >
                    Join Sentiment Dashboard today
                </motion.p>

                {message && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            background: '#f0fff4',
                            border: '1px solid #9ae6b4',
                            color: '#276749',
                            padding: '12px',
                            borderRadius: '10px',
                            marginBottom: '16px',
                            fontSize: '14px',
                        }}
                    >
                        ✅ {message} Redirecting...
                    </motion.div>
                )}

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

                <form onSubmit={handleRegister}>
                    {[
                        { placeholder: '👤 Username', value: username, setter: setUsername, type: 'text' },
                        { placeholder: '📧 Email', value: email, setter: setEmail, type: 'email' },
                        { placeholder: '🔒 Password', value: password, setter: setPassword, type: 'password' },
                    ].map((field, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
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
                                    background: '#f8f9ff',
                                }}
                                type={field.type}
                                placeholder={field.placeholder}
                                value={field.value}
                                onChange={(e) => field.setter(e.target.value)}
                                required
                            />
                        </motion.div>
                    ))}

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: loading
                                ? '#aaa'
                                : 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            boxShadow: '0 8px 25px rgba(17,153,142,0.4)',
                            letterSpacing: '0.5px',
                            marginTop: '8px',
                        }}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? '⏳ Creating...' : '✨ Create Account'}
                    </motion.button>
                </form>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    style={{ marginTop: '24px', color: '#888', fontSize: '14px' }}
                >
                    Already have an account?{' '}
                    <Link to="/login" style={{
                        color: '#11998e',
                        fontWeight: '600',
                        textDecoration: 'none',
                    }}>
                        Sign In →
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
}

export default Register;