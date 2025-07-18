import React from 'react';
import CatAvatar from './CatAvatar';
import useStore from '../store/useStore';

const AnswerBox = () => {
  const { currentAnswer, currentQuestion, isLoading, error, catStyle } = useStore();

  if (isLoading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <div className="text-center space-y-4">
          <CatAvatar style={catStyle} isThinking={true} />
          <div className="text-lg text-gray-600 font-cat">
            喵喵喵... 让我想想 🤔
          </div>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-cat-pink rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-cat-pink rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-cat-pink rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <div className="text-center space-y-4">
          <div className="text-4xl">😿</div>
          <div className="text-lg text-red-600 font-cat">
            喵呜... 出错了
          </div>
          <div className="text-sm text-gray-500">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!currentAnswer) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <div className="text-center space-y-4">
          <CatAvatar style={catStyle} />
          <div className="text-lg text-gray-600 font-cat">
            喵～ 有什么想问的吗？ 😺
          </div>
          <div className="text-sm text-gray-500">
            我会用可爱的猫咪语气回答你的问题哦！
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
      <div className="space-y-6">
        {/* 问题 */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="text-sm text-gray-500 mb-2">你的问题：</div>
          <div className="text-gray-800 font-medium">{currentQuestion}</div>
        </div>

        {/* 猫咪回答 */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <CatAvatar style={catStyle} size="medium" />
          </div>
          <div className="flex-1 bg-gradient-to-r from-cat-pink/20 to-cat-purple/20 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-2">猫咪回答：</div>
            <div className="text-gray-800 font-cat text-lg leading-relaxed">
              {currentAnswer}
            </div>
          </div>
        </div>

        {/* 装饰元素 */}
        <div className="flex justify-center space-x-2 text-2xl">
          <span>🐾</span>
          <span>✨</span>
          <span>💫</span>
          <span>🐾</span>
        </div>
      </div>
    </div>
  );
};

export default AnswerBox; 