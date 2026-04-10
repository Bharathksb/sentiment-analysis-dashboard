import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeSentiment, getHistory, getStats ,deleteHistory } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#00C49F', '#FF4444', '#FFBB28'];

function Dashboard() {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    

    useEffect(() => {
        fetchHistory();
        fetchStats();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await getHistory();
            setHistory(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await getStats();
            setStats(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAnalyze = async () => {
        if (!text.trim()) return;
        setLoading(true);
        try {
            const res = await analyzeSentiment({ text });
            setResult(res.data);
            fetchHistory();
            fetchStats();
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

const handleDelete = async (id) => {
    try {
        await deleteHistory(id);
        fetchHistory();
        fetchStats();
    } catch (err) {
        console.error(err);
    }
};



    const getSentimentColor = (sentiment) => {
        if (sentiment === 'POSITIVE') return '#00C49F';
        if (sentiment === 'NEGATIVE') return '#FF4444';
        return '#FFBB28';
    };

    const getSentimentEmoji = (sentiment) => {
        if (sentiment === 'POSITIVE') return '😊';
        if (sentiment === 'NEGATIVE') return '😞';
        return '😐';
    };

    const getSentimentBg = (sentiment) => {
        if (sentiment === 'POSITIVE') return 'linear-gradient(135deg, #00C49F, #00a884)';
        if (sentiment === 'NEGATIVE') return 'linear-gradient(135deg, #FF4444, #cc0000)';
        return 'linear-gradient(135deg, #FFBB28, #ff9900)';
    };

    const pieData = [
        { name: 'Positive', value: stats.POSITIVE || 0 },
        { name: 'Negative', value: stats.NEGATIVE || 0 },
        { name: 'Neutral', value: stats.NEUTRAL || 0 },
    ];

    const totalAnalyses = (stats.POSITIVE || 0) + (stats.NEGATIVE || 0) + (stats.NEUTRAL || 0);

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f0f2f5',
            fontFamily: 'Arial, sans-serif',
        }}>
            {/* Header */}
            <motion.div
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '16px 32px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'white',
                    boxShadow: '0 4px 20px rgba(102,126,234,0.4)',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '28px' }}>📊</span>
                    <div>
                        <h1 style={{
                            margin: 0,
                            fontSize: '22px',
                            fontWeight: '700',
                            color: 'white',
                        }}>
                            Sentiment Analysis Dashboard
                        </h1>
                        <p style={{
                            margin: 0,
                            fontSize: '13px',
                            opacity: 0.8,
                            color: 'white',
                        }}>
                            Total Analyses: {totalAnalyses}
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.2)',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '14px',
                    }}>
                        👋 {username}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                        style={{
                            padding: '8px 20px',
                            background: 'rgba(255,255,255,0.15)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.4)',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        Logout
                    </motion.button>
                </div>
            </motion.div>

            <div style={{
                padding: '24px',
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                {/* Analyze Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '28px',
                        marginBottom: '24px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    }}
                >
                    <h2 style={{
                        marginBottom: '16px',
                        color: '#333',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        🔍 Analyze Text
                    </h2>
                    <textarea
                        style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '2px solid #e8e8e8',
                            fontSize: '15px',
                            resize: 'vertical',
                            boxSizing: 'border-box',
                            fontFamily: 'Arial, sans-serif',
                            outline: 'none',
                            transition: 'border-color 0.3s',
                            background: '#f8f9ff',
                            color: '#333',
                        }}
                        placeholder="Enter text to analyze sentiment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={4}
                    />
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAnalyze}
                        disabled={loading}
                        style={{
                            marginTop: '12px',
                            padding: '14px 24px',
                            background: loading
                                ? '#aaa'
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            width: '100%',
                            boxShadow: '0 8px 25px rgba(102,126,234,0.3)',
                            letterSpacing: '0.5px',
                        }}
                    >
                        {loading ? '⏳ Analyzing...' : '🚀 Analyze Sentiment'}
                    </motion.button>

                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                                style={{
                                    marginTop: '20px',
                                    padding: '20px',
                                    borderRadius: '16px',
                                    background: getSentimentBg(result.sentiment),
                                    textAlign: 'center',
                                    color: 'white',
                                    boxShadow: `0 8px 25px rgba(0,0,0,0.15)`,
                                }}
                            >
                                <div style={{ fontSize: '40px', marginBottom: '8px' }}>
                                    {getSentimentEmoji(result.sentiment)}
                                </div>
                                <h3 style={{
                                    margin: '0 0 8px',
                                    fontSize: '22px',
                                    color: 'white',
                                }}>
                                    {result.sentiment}
                                </h3>
                                <p style={{
                                    margin: 0,
                                    fontSize: '16px',
                                    opacity: 0.9,
                                    color: 'white',
                                }}>
                                    Confidence: {(result.score * 100).toFixed(1)}%
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Stats Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    marginBottom: '24px',
                }}>
                    {[
                        { label: 'Positive', value: stats.POSITIVE || 0, emoji: '😊', bg: 'linear-gradient(135deg, #00C49F, #00a884)', delay: 0.3 },
                        { label: 'Negative', value: stats.NEGATIVE || 0, emoji: '😞', bg: 'linear-gradient(135deg, #FF4444, #cc0000)', delay: 0.4 },
                        { label: 'Neutral', value: stats.NEUTRAL || 0, emoji: '😐', bg: 'linear-gradient(135deg, #FFBB28, #ff9900)', delay: 0.5 },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: stat.delay }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            style={{
                                padding: '28px',
                                borderRadius: '20px',
                                background: stat.bg,
                                color: 'white',
                                textAlign: 'center',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{ fontSize: '36px', marginBottom: '8px' }}>
                                {stat.emoji}
                            </div>
                            <h3 style={{
                                margin: '0 0 8px',
                                fontSize: '16px',
                                opacity: 0.9,
                                color: 'white',
                                fontWeight: '600',
                            }}>
                                {stat.label}
                            </h3>
                            <motion.h1
                                key={stat.value}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                                style={{
                                    margin: 0,
                                    fontSize: '48px',
                                    fontWeight: '700',
                                    color: 'white',
                                }}
                            >
                                {stat.value}
                            </motion.h1>
                        </motion.div>
                    ))}
                </div>

                {/* Charts */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '24px',
                    marginBottom: '24px',
                }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '24px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        }}
                    >
                        <h2 style={{
                            marginBottom: '16px',
                            color: '#333',
                            fontSize: '18px',
                        }}>
                            📊 Distribution
                        </h2>
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                    label={({ name, value }) => `${name}: ${value}`}
                                    animationBegin={0}
                                    animationDuration={1000}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '24px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        }}
                    >
                        <h2 style={{
                            marginBottom: '16px',
                            color: '#333',
                            fontSize: '18px',
                        }}>
                            📈 Bar Chart
                        </h2>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={pieData}>
                                <XAxis dataKey="name" tick={{ fill: '#666' }} />
                                <YAxis tick={{ fill: '#666' }} />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="value"
                                    fill="#667eea"
                                    radius={[8, 8, 0, 0]}
                                    animationDuration={1000}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* History */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '24px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    }}
                >
                    <h2 style={{
                        marginBottom: '20px',
                        color: '#333',
                        fontSize: '18px',
                    }}>
                        📜 Analysis History
                    </h2>
                    {history.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                                textAlign: 'center',
                                padding: '40px',
                                color: '#aaa',
                            }}
                        >
                            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
                            <p style={{ color: '#aaa' }}>No analysis history yet!</p>
                        </motion.div>
                    ) : (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            maxHeight: '400px',
                            overflowY: 'auto',
                        }}>
                            <AnimatePresence>
                                {history.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.01, x: 5 }}
                                        style={{
                                            padding: '16px 20px',
                                            borderRadius: '12px',
                                            background: '#f8f9ff',
                                            borderLeft: `4px solid ${getSentimentColor(item.sentiment)}`,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <p style={{
                                            margin: '0 0 8px 0',
                                            color: '#333',
                                            fontSize: '14px',
                                            lineHeight: '1.5',
                                        }}>
                                            {item.inputText}
                                        </p>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <span style={{
                                                color: getSentimentColor(item.sentiment),
                                                fontWeight: '700',
                                                fontSize: '13px',
                                                background: `${getSentimentColor(item.sentiment)}20`,
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                            }}>
                                                {getSentimentEmoji(item.sentiment)} {item.sentiment}
                                            </span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <span style={{
        color: '#888',
        fontSize: '13px',
        fontWeight: '600',
    }}>
        {(item.score * 100).toFixed(1)}%
    </span>
    <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleDelete(item.id)}
        style={{
            background: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '4px 12px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600',
        }}
    >
        🗑️ Delete
    </motion.button>
</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default Dashboard;