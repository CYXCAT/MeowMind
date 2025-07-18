import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import useStore from '../store/useStore';

const AskForm = () => {
  const [question, setQuestion] = useState('');
  const { askQuestion, isLoading, catStyle, setCatStyle } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    try {
      await askQuestion(question.trim());
      setQuestion('');
    } catch (error) {
      console.error('提问失败:', error);
    }
  };

  const catStyles = [
    { value: 'playful', label: '😸 调皮', color: 'bg-cat-orange' },
    { value: 'elegant', label: '😺 优雅', color: 'bg-cat-pink' },
    { value: 'cool', label: '😼 高冷', color: 'bg-cat-blue' },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 font-cat">
          选择猫咪风格 🐱
        </h2>
        <div className="flex space-x-2">
          {catStyles.map((style) => (
            <button
              key={style.value}
              onClick={() => setCatStyle(style.value)}
              className={`px-4 py-2 rounded-lg transition-all ${
                catStyle === style.value
                  ? `${style.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            向猫咪提问 🤔
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="输入你的问题，比如：今天天气怎么样？"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cat-pink focus:border-transparent resize-none"
            rows="3"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={!question.trim() || isLoading}
          className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
            !question.trim() || isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-cat-pink to-cat-purple text-white hover:shadow-lg transform hover:scale-105'
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>思考中...</span>
            </>
          ) : (
            <>
              <Sparkles size={20} />
              <span>发送问题</span>
              <Send size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AskForm; 