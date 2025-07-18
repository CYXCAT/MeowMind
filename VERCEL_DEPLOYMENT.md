# MeowMind Vercel 部署指南

## 🚀 部署步骤

### 1. 准备 GitHub 仓库

1. 在 GitHub 上创建新仓库
2. 将代码推送到仓库：

```bash
git init
git add .
git commit -m "Initial commit: MeowMind AI Chat App"
git branch -M main
git remote add origin https://github.com/your-username/meowmind.git
git push -u origin main
```

### 2. 配置 Vercel

1. 访问 [Vercel](https://vercel.com) 并登录
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. 配置项目设置：

#### 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```
# Supabase 配置
SUPABASE_URL=https://raxvuatklfcavekmqlvc.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJheHZ1YXRrbGZjYXZla21xbHZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MDczNzIsImV4cCI6MjA2ODM4MzM3Mn0.dA4mKt3GKhchwZO0xOc-b8ALZUlwnW2GyGwrB5BLEhU

# SiliconFlow API 配置
SILICONFLOW_API_KEY=sk-gskzzkzdvgvbljrcjsgnebnlcbwbgdwzmtxytnejvmltkzzs
SILICONFLOW_BASE_URL=https://api.siliconflow.cn/v1

# 生产环境配置
NODE_ENV=production
```

#### 构建配置

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `client/build`
- **Install Command**: `npm install`

### 3. 数据库设置

1. 在 Supabase 控制台中执行 `create-table.sql` 脚本
2. 确保 RLS 策略已正确配置

### 4. 部署

1. 点击 "Deploy" 按钮
2. 等待构建完成
3. 访问生成的域名

## 🔧 项目结构

```
meowmind/
├── client/                 # React 前端
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                 # Express 后端
│   ├── routes/
│   ├── services/
│   ├── config/
│   └── index.js
├── vercel.json            # Vercel 配置
├── package.json           # 根目录配置
└── README.md
```

## 🌐 API 路由

- `GET /api/health` - 健康检查
- `POST /api/ask` - 提问接口
- `GET /api/history` - 历史记录

## 🔍 故障排除

### 常见问题

1. **构建失败**
   - 检查环境变量是否正确配置
   - 确保所有依赖都已安装

2. **API 调用失败**
   - 检查 CORS 配置
   - 验证 API 密钥是否正确

3. **数据库连接失败**
   - 确认 Supabase 配置正确
   - 检查 RLS 策略设置

### 调试技巧

1. 查看 Vercel 构建日志
2. 检查浏览器控制台错误
3. 使用 Vercel 函数日志调试 API

## 📝 更新部署

每次推送到 `main` 分支时，Vercel 会自动重新部署。

```bash
git add .
git commit -m "Update: 描述你的更改"
git push origin main
```

## 🔒 安全注意事项

1. 不要在代码中硬编码 API 密钥
2. 使用环境变量管理敏感信息
3. 定期更新依赖包
4. 启用 Supabase RLS 策略

## 📞 支持

如果遇到问题，请检查：
1. Vercel 部署日志
2. Supabase 连接状态
3. 环境变量配置
4. API 密钥有效性 