import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Message } from '@/types/message';
import { formatDate } from '@/utils/format';
import styles from './index.module.scss';

interface MessageItemProps {
  message: Message;
  onClick?: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onClick }) => {
  const getTypeIcon = () => {
    switch (message.type) {
      case 'reply': return '&#128172;';
      case 'dm': return '&#128140;';
      case 'update': return '&#128260;';
      case 'announcement': return '&#128226;';
      default: return '&#128172;';
    }
  };

  const getTypeText = () => {
    switch (message.type) {
      case 'reply': return '回复';
      case 'dm': return '私信';
      case 'update': return '更新';
      case 'announcement': return '公告';
      default: return '消息';
    }
  };

  return (
    <View
      className={styles.item}
      style={{ opacity: message.isRead ? 0.7 : 1 }}
      onClick={onClick}
    >
      <View className={styles.avatar}>
        {message.avatar ? (
          <Image
            className={styles.avatarImg}
            src={message.avatar}
            mode='aspectFill'
            onError={() => console.error('[MessageItem] Avatar load failed:', message.avatar)}
          />
        ) : (
          <Text className={styles.avatarIcon}>{getTypeIcon()}</Text>
        )}
      </View>

      <View className={styles.content}>
        <View className={styles.header}>
          <View className={styles.titleRow}>
            <Text className={styles.type}>{getTypeText()}</Text>
            <Text className={styles.title}>{message.title}</Text>
          </View>
          <Text className={styles.time}>{formatDate(message.createdAt)}</Text>
        </View>
        <Text className={styles.messageContent}>{message.content}</Text>
      </View>

      {!message.isRead && <View className={styles.unread} />}
    </View>
  );
};

export default MessageItem;
