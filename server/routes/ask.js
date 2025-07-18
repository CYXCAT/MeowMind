const express = require('express');
const { processQuestion } = require('../services/questionService');

const router = express.Router();

// POST /ask - 提交问题
router.post('/', async (req, res) => {
  try {
    const { question, catStyle = 'playful' } = req.body;

    // 验证输入
    if (!question || typeof question !== 'string') {
      return res.status(400).json({
        error: '请提供有效的问题',
        message: '问题不能为空且必须是字符串'
      });
    }

    if (question.trim().length === 0) {
      return res.status(400).json({
        error: '问题不能为空',
        message: '请输入你的问题'
      });
    }

    if (question.length > 1000) {
      return res.status(400).json({
        error: '问题太长了',
        message: '问题长度不能超过1000个字符'
      });
    }

    // 验证猫咪风格
    const validStyles = ['playful', 'elegant', 'cool'];
    const finalCatStyle = validStyles.includes(catStyle) ? catStyle : 'playful';

    console.log(`收到问题: "${question}" (风格: ${finalCatStyle})`);

    // 处理问题
    const result = await processQuestion(question.trim(), finalCatStyle);

    res.json({
      success: true,
      answer: result.answer,
      source: result.source,
      question: question.trim(),
      catStyle: finalCatStyle,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('提问处理失败:', error);
    res.status(500).json({
      error: '处理问题失败',
      message: error.message || '服务器内部错误'
    });
  }
});

module.exports = router; 