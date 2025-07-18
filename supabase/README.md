# Supabase 配置说明

## 数据库设置

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并创建新项目
2. 记录项目 URL 和 API 密钥

### 2. 运行初始化脚本

在 Supabase Dashboard 的 SQL Editor 中运行 `init.sql` 文件：

```sql
-- 复制 supabase/init.sql 的内容并执行
```

### 3. 配置环境变量

在项目根目录创建 `.env` 文件：

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. 数据库表结构

#### questions 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| question_text | TEXT | 用户问题 |
| answer_text | TEXT | 猫咪回答 |
| source | VARCHAR(10) | 来源 ('db' 或 'ai') |
| user_id | UUID | 用户ID（可选） |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### 5. 索引

- `idx_questions_created_at`: 按创建时间排序
- `idx_questions_source`: 按来源查询
- `idx_questions_text`: 全文搜索索引

### 6. 示例数据

初始化脚本包含4条示例问答记录，涵盖：
- 自我介绍
- 天气查询
- 猫咪知识
- 学习建议

## 安全配置

### Row Level Security (RLS)

当前配置允许公共读写访问。如需用户系统，可启用 RLS：

```sql
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
```

### API 密钥

- **Anon Key**: 用于客户端（只读）
- **Service Role Key**: 用于服务器（读写）

## 监控和日志

在 Supabase Dashboard 中可以查看：
- 数据库查询日志
- API 调用统计
- 错误日志
- 性能指标 