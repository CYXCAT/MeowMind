const axios = require('axios');

const SILICONFLOW_API_KEY = process.env.SILICONFLOW_API_KEY;
const SILICONFLOW_BASE_URL = process.env.SILICONFLOW_BASE_URL || 'https://api.siliconflow.cn/v1';

// 猫咪风格提示词
const getCatStylePrompt = (style) => {
  const stylePrompts = {
    playful: '请用调皮可爱的猫咪语气回答，可以加入一些猫咪的拟声词如"喵喵"、"喵呜"等，表情要活泼可爱。',
    elegant: '请用优雅温柔的猫咪语气回答，语气要温和有礼，像一只高贵的猫咪。',
    cool: '请用高冷傲娇的猫咪语气回答，可以有点小傲娇，但不要太过分。'
  };
  
  return stylePrompts[style] || stylePrompts.playful;
};

// 模拟AI回答生成
const generateMockAnswer = (question, catStyle) => {
  const mockAnswers = {
    playful: [
      `喵喵～ 这个问题很有趣呢！😸 ${question} 的答案就是... 让我想想... 喵呜～ 我觉得答案应该是这样的！✨`,
      `哇！你问的是 ${question} 吗？😺 喵喵喵～ 这个问题我知道答案！让我用最可爱的猫咪语气告诉你吧！🌟`,
      `喵呜～ ${question} 这个问题问得真好！😸 作为一只聪明的猫咪，我觉得答案应该是这样的... 喵喵～ ✨`
    ],
    elegant: [
      `喵～ 关于 ${question}，让我优雅地回答你。😽 作为一只高贵的猫咪，我认为答案是这样的... 希望这个回答对你有帮助。✨`,
      `喵呜～ ${question} 是一个很有深度的问题呢。😺 让我用温和的语气为你解答... 喵～ 这就是我的看法。💫`,
      `喵～ 关于 ${question}，我想这样回答你。😽 作为一只优雅的猫咪，我认为... 喵呜～ 希望这个回答能让你满意。✨`
    ],
    cool: [
      `哼～ ${question} 吗？😼 这个问题... 好吧，既然你诚心诚意地发问了，我就大发慈悲地告诉你吧。喵～`,
      `喵呜～ ${question}？😎 这个问题很简单嘛，让我用最酷的方式回答你... 喵～ 就是这样。`,
      `嗯～ ${question} 啊... 😼 虽然这个问题有点幼稚，但看在你这么认真的份上，我就勉为其难地回答一下吧。喵～`
    ]
  };
  
  const answers = mockAnswers[catStyle] || mockAnswers.playful;
  const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
  
  return randomAnswer;
};

// 使用 SiliconFlow API 生成回答
const generateSiliconFlowAnswer = async (question, catStyle) => {
  try {
    const systemPrompt = `你是一只可爱的AI猫咪助手。${getCatStylePrompt(catStyle)}

请记住：
1. 始终用猫咪的语气回答
2. 回答要有趣、可爱、实用
3. 可以适当使用猫咪表情符号
4. 回答要简洁明了，不要太长
5. 如果问题比较复杂，也要用简单易懂的猫咪语言解释`;

    console.log('🤖 调用 SiliconFlow API...');
    console.log('📝 问题:', question);
    console.log('🎭 风格:', catStyle);
    console.log('🔗 API URL:', `${SILICONFLOW_BASE_URL}/chat/completions`);

    const requestData = {
      model: "Qwen/QwQ-32B",
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: question
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    };

    console.log('📤 请求数据:', JSON.stringify(requestData, null, 2));

    const response = await axios.post(
      `${SILICONFLOW_BASE_URL}/chat/completions`,
      requestData,
      {
        headers: {
          'Authorization': `Bearer ${SILICONFLOW_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ SiliconFlow API 调用成功!');
    console.log('📊 响应状态:', response.status);
    console.log('📄 响应数据:', JSON.stringify(response.data, null, 2));

    const answer = response.data.choices[0].message.content.trim();
    console.log('🐱 生成的回答:', answer);
    
    return answer;
  } catch (error) {
    console.error('❌ SiliconFlow API 调用失败:');
    console.error('🔍 错误详情:', error.response?.data || error.message);
    console.error('📊 状态码:', error.response?.status);
    throw new Error('SiliconFlow API 调用失败');
  }
};

// 生成猫咪回答
const generateCatAnswer = async (question, catStyle = 'playful') => {
  // 使用 SiliconFlow API
  if (SILICONFLOW_API_KEY) {
    try {
      console.log('使用 SiliconFlow API 生成回答');
      return await generateSiliconFlowAnswer(question, catStyle);
    } catch (error) {
      console.warn('SiliconFlow API 失败，使用模拟回答');
    }
  }

  // 如果没有配置 API 密钥或调用失败，使用模拟回答
  console.warn('⚠️  警告：没有配置 SiliconFlow API 或调用失败，将使用模拟回答');
  return generateMockAnswer(question, catStyle);
};

module.exports = {
  generateCatAnswer
}; 