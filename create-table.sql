-- MeowMind 数据库初始化脚本
-- 请在 Supabase 控制台的 SQL Editor 中执行此脚本

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 创建 questions 表
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_text TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    source VARCHAR(10) NOT NULL DEFAULT 'ai' CHECK (source IN ('db', 'ai')),
    user_id UUID, -- 可选，用于未来用户系统
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_questions_created_at ON questions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_questions_source ON questions(source);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_questions_updated_at 
    BEFORE UPDATE ON questions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 插入一些示例数据
INSERT INTO questions (question_text, answer_text, source, created_at) VALUES
(
    '你好，你是谁？',
    '喵喵～ 我是 MeowMind 的AI猫咪助手！😺 我可以回答你的各种问题，用可爱的猫咪语气和你聊天哦！有什么想问的吗？',
    'db',
    NOW() - INTERVAL '1 day'
),
(
    '今天天气怎么样？',
    '喵呜～ 这个问题我可能帮不上忙呢 😸 因为我没有实时天气数据。建议你查看天气预报APP或者看看窗外哦！不过如果是晴天的话，记得多晒太阳，猫咪最喜欢晒太阳了！☀️',
    'db',
    NOW() - INTERVAL '2 hours'
);

-- 创建 RLS 策略（允许所有人读取和插入）
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON questions FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON questions FOR INSERT WITH CHECK (true); 