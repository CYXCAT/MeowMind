// 根据环境加载环境变量
try {
  if (process.env.NODE_ENV === 'production') {
    require('dotenv').config();
  } else {
    require('dotenv').config({ path: '../.env' });
  }
} catch (error) {
  console.warn('⚠️ 环境变量加载失败:', error.message);
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// 安全地加载路由和服务
let askRoutes, historyRoutes;

try {
  askRoutes = require('./routes/ask');
  historyRoutes = require('./routes/history');
} catch (error) {
  console.error('❌ 路由加载失败:', error.message);
  // 创建简单的错误路由
  askRoutes = express.Router();
  historyRoutes = express.Router();
  
  askRoutes.post('/', (req, res) => {
    res.status(500).json({ error: '路由加载失败', message: error.message });
  });
  
  historyRoutes.get('/', (req, res) => {
    res.status(500).json({ error: '路由加载失败', message: error.message });
  });
}

const app = express();

// 中间件
app.use(helmet({
  contentSecurityPolicy: false, // 在 Vercel 中可能需要禁用
}));

// CORS 配置
app.use(cors({
  origin: true, // 允许所有来源
  credentials: true
}));

app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 根路径响应
app.get('/', (req, res) => {
  res.json({
    message: 'MeowMind API 服务器',
    status: 'running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      ask: '/api/ask',
      history: '/api/history'
    }
  });
});

// API 路由
app.use('/api/ask', askRoutes);
app.use('/api/history', historyRoutes);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'MeowMind 服务器运行正常 🐱',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    url: req.url,
    method: req.method
  });
});

// 404 处理
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: '喵呜... 找不到这个页面 😿',
    path: req.originalUrl,
    method: req.method
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

// 只在开发环境启动服务器
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🐾 MeowMind 服务器启动成功！`);
    console.log(`📍 服务器地址: http://localhost:${PORT}`);
    console.log(`🌍 环境: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Vercel 需要导出 app
module.exports = app; 