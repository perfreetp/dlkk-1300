import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Post } from '@/types/post';
import { formatNumber, getCategoryName, getCategoryColor, formatDate } from '@/utils/format';
import styles from './index.module.scss';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
  onLike?: () => void;
  onCollect?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick, onLike, onCollect }) => {
  const handleClick = () => {
    if (onClick) onClick();
    else {
      Taro.navigateTo({
        url: `/pages/post-detail/index?id=${post.id}`
      });
    }
  };

  return (
    <View className={styles.card} onClick={handleClick}>
      <View className={styles.header}>
        <View className={styles.author}>
          <Image
            className={styles.avatar}
            src={post.authorAvatar}
            mode='aspectFill'
            onError={() => console.error('[PostCard] Avatar load failed:', post.authorAvatar)}
          />
          <View className={styles.authorInfo}>
            <Text className={styles.authorName}>{post.authorName}</Text>
            <Text className={styles.time}>{formatDate(post.createdAt)}</Text>
          </View>
        </View>
        <View
          className={styles.category}
          style={{ backgroundColor: getCategoryColor(post.category) }}
        >
          <Text className={styles.categoryText}>{getCategoryName(post.category)}</Text>
        </View>
      </View>

      <Text className={styles.title}>{post.title}</Text>
      <Text className={styles.content}>{post.content}</Text>

      {post.images.length > 0 && (
        <View className={styles.images}>
          {post.images.slice(0, 3).map((src, index) => (
            <Image
              key={index}
              className={styles.image}
              src={src}
              mode='aspectFill'
              onError={() => console.error('[PostCard] Image load failed:', src)}
            />
          ))}
        </View>
      )}

      {post.deviceName && (
        <View className={styles.device}>
          <Text className={styles.deviceText}>{post.deviceName}</Text>
        </View>
      )}

      <View className={styles.footer}>
        <View className={styles.stats}>
          <Text className={styles.stat}>浏览 {formatNumber(post.viewCount)}</Text>
          <View
            className={styles.actionItem}
            onClick={(e) => {
              e.stopPropagation();
              if (onLike) onLike();
            }}
          >
            <Text className={post.isLiked ? styles.likedIcon : styles.icon}>&#10084;</Text>
            <Text className={styles.stat}>{formatNumber(post.likeCount)}</Text>
          </View>
          <View
            className={styles.actionItem}
            onClick={(e) => {
              e.stopPropagation();
              if (onCollect) onCollect();
            }}
          >
            <Text className={post.isCollected ? styles.collectedIcon : styles.icon}>&#9733;</Text>
            <Text className={styles.stat}>{post.isCollected ? '已收藏' : '收藏'}</Text>
          </View>
        </View>
        <Text className={styles.commentCount}>{post.commentCount} 评论</Text>
      </View>
    </View>
  );
};

export default PostCard;
