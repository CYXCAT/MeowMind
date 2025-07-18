#!/bin/bash

echo "🐾 欢迎使用 MeowMind 喵语问答机！"
echo "=================================="

# 检查是否安装了 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未找到 Node.js，请先安装 Node.js"
    exit 1
fi

# 检查是否安装了 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 错误：未找到 npm，请先安装 npm"
    exit 1
fi

echo "✅ Node.js 和 npm 已安装"

# 检查 .env 文件
if [ ! -f ".env" ]; then
    echo "⚠️  警告：未找到 .env 文件"
    echo "请复制 env.example 为 .env 并配置环境变量："
    echo "cp env.example .env"
    echo ""
    echo "需要配置的环境变量："
    echo "- SUPABASE_URL: Supabase 项目 URL"
    echo "- SUPABASE_ANON_KEY: Supabase 匿名密钥"
    echo "- SUPABASE_SERVICE_ROLE_KEY: Supabase 服务角色密钥"
    echo "- OPENROUTER_API_KEY: OpenRouter API 密钥"
    echo ""
    read -p "是否继续安装依赖？(y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 安装依赖
echo "📦 安装项目依赖..."
npm run install:all

if [ $? -eq 0 ]; then
    echo "✅ 依赖安装完成"
else
    echo "❌ 依赖安装失败"
    exit 1
fi

echo ""
echo "🚀 启动开发服务器..."
echo "前端将在 http://localhost:3000 运行"
echo "后端将在 http://localhost:3001 运行"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

# 启动开发服务器
npm run dev 