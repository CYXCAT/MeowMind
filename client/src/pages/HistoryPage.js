import React, { useEffect } from 'react';
import { Clock, Database, Sparkles } from 'lucide-react';
import useStore from '../store/useStore';

const HistoryPage = () => {
  const { questions, fetchHistory } = useStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'db':
        return <Database size={16} className="text-blue-500" />;
      case 'ai':
        return <Sparkles size={16} className="text-purple-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getSourceText = (source) => {
    switch (source) {
      case 'db':
        return '数据库';
      case 'ai':
        return 'AI生成';
      default:
        return '未知';
    }
  };

  // 确保 questions 是数组
  const questionsArray = Array.isArray(questions) ? questions : [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white font-cat">
          📚 问答历史记录
        </h1>
        <p className="text-white/90 text-lg">
          查看所有历史问答记录
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        {questionsArray.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="text-4xl">📝</div>
            <div className="text-lg text-gray-600 font-cat">
              还没有问答记录呢
            </div>
            <div className="text-sm text-gray-500">
              快去首页提问吧！
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-lg font-bold text-gray-800 mb-4">
              共 {questionsArray.length} 条记录
            </div>
            {questionsArray.map((item, index) => (
              <div
                key={item.id || index}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getSourceIcon(item.source)}
                    <span className="text-sm text-gray-500">
                      {getSourceText(item.source)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(item.created_at)}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-500 mb-1">问题：</div>
                    <div className="text-gray-800 font-medium">
                      {item.question_text}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cat-pink/20 to-cat-purple/20 rounded-lg p-3">
                    <div className="text-sm text-gray-500 mb-1">猫咪回答：</div>
                    <div className="text-gray-800 font-cat">
                      {item.answer_text}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage; 