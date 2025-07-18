const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

// 如果没有配置 Supabase，使用模拟客户端
if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  警告：缺少 Supabase 配置，将使用模拟数据模式');
  
  // 创建模拟的 Supabase 客户端
  const mockSupabase = {
    from: (table) => ({
      select: () => ({
        ilike: () => ({
          limit: () => Promise.resolve({ data: null, error: null })
        }),
        order: () => Promise.resolve({ 
          data: [
            {
              id: 'mock-1',
              question_text: '你好，你是谁？',
              answer_text: '喵喵～ 我是 MeowMind 的AI猫咪助手！😺 我可以回答你的各种问题，用可爱的猫咪语气和你聊天哦！有什么想问的吗？',
              source: 'db',
              created_at: new Date().toISOString()
            },
            {
              id: 'mock-2',
              question_text: '今天天气怎么样？',
              answer_text: '喵呜～ 这个问题我可能帮不上忙呢 😸 因为我没有实时天气数据。建议你查看天气预报APP或者看看窗外哦！不过如果是晴天的话，记得多晒太阳，猫咪最喜欢晒太阳了！☀️',
              source: 'db',
              created_at: new Date().toISOString()
            }
          ], 
          error: null 
        })
      }),
      insert: (data) => ({
        select: () => Promise.resolve({ 
          data: [{ ...data[0], id: 'mock-' + Date.now() }], 
          error: null 
        })
      })
    })
  };
  
  module.exports = mockSupabase;
} else {
  const supabase = createClient(supabaseUrl, supabaseKey);
  module.exports = supabase;
} 