const supabase = require('../config/supabase');
const { generateCatAnswer } = require('./aiService');

// 从数据库查找问题
const findQuestionInDB = async (questionText) => {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .ilike('question_text', questionText)
      .limit(1);

    if (error) {
      console.error('数据库查询错误:', error);
      return null;
    }

    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('查找问题失败:', error);
    return null;
  }
};

// 保存问答到数据库
const saveQuestionToDB = async (questionText, answerText, source = 'ai') => {
  try {
    const { data, error } = await supabase
      .from('questions')
      .insert([
        {
          question_text: questionText,
          answer_text: answerText,
          source: source,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('保存问题失败:', error);
      throw new Error('保存问答记录失败');
    }

    return data[0];
  } catch (error) {
    console.error('保存问题到数据库失败:', error);
    throw error;
  }
};

// 获取所有历史记录
const getAllQuestions = async () => {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取历史记录失败:', error);
      throw new Error('获取历史记录失败');
    }

    return data || [];
  } catch (error) {
    console.error('获取所有问题失败:', error);
    throw error;
  }
};

// 处理问题回答
const processQuestion = async (questionText, catStyle = 'playful') => {
  try {
    // 1. 先在数据库中查找
    const existingQuestion = await findQuestionInDB(questionText);
    
    if (existingQuestion) {
      console.log('从数据库找到已有回答');
      return {
        answer: existingQuestion.answer_text,
        source: existingQuestion.source
      };
    }

    // 2. 数据库中没有，调用AI生成
    console.log('调用AI生成新回答');
    const aiAnswer = await generateCatAnswer(questionText, catStyle);
    
    // 3. 保存到数据库
    await saveQuestionToDB(questionText, aiAnswer, 'ai');
    
    return {
      answer: aiAnswer,
      source: 'ai'
    };
  } catch (error) {
    console.error('处理问题失败:', error);
    throw error;
  }
};

module.exports = {
  processQuestion,
  getAllQuestions,
  findQuestionInDB,
  saveQuestionToDB
}; 