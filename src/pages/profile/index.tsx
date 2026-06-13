import React from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

const ProfilePage: React.FC = () => {
  const menuGroups = [
    {
      title: '我的内容',
      items: [
        { icon: '&#9733;', title: '我的收藏', subtitle: '0篇收藏', path: '/pages/collection/index' },
        { icon: '&#128221;', title: '我的发帖', subtitle: '0篇帖子', path: '/pages/myposts/index' },
        { icon: '&#128230;', title: '刷机记录', subtitle: '0条记录', path: '/pages/flash-records/index' }
      ]
    },
    {
      title: '其他',
      items: [
        { icon: '&#9881;', title: '设置', subtitle: '', path: '/pages/settings/index' },
        { icon: '&#10067;', title: '关于我们', subtitle: '', path: '/pages/about/index' },
        { icon: '&#128222;', title: '联系客服', subtitle: '', path: '/pages/contact/index' }
      ]
    }
  ];

  const handleMenuClick = (path: string) => {
    if (path) {
      Taro.navigateTo({ url: path });
    }
  };

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.profileHeader}>
        <View className={styles.userInfo}>
          <Image
            className={styles.avatar}
            src='https://picsum.photos/id/64/200/200'
            mode='aspectFill'
          />
          <View className={styles.userDetail}>
            <Text className={styles.userName}>刷机爱好者</Text>
            <Text className={styles.userLevel}>Lv.5 资深会员</Text>
          </View>
        </View>
        <View className={styles.stats}>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>12</Text>
            <Text className={styles.statLabel}>关注机型</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>5</Text>
            <Text className={styles.statLabel}>收藏帖子</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>3</Text>
            <Text className={styles.statLabel}>刷机次数</Text>
          </View>
        </View>
      </View>

      <View className={styles.menuSection}>
        {menuGroups.map((group, groupIndex) => (
          <View key={groupIndex} className={styles.menuGroup}>
            {group.items.map((item, itemIndex) => (
              <View
                key={itemIndex}
                className={styles.menuItem}
                onClick={() => handleMenuClick(item.path)}
              >
                <View className={styles.menuIcon}>
                  <Text className={styles.menuIconText}>{item.icon}</Text>
                </View>
                <View className={styles.menuContent}>
                  <Text className={styles.menuTitle}>{item.title}</Text>
                  {item.subtitle && (
                    <Text className={styles.menuSubtitle}>{item.subtitle}</Text>
                  )}
                </View>
                <Text className={styles.menuArrow}>&#8250;</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
