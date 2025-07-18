const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ 缺少 Supabase 配置');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function initDatabase() {
  try {
    console.log('🚀 开始初始化数据库...');
    
    // 读取 SQL 脚本
    const fs = require('fs');
    const path = require('path');
    const sqlPath = path.join(__dirname, 'supabase', 'init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('📄 SQL 脚本内容:');
    console.log(sql);
    
    // 执行 SQL 脚本
    console.log('🔧 执行 SQL 脚本...');
    const { data, error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error('❌ 执行 SQL 失败:', error);
      
      // 如果 exec_sql 函数不存在，尝试直接执行
      console.log('🔄 尝试直接执行 SQL...');
      const { data: result, error: directError } = await supabase
        .from('questions')
        .select('*')
        .limit(1);
      
      if (directError && directError.code === '42P01') {
        console.log('📋 表不存在，需要手动创建。请访问 Supabase 控制台执行以下 SQL:');
        console.log('\n' + sql + '\n');
      } else {
        console.log('✅ 数据库连接正常');
      }
    } else {
      console.log('✅ 数据库初始化成功!');
    }
    
  } catch (error) {
    console.error('❌ 初始化失败:', error);
  }
}

initDatabase(); 