# 🚀 MeowMind 部署指南

## 本地开发

### 1. 环境准备

确保已安装：
- Node.js (v16+)
- npm 或 yarn

### 2. 快速启动

```bash
# 克隆项目
git clone <repository-url>
cd meowmind

# 使用启动脚本
./start.sh
```

或手动启动：

```bash
# 安装依赖
npm run install:all

# 配置环境变量
cp env.example .env
# 编辑 .env 文件

# 启动开发服务器
npm run dev
```

### 3. 访问应用

- 前端：http://localhost:3000
- 后端：http://localhost:3001
- 健康检查：http://localhost:3001/health

## 生产部署

### 方案一：Vercel + Supabase

#### 1. 部署前端到 Vercel

```bash
# 构建前端
cd client
npm run build

# 部署到 Vercel
vercel --prod
```

#### 2. 配置环境变量

在 Vercel Dashboard 中设置：

```env
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### 3. 部署后端

可以使用以下平台之一：

**Vercel Functions:**
```bash
# 在 server 目录创建 vercel.json
{
  "functions": {
    "api/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

**Railway:**
```bash
# 连接 GitHub 仓库
# Railway 会自动检测并部署
```

**Render:**
```bash
# 创建 Render 服务
# 设置构建命令：npm install
# 设置启动命令：npm start
```

### 方案二：Docker 部署

#### 1. 创建 Dockerfile

```dockerfile
# 多阶段构建
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# 生产镜像
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server ./server
COPY --from=builder /app/client/build ./client/build

EXPOSE 3001
CMD ["node", "server/index.js"]
```

#### 2. 构建和运行

```bash
# 构建镜像
docker build -t meowmind .

# 运行容器
docker run -p 3001:3001 --env-file .env meowmind
```

## 环境变量配置

### 必需的环境变量

```env
# Supabase 配置
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OpenRouter API 配置
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1

# 服务器配置
PORT=3001
NODE_ENV=production

# 客户端配置
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 数据库设置

### 1. Supabase 配置

1. 创建 Supabase 项目
2. 运行 `supabase/init.sql` 初始化数据库
3. 获取 API 密钥

### 2. 数据库备份

```bash
# 导出数据
pg_dump $DATABASE_URL > backup.sql

# 导入数据
psql $DATABASE_URL < backup.sql
```

## 监控和日志

### 1. 应用监控

- 使用 Vercel Analytics 监控前端性能
- 使用 Supabase Dashboard 监控数据库
- 设置错误监控（如 Sentry）

### 2. 日志管理

```bash
# 查看应用日志
npm run logs

# 查看错误日志
tail -f logs/error.log
```

## 性能优化

### 1. 前端优化

- 启用 gzip 压缩
- 使用 CDN 加速静态资源
- 实现懒加载和代码分割

### 2. 后端优化

- 启用数据库连接池
- 实现 API 缓存
- 使用 Redis 缓存热点数据

### 3. 数据库优化

- 定期清理旧数据
- 优化查询索引
- 监控慢查询

## 安全配置

### 1. 环境变量安全

- 不要在代码中硬编码敏感信息
- 使用环境变量管理密钥
- 定期轮换 API 密钥

### 2. API 安全

- 启用 CORS 配置
- 实现请求频率限制
- 添加 API 认证（可选）

### 3. 数据库安全

- 启用 Row Level Security (RLS)
- 定期备份数据
- 监控异常访问

## 故障排除

### 常见问题

1. **前端无法连接后端**
   - 检查 CORS 配置
   - 验证 API URL 配置

2. **数据库连接失败**
   - 检查 Supabase 配置
   - 验证网络连接

3. **AI API 调用失败**
   - 检查 OpenRouter API 密钥
   - 验证 API 配额

### 调试命令

```bash
# 检查服务状态
curl http://localhost:3001/health

# 查看日志
npm run logs

# 测试数据库连接
node -e "require('./server/config/supabase.js')"
```

## 更新和维护

### 1. 代码更新

```bash
# 拉取最新代码
git pull origin main

# 重新安装依赖
npm run install:all

# 重启服务
npm run dev
```

### 2. 数据库迁移

```bash
# 运行新的 SQL 脚本
psql $DATABASE_URL < new_migration.sql
```

### 3. 备份策略

- 每日自动备份数据库
- 定期备份代码和配置
- 测试恢复流程 