-- MeowMind 数据库初始化脚本
-- 创建 questions 表

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
CREATE INDEX IF NOT EXISTS idx_questions_text ON questions USING gin(to_tsvector('chinese', question_text));

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
),
(
    '猫咪为什么喜欢睡觉？',
    '喵喵～ 这个问题问得真好！😺 我们猫咪喜欢睡觉是因为：1. 我们天生就是夜行动物，白天需要休息 2. 睡觉能帮助我们保存能量 3. 我们每天需要睡12-16小时才能保持健康 4. 睡觉时我们的大脑也在工作，处理信息呢！所以下次看到猫咪在睡觉，不要打扰我们哦～ 😴',
    'db',
    NOW() - INTERVAL '1 hour'
),
(
    '如何学习编程？',
    '喵呜～ 学习编程就像学习新技能一样，需要耐心和练习！😸 我的建议是：1. 从简单的语言开始，比如Python 2. 多动手写代码，不要只看不练 3. 遇到问题不要怕，这是学习的一部分 4. 加入编程社区，和其他开发者交流 5. 坚持每天学习一点点。记住，连我们猫咪都要慢慢学习新技能呢！💻✨',
    'db',
    NOW() - INTERVAL '30 minutes'
);

-- 创建 RLS (Row Level Security) 策略（可选，用于未来用户系统）
-- ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- 创建公共访问策略（允许所有人读取）
-- CREATE POLICY "Allow public read access" ON questions FOR SELECT USING (true);

-- 创建插入策略（允许所有人插入）
-- CREATE POLICY "Allow public insert" ON questions FOR INSERT WITH CHECK (true);

-- 显示表结构
\d questions;

-- 显示示例数据
SELECT id, question_text, answer_text, source, created_at FROM questions ORDER BY created_at DESC; 