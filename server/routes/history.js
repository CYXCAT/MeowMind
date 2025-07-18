const express = require('express');
const { getAllQuestions } = require('../services/questionService');

const router = express.Router();

// GET /history - 获取所有历史记录
router.get('/', async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;

    // 验证分页参数
    const parsedLimit = Math.min(parseInt(limit) || 50, 100); // 最大100条
    const parsedOffset = Math.max(parseInt(offset) || 0, 0);

    console.log(`获取历史记录 (limit: ${parsedLimit}, offset: ${parsedOffset})`);

    // 获取所有问题（这里简化处理，实际可以添加分页）
    const questions = await getAllQuestions();

    // 手动分页
    const paginatedQuestions = questions.slice(parsedOffset, parsedOffset + parsedLimit);

    res.json({
      success: true,
      data: paginatedQuestions,
      pagination: {
        total: questions.length,
        limit: parsedLimit,
        offset: parsedOffset,
        hasMore: parsedOffset + parsedLimit < questions.length
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('获取历史记录失败:', error);
    res.status(500).json({
      error: '获取历史记录失败',
      message: error.message || '服务器内部错误'
    });
  }
});

module.exports = router; 