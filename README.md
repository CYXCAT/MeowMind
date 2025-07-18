# 🐾 MeowMind 喵语问答机

一个有趣的猫咪拟人问答AI网站，用可爱的猫咪语气回答你的问题！

## ✨ 功能特色

- 🐱 **猫咪语气回答** - 所有回答都带有可爱的猫咪拟人风格
- 🧠 **智能问答** - 支持各种问题的智能回答
- 📚 **历史记录** - 保存所有问答历史
- 🎨 **精美UI** - 使用Tailwind CSS打造的现代化界面
- ⚡ **快速响应** - 优先从数据库查找，查不到再调用AI

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd meowmind
```

### 2. 安装依赖
```bash
npm run install:all
```

### 3. 配置环境变量
```bash
cp env.example .env
# 编辑 .env 文件，填入你的 Supabase 和 OpenRouter API 密钥
```

### 4. 启动开发服务器
```bash
npm run dev
```

前端将在 http://localhost:3000 运行
后端将在 http://localhost:3001 运行

## 🛠 技术栈

- **前端**: React + Tailwind CSS + Zustand
- **后端**: Express + Node.js
- **数据库**: Supabase (PostgreSQL)
- **AI服务**: OpenRouter API
- **部署**: Vercel + Supabase

## 📁 项目结构

```
meowmind/
├── client/          # React 前端
├── server/          # Express 后端
├── supabase/        # 数据库初始化脚本
├── package.json     # 根目录配置
└── README.md        # 项目说明
```

## 🐱 猫咪风格

系统会以以下猫咪风格回答：
- 😸 调皮可爱
- 😺 优雅温柔
- 😼 高冷傲娇

## 📝 开发说明

详细的产品需求文档请查看 `PRD.txt`

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## �� 许可证

MIT License 