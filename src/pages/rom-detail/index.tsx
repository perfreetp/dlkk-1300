import React, { useState, useMemo } from 'react';
import { View, Text, Image, ScrollView, Swiper, SwiperItem } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { mockRoms } from '@/data/mockRoms';
import { mockPosts } from '@/data/mockPosts';
import { Rom, RomFeedback } from '@/types/rom';
import { formatDate, formatNumber } from '@/utils/format';
import styles from './index.module.scss';

const RomDetailPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState<'info' | 'feedback'>('info');
  const [feedbacks, setFeedbacks] = useState<RomFeedback[]>([
    {
      id: '1',
      romId: '1',
      userId: 'user1',
      userName: '刷机新手',
      userAvatar: 'https://picsum.photos/id/64/100/100',
      rating: 5,
      content: '刷入成功，系统很流畅，推荐大家试试！',
      images: ['https://picsum.photos/id/1/300/400'],
      createdAt: '2024-01-15',
      replies: []
    },
    {
      id: '2',
      romId: '1',
      userId: 'user2',
      userName: '老玩家',
      userAvatar: 'https://picsum.photos/id/91/100/100',
      rating: 4,
      content: '整体不错，但是耗电有点快，希望能优化一下',
      images: [],
      createdAt: '2024-01-14',
      replies: [
        {
          id: 'r1',
          feedbackId: '2',
          userId: 'author1',
          userName: 'ROM作者',
          userAvatar: 'https://picsum.photos/id/177/100/100',
          content: '感谢反馈，下个版本会优化续航',
          createdAt: '2024-01-14 16:00'
        }
      ]
    }
  ]);

  const [rom, setRom] = useState<Rom>(() => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const id = (currentPage as any)?.options?.id || '1';
    return mockRoms.find(r => r.id === id) || mockRoms[0];
  });

  const relatedPosts = useMemo(() => {
    return mockPosts.filter(p => p.deviceId === rom.deviceId && p.category === 'tutorial').slice(0, 3);
  }, [rom.deviceId]);

  const handleDownload = () => {
    Taro.showModal({
      title: '开始下载',
      content: `确定要下载 ${rom.name} v${rom.version} 吗？`,
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({
            title: '已添加到下载列表',
            icon: 'success'
          });
        }
      }
    });
  };

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <Text className={styles.romName}>{rom.name}</Text>
        <Text className={styles.version}>v{rom.version}</Text>
        <View className={styles.meta}>
          <Text className={styles.device}>{rom.deviceName}</Text>
          <Text className={styles.separator}>·</Text>
          <Text className={styles.author}>by {rom.author}</Text>
        </View>
      </View>

      <View className={styles.screenshotSection}>
        <Swiper
          className={styles.screenshotSwiper}
          indicatorDots
          autoplay
          circular
          current={current}
          onChange={(e) => setCurrent(e.detail.current)}
        >
          {rom.screenshots.map((src, index) => (
            <SwiperItem key={index}>
              <Image
                className={styles.screenshot}
                src={src}
                mode='aspectFill'
                onError={() => console.error('[RomDetail] Screenshot load failed:', src)}
              />
            </SwiperItem>
          ))}
        </Swiper>
        <Text className={styles.screenshotIndicator}>
          {current + 1} / {rom.screenshots.length}
        </Text>
      </View>

      <View className={styles.infoSection}>
        <View className={styles.tabBar}>
          <View
            className={`${styles.tab} ${activeTab === 'info' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <Text className={`${styles.tabText} ${activeTab === 'info' ? styles.activeText : ''}`}>详情</Text>
          </View>
          <View
            className={`${styles.tab} ${activeTab === 'feedback' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('feedback')}
          >
            <Text className={`${styles.tabText} ${activeTab === 'feedback' ? styles.activeText : ''}`}>
              反馈 ({feedbacks.length})
            </Text>
          </View>
        </View>

        {activeTab === 'info' && (
          <View className={styles.infoContent}>
            <View className={styles.infoCard}>
              <Text className={styles.infoLabel}>底包要求</Text>
              <Text className={styles.infoValue}>{rom.basePackage}</Text>
            </View>

            <View className={styles.infoCard}>
              <Text className={styles.infoLabel}>文件大小</Text>
              <Text className={styles.infoValue}>{rom.fileSize}</Text>
            </View>

            <View className={styles.infoCard}>
              <Text className={styles.infoLabel}>评分</Text>
              <View className={styles.ratingRow}>
                <Text className={styles.ratingValue}>{rom.rating}</Text>
                <Text className={styles.ratingStars}>
                  {'★'.repeat(Math.floor(rom.rating))}{'☆'.repeat(5 - Math.floor(rom.rating))}
                </Text>
                <Text className={styles.feedbackCount}>({rom.feedbackCount}人反馈)</Text>
              </View>
            </View>

            <View className={styles.infoCard}>
              <Text className={styles.infoLabel}>MD5校验值</Text>
              <Text className={styles.md5Value} selectable>{rom.md5}</Text>
            </View>

            <View className={styles.section}>
              <Text className={styles.sectionTitle}>更新日志</Text>
              <Text className={styles.changelog}>{rom.changelog}</Text>
            </View>

            {rom.knownIssues.length > 0 && (
              <View className={styles.section}>
                <Text className={styles.sectionTitle}>已知问题</Text>
                {rom.knownIssues.map((issue, index) => (
                  <View key={index} className={styles.issueItem}>
                    <Text className={styles.issueIcon}>⚠</Text>
                    <Text className={styles.issueText}>{issue}</Text>
                  </View>
                ))}
              </View>
            )}

            {relatedPosts.length > 0 && (
              <View className={styles.section}>
                <Text className={styles.sectionTitle}>相关教程</Text>
                {relatedPosts.map((post) => (
                  <View
                    key={post.id}
                    className={styles.relatedPost}
                    onClick={() => Taro.navigateTo({ url: `/pages/post-detail/index?id=${post.id}` })}
                  >
                    <Text className={styles.postTitle}>{post.title}</Text>
                    <Text className={styles.postArrow}>&#8250;</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {activeTab === 'feedback' && (
          <View className={styles.feedbackContent}>
            {feedbacks.map((feedback) => (
              <View key={feedback.id} className={styles.feedbackItem}>
                <View className={styles.feedbackHeader}>
                  <Image
                    className={styles.feedbackAvatar}
                    src={feedback.userAvatar}
                    mode='aspectFill'
                  />
                  <View className={styles.feedbackInfo}>
                    <Text className={styles.feedbackName}>{feedback.userName}</Text>
                    <View className={styles.feedbackMeta}>
                      <Text className={styles.feedbackStars}>
                        {'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}
                      </Text>
                      <Text className={styles.feedbackDate}>{formatDate(feedback.createdAt)}</Text>
                    </View>
                  </View>
                </View>
                <Text className={styles.feedbackText}>{feedback.content}</Text>
                {feedback.images.length > 0 && (
                  <View className={styles.feedbackImages}>
                    {feedback.images.map((src, idx) => (
                      <Image
                        key={idx}
                        className={styles.feedbackImage}
                        src={src}
                        mode='aspectFill'
                      />
                    ))}
                  </View>
                )}
                {feedback.replies.length > 0 && (
                  <View className={styles.replies}>
                    {feedback.replies.map((reply) => (
                      <View key={reply.id} className={styles.replyItem}>
                        <View className={styles.replyHeader}>
                          <Image
                            className={styles.replyAvatar}
                            src={reply.userAvatar}
                            mode='aspectFill'
                          />
                          <Text className={styles.replyName}>{reply.userName}</Text>
                          <Text className={styles.replyDate}>{formatDate(reply.createdAt)}</Text>
                        </View>
                        <Text className={styles.replyText}>{reply.content}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>

      <View className={styles.bottomBar}>
        <View className={styles.downloadInfo}>
          <Text className={styles.downloadSize}>{rom.fileSize}</Text>
          <Text className={styles.downloadCount}>{formatNumber(rom.downloadCount)}次下载</Text>
        </View>
        <View className={styles.downloadButton} onClick={handleDownload}>
          <Text className={styles.downloadButtonText}>立即下载</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RomDetailPage;
