import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import MessageItem from '@/components/MessageItem';
import { mockMessages } from '@/data/mockMessages';
import { Message, MessageType } from '@/types/message';
import styles from './index.module.scss';

const messageTypes = [
  { id: 'all', name: '全部' },
  { id: 'reply', name: '回复' },
  { id: 'dm', name: '私信' },
  { id: 'update', name: '更新' },
  { id: 'announcement', name: '公告' }
];

const MessagePage: React.FC = () => {
  const [activeType, setActiveType] = useState<string>('all');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const filteredMessages = activeType === 'all'
    ? messages
    : messages.filter(msg => msg.type === activeType);

  const handleMessageClick = (message: Message) => {
    if (!message.isRead) {
      setMessages(prev => prev.map(m =>
        m.id === message.id ? { ...m, isRead: true } : m
      ));
    }

    console.log('[Message] Click message:', message.id);
  };

  return (
    <ScrollView
      className={styles.page}
      scrollY
      enableBackToTop
      onRefresherRefresh={() => {
        wx.showToast({ title: '刷新中...', icon: 'loading' });
        setTimeout(() => wx.stopPullDownRefresh(), 1000);
      }}
    >
      <View className={styles.filterBar}>
        <ScrollView scrollX className={styles.typeScroll}>
          <View className={styles.typeList}>
            {messageTypes.map((type) => (
              <View
                key={type.id}
                className={`${styles.typeItem} ${activeType === type.id ? styles.active : ''}`}
                onClick={() => setActiveType(type.id)}
              >
                <Text className={`${styles.typeText} ${activeType === type.id ? styles.activeText : ''}`}>
                  {type.name}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className={styles.messageList}>
        {filteredMessages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            onClick={() => handleMessageClick(message)}
          />
        ))}

        {filteredMessages.length === 0 && (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>&#128172;</Text>
            <Text className={styles.emptyText}>暂无消息</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MessagePage;
