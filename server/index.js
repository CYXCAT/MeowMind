require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const askRoutes = require('./routes/ask');
const historyRoutes = require('./routes/history');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/ask', askRoutes);
app.use('/history', historyRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'MeowMind 服务器运行正常 🐱',
    timestamp: new Date().toISOString()
  });
});

// 404 处理
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: '喵呜... 找不到这个页面 😿',
    path: req.originalUrl 
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ 
    error: '喵呜... 服务器出错了 😿',
    message: process.env.NODE_ENV === 'development' ? err.message : '内部服务器错误'
  });
});

app.listen(PORT, () => {
  console.log(`🐾 MeowMind 服务器启动成功！`);
  console.log(`📍 服务器地址: http://localhost:${PORT}`);
  console.log(`🌍 环境: ${process.env.NODE_ENV || 'development'}`);
}); 