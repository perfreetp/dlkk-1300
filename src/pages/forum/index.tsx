import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import PostCard from '@/components/PostCard';
import { mockPosts } from '@/data/mockPosts';
import { PostCategory } from '@/types/post';
import styles from './index.module.scss';

const categories = [
  { id: 'all', name: '全部' },
  { id: 'tutorial', name: '教程' },
  { id: 'discussion', name: '讨论' },
  { id: 'resource', name: '资源' },
  { id: 'feedback', name: '反馈' }
];

const ForumPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPosts = activeCategory === 'all'
    ? mockPosts
    : mockPosts.filter(post => post.category === activeCategory);

  const handlePostClick = (postId: string) => {
    wx.navigateTo({
      url: `/pages/post-detail/index?id=${postId}`
    });
  };

  const handleLike = (postId: string) => {
    console.log('[Forum] Like post:', postId);
  };

  const handleCollect = (postId: string) => {
    console.log('[Forum] Collect post:', postId);
  };

  return (
    <View className={styles.page}>
      <View className={styles.filterBar}>
        <ScrollView scrollX className={styles.categoryScroll}>
          <View className={styles.categoryList}>
            {categories.map((cat) => (
              <View
                key={cat.id}
                className={`${styles.categoryItem} ${activeCategory === cat.id ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <Text className={`${styles.categoryText} ${activeCategory === cat.id ? styles.activeText : ''}`}>
                  {cat.name}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView scrollY className={styles.postList}>
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onClick={() => handlePostClick(post.id)}
            onLike={() => handleLike(post.id)}
            onCollect={() => handleCollect(post.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ForumPage;
