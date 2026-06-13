import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { mockPosts } from '@/data/mockPosts';
import { Post, PostComment, PostCommentReply } from '@/types/post';
import { formatDate, formatNumber, getCategoryName, getCategoryColor } from '@/utils/format';
import styles from './index.module.scss';

const PostDetailPage: React.FC = () => {
  const [post, setPost] = useState<Post>(() => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const id = (currentPage as any)?.options?.id || '1';
    return mockPosts.find(p => p.id === id) || mockPosts[0];
  });

  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [isCollected, setIsCollected] = useState(post.isCollected);
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<PostComment[]>([
    {
      id: 'c1',
      postId: post.id,
      userId: 'user1',
      userName: '热心网友',
      userAvatar: 'https://picsum.photos/id/64/100/100',
      content: '写得非常详细，感谢分享！',
      images: [],
      likeCount: 12,
      isLiked: false,
      createdAt: '2024-01-15 12:00',
      replies: []
    },
    {
      id: 'c2',
      postId: post.id,
      userId: 'user2',
      userName: '刷机新手',
      userAvatar: 'https://picsum.photos/id/91/100/100',
      content: '请问刷入后会不会丢失数据？',
      images: [],
      likeCount: 5,
      isLiked: false,
      createdAt: '2024-01-14 18:30',
      replies: [
        {
          id: 'r1',
          commentId: 'c2',
          parentId: 'c2',
          userId: 'author1',
          userName: '刷机达人张三',
          userAvatar: 'https://picsum.photos/id/64/100/100',
          content: '建议先备份重要数据，以防万一',
          createdAt: '2024-01-14 19:00'
        }
      ]
    }
  ]);
  const [commentText, setCommentText] = useState('');

  const toggleStep = (stepId: string) => {
    setExpandedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleCollect = () => {
    setIsCollected(!isCollected);
    Taro.showToast({
      title: isCollected ? '已取消收藏' : '已收藏',
      icon: 'success'
    });
  };

  const handleReport = () => {
    Taro.showModal({
      title: '举报',
      content: '确定要举报这篇帖子吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({
            title: '举报成功',
            icon: 'success'
          });
        }
      }
    });
  };

  const handleDownloadAttachment = (attachment: { name: string; url: string }) => {
    Taro.showToast({
      title: `开始下载: ${attachment.name}`,
      icon: 'none'
    });
  };

  const handleCommentLike = (commentId: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          isLiked: !c.isLiked,
          likeCount: c.isLiked ? c.likeCount - 1 : c.likeCount + 1
        };
      }
      return c;
    }));
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) {
      Taro.showToast({ title: '请输入评论内容', icon: 'none' });
      return;
    }
    
    const newComment: PostComment = {
      id: `c${Date.now()}`,
      postId: post.id,
      userId: 'currentUser',
      userName: '刷机爱好者',
      userAvatar: 'https://picsum.photos/id/64/100/100',
      content: commentText,
      images: [],
      likeCount: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
      replies: []
    };
    
    setComments(prev => [newComment, ...prev]);
    setCommentText('');
    Taro.showToast({ title: '评论成功', icon: 'success' });
  };

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <View className={styles.authorRow}>
          <Image
            className={styles.avatar}
            src={post.authorAvatar}
            mode='aspectFill'
          />
          <View className={styles.authorInfo}>
            <Text className={styles.authorName}>{post.authorName}</Text>
            <Text className={styles.time}>{formatDate(post.createdAt)}</Text>
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
            {post.images.map((src, index) => (
              <Image
                key={index}
                className={styles.image}
                src={src}
                mode='aspectFill'
                onError={() => console.error('[PostDetail] Image load failed:', src)}
              />
            ))}
          </View>
        )}

        {post.deviceName && (
          <View className={styles.device}>
            <Text className={styles.deviceText}>{post.deviceName}</Text>
          </View>
        )}

        {post.tags.length > 0 && (
          <View className={styles.tags}>
            {post.tags.map((tag, index) => (
              <View key={index} className={styles.tag}>
                <Text className={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {post.steps && post.steps.length > 0 && (
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>操作步骤</Text>
          {post.steps.map((step, index) => (
            <View key={step.id} className={styles.stepCard}>
              <View
                className={styles.stepHeader}
                onClick={() => toggleStep(step.id)}
              >
                <View className={styles.stepNumber}>{index + 1}</View>
                <Text className={styles.stepTitle}>{step.title}</Text>
                <Text className={styles.stepArrow}>
                  {expandedSteps.has(step.id) ? '▼' : '▶'}
                </Text>
              </View>
              {expandedSteps.has(step.id) && (
                <View className={styles.stepContent}>
                  <Text className={styles.stepText}>{step.content}</Text>
                  {step.images.length > 0 && (
                    <View className={styles.stepImages}>
                      {step.images.map((src, idx) => (
                        <Image
                          key={idx}
                          className={styles.stepImage}
                          src={src}
                          mode='aspectFill'
                        />
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {post.attachments.length > 0 && (
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>附件下载</Text>
          {post.attachments.map((attachment) => (
            <View
              key={attachment.id}
              className={styles.attachmentItem}
              onClick={() => handleDownloadAttachment(attachment)}
            >
              <Text className={styles.attachmentIcon}>&#128230;</Text>
              <View className={styles.attachmentInfo}>
                <Text className={styles.attachmentName}>{attachment.name}</Text>
                <Text className={styles.attachmentSize}>{attachment.size}</Text>
              </View>
              <Text className={styles.downloadIcon}>&#8595;</Text>
            </View>
          ))}
        </View>
      )}

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>评论 ({comments.length})</Text>
        </View>
        <View className={styles.commentList}>
          {comments.map((comment) => (
            <View key={comment.id} className={styles.commentItem}>
              <Image
                className={styles.commentAvatar}
                src={comment.userAvatar}
                mode='aspectFill'
              />
              <View className={styles.commentContent}>
                <View className={styles.commentHeader}>
                  <Text className={styles.commentName}>{comment.userName}</Text>
                  <Text className={styles.commentTime}>{formatDate(comment.createdAt)}</Text>
                </View>
                <Text className={styles.commentText}>{comment.content}</Text>
                <View className={styles.commentActions}>
                  <View
                    className={styles.commentAction}
                    onClick={() => handleCommentLike(comment.id)}
                  >
                    <Text className={comment.isLiked ? styles.likedIcon : styles.actionIcon}>&#10084;</Text>
                    <Text className={styles.actionText}>{comment.likeCount}</Text>
                  </View>
                  <View className={styles.commentAction}>
                    <Text className={styles.actionIcon}>&#128172;</Text>
                    <Text className={styles.actionText}>回复</Text>
                  </View>
                </View>
                
                {comment.replies.length > 0 && (
                  <View className={styles.replies}>
                    {comment.replies.map((reply) => (
                      <View key={reply.id} className={styles.replyItem}>
                        <Image
                          className={styles.replyAvatar}
                          src={reply.userAvatar}
                          mode='aspectFill'
                        />
                        <View className={styles.replyContent}>
                          <View className={styles.replyHeader}>
                            <Text className={styles.replyName}>{reply.userName}</Text>
                            {reply.replyToUserName && (
                              <Text className={styles.replyTo}>@{reply.replyToUserName}</Text>
                            )}
                            <Text className={styles.replyTime}>{formatDate(reply.createdAt)}</Text>
                          </View>
                          <Text className={styles.replyText}>{reply.content}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.bottomBar}>
        <View className={styles.actionBar}>
          <View className={styles.actionItem} onClick={handleLike}>
            <Text className={isLiked ? styles.likedIcon : styles.actionIcon}>&#10084;</Text>
            <Text className={styles.actionText}>{formatNumber(likeCount)}</Text>
          </View>
          <View className={styles.actionItem} onClick={handleCollect}>
            <Text className={isCollected ? styles.collectedIcon : styles.actionIcon}>&#9733;</Text>
            <Text className={styles.actionText}>{isCollected ? '已收藏' : '收藏'}</Text>
          </View>
          <View className={styles.actionItem} onClick={handleReport}>
            <Text className={styles.actionIcon}>&#9888;</Text>
            <Text className={styles.actionText}>举报</Text>
          </View>
        </View>
        <View className={styles.commentInput}>
          <Input
            className={styles.input}
            placeholder='写下你的评论...'
            value={commentText}
            onInput={(e) => setCommentText(e.detail.value)}
            confirmType='send'
            onConfirm={handleSubmitComment}
          />
          <View className={styles.submitBtn} onClick={handleSubmitComment}>
            <Text className={styles.submitText}>发送</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PostDetailPage;
