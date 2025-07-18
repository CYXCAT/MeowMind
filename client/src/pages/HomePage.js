import React, { useEffect } from 'react';
import AskForm from '../components/AskForm';
import AnswerBox from '../components/AnswerBox';
import useStore from '../store/useStore';

const HomePage = () => {
  const { fetchHistory } = useStore();

  useEffect(() => {
    // 页面加载时获取历史记录
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 页面标题 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white font-cat">
          🐾 MeowMind 喵语问答机
        </h1>
        <p className="text-white/90 text-lg">
          可爱的小猫咪和你聊聊天 ✨
        </p>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧：提问表单 */}
        <div>
          <AskForm />
        </div>

        {/* 右侧：回答显示 */}
        <div>
          <AnswerBox />
        </div>
      </div>

      {/* 底部装饰 */}
      <div className="text-center space-y-4">
        <div className="flex justify-center space-x-4 text-2xl">
          <span>🐱</span>
          <span>💭</span>
          <span>🤖</span>
          <span>✨</span>
        </div>
        <p className="text-white/70 text-sm">
          小猫咪为你解答各种问题
        </p>
      </div>
    </div>
  );
};

export default HomePage; 