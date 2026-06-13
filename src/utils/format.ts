export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return '今天';
  if (days === 1) return '昨天';
  if (days < 7) return `${days}天前`;
  if (days < 30) return `${Math.floor(days / 7)}周前`;
  return dateStr;
};

export const formatFileSize = (size: string): string => {
  return size;
};

export const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}w`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
};

export const getCategoryName = (category: string): string => {
  const map = {
    tutorial: '教程',
    discussion: '讨论',
    resource: '资源',
    feedback: '反馈'
  };
  return map[category] || category;
};

export const getCategoryColor = (category: string): string => {
  const map = {
    tutorial: '#1890ff',
    discussion: '#722ed1',
    resource: '#52c41a',
    feedback: '#faad14'
  };
  return map[category] || '#1890ff';
};
