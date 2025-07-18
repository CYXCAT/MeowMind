// 根据环境加载环境变量
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config();
} else {
  require('dotenv').config({ path: '../.env' });
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const askRoutes = require('./routes/ask');
const historyRoutes = require('./routes/history');

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

// 生产环境：服务静态文件
if (process.env.NODE_ENV === 'production') {
  // 尝试多个可能的静态文件路径
  const staticPaths = [
    path.join(__dirname, '../client/build'),
    path.join(__dirname, '../../client/build'),
    path.join(__dirname, 'client/build'),
    path.join(__dirname, '../build')
  ];
  
  let staticPath = null;
  for (const p of staticPaths) {
    try {
      require('fs').accessSync(p);
      staticPath = p;
      break;
    } catch (e) {
      // 路径不存在，继续尝试下一个
    }
  }
  
  if (staticPath) {
    console.log('📁 使用静态文件路径:', staticPath);
    app.use(express.static(staticPath));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(staticPath, 'index.html'));
    });
  } else {
    console.log('⚠️ 未找到静态文件，返回 API 信息');
    app.get('*', (req, res) => {
      res.json({
        message: 'MeowMind API 服务器',
        status: 'running',
        endpoints: {
          health: '/api/health',
          ask: '/api/ask',
          history: '/api/history'
        },
        environment: process.env.NODE_ENV || 'development'
      });
    });
  }
}

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