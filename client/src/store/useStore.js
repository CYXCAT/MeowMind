import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const useStore = create((set, get) => ({
  // 状态
  questions: [],
  currentQuestion: '',
  currentAnswer: '',
  isLoading: false,
  error: null,
  catStyle: 'playful', // playful, elegant, cool

  // 设置当前问题
  setCurrentQuestion: (question) => set({ currentQuestion: question }),

  // 设置猫咪风格
  setCatStyle: (style) => set({ catStyle: style }),

  // 提交问题
  askQuestion: async (question) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await axios.post(`${API_BASE_URL}/ask`, {
        question,
        catStyle: get().catStyle
      });
      
      const { answer, source } = response.data;
      
      set({
        currentAnswer: answer,
        isLoading: false,
        currentQuestion: question
      });

      // 刷新历史记录
      get().fetchHistory();
      
      return { answer, source };
    } catch (error) {
      set({
        error: error.response?.data?.message || '提问失败，请稍后重试',
        isLoading: false
      });
      throw error;
    }
  },

  // 获取历史记录
  fetchHistory: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      // 后端返回的数据结构是 { success: true, data: [...], pagination: {...} }
      const questions = response.data.data || response.data || [];
      set({ questions });
    } catch (error) {
      console.error('获取历史记录失败:', error);
      // 如果获取失败，设置为空数组
      set({ questions: [] });
    }
  },

  // 清除错误
  clearError: () => set({ error: null }),

  // 清除当前问答
  clearCurrent: () => set({ currentQuestion: '', currentAnswer: '' }),
}));

export default useStore; 