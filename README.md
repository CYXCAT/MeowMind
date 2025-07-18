# 🐱 MeowMind - AI 猫咪问答助手

一个可爱的 AI 问答网站，使用猫咪拟人语气回答用户问题。

## ✨ 特性

- 🤖 **AI 智能回答** - 基于 SiliconFlow API 的智能问答
- 🐱 **猫咪拟人语气** - 可爱的猫咪风格回答
- 💾 **历史记录** - 保存所有问答历史
- 🎨 **多种风格** - 支持调皮、优雅、高冷三种猫咪风格
- 📱 **响应式设计** - 支持桌面和移动设备
- 🚀 **实时部署** - 支持 Vercel 一键部署

## 🛠️ 技术栈

### 前端
- **React 18** - 用户界面框架
- **Tailwind CSS** - 样式框架
- **Zustand** - 状态管理
- **Axios** - HTTP 客户端
- **React Router** - 路由管理

### 后端
- **Express.js** - Node.js 服务器框架
- **Supabase** - 数据库和认证
- **SiliconFlow API** - AI 回答引擎

### 部署
- **Vercel** - 前端和后端部署
- **GitHub** - 代码托管

## 🚀 快速开始

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/your-username/meowmind.git
cd meowmind
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
cp env.example .env
# 编辑 .env 文件，填入你的配置
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **访问应用**
- 前端: http://localhost:3000
- 后端: http://localhost:3001

### 生产部署

详细部署指南请查看 [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## 📁 项目结构

```
meowmind/
├── client/                 # React 前端
│   ├── src/
│   │   ├── components/     # React 组件
│   │   ├── pages/         # 页面组件
│   │   ├── store/         # Zustand 状态管理
│   │   └── App.js         # 主应用组件
│   ├── public/            # 静态资源
│   └── package.json       # 前端依赖
├── server/                # Express 后端
│   ├── routes/            # API 路由
│   ├── services/          # 业务逻辑
│   ├── config/            # 配置文件
│   └── index.js           # 服务器入口
├── supabase/              # 数据库脚本
├── vercel.json            # Vercel 配置
└── package.json           # 项目配置
```

## 🌐 API 接口

### 提问接口
```http
POST /api/ask
Content-Type: application/json

{
  "question": "你好，你是谁？",
  "catStyle": "playful"
}
```

### 历史记录接口
```http
GET /api/history?limit=50&offset=0
```

### 健康检查接口
```http
GET /api/health
```

## 🎨 猫咪风格

- **playful** - 调皮可爱风格
- **elegant** - 优雅温柔风格  
- **cool** - 高冷傲娇风格

## 🔧 环境变量

```bash
# Supabase 配置
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# SiliconFlow API 配置
SILICONFLOW_API_KEY=your_siliconflow_api_key
SILICONFLOW_BASE_URL=https://api.siliconflow.cn/v1

# 服务器配置
PORT=3001
NODE_ENV=development
```

## 📝 开发指南

### 添加新功能
1. 在 `client/src/components/` 创建新组件
2. 在 `server/routes/` 添加新路由
3. 在 `server/services/` 添加业务逻辑
4. 更新状态管理

### 数据库操作
1. 修改 `supabase/init.sql` 添加新表
2. 在 Supabase 控制台执行 SQL
3. 更新相关服务代码

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- [SiliconFlow](https://siliconflow.cn) - AI API 服务
- [Supabase](https://supabase.com) - 数据库服务
- [Vercel](https://vercel.com) - 部署平台 