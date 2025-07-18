import React from 'react';

const CatAvatar = ({ style = 'playful', size = 'large', isThinking = false }) => {
  const getCatEmoji = () => {
    switch (style) {
      case 'playful':
        return isThinking ? '😸' : '😺';
      case 'elegant':
        return isThinking ? '😺' : '😽';
      case 'cool':
        return isThinking ? '😼' : '😎';
      default:
        return '😺';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-2xl';
      case 'medium':
        return 'text-4xl';
      case 'large':
        return 'text-6xl';
      default:
        return 'text-6xl';
    }
  };

  const getAnimation = () => {
    if (isThinking) {
      return 'animate-bounce-slow';
    }
    
    switch (style) {
      case 'playful':
        return 'animate-wiggle';
      case 'elegant':
        return 'animate-pulse';
      case 'cool':
        return '';
      default:
        return '';
    }
  };

  return (
    <div className={`flex justify-center items-center ${getAnimation()}`}>
      <div className={`${getSizeClasses()} select-none`}>
        {getCatEmoji()}
      </div>
    </div>
  );
};

export default CatAvatar; 