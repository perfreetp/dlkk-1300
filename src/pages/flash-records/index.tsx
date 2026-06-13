import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Input, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useFlashRecordStore } from '@/store/flashRecord';
import { mockDevices } from '@/data/mockDevices';
import { mockRoms } from '@/data/mockRoms';
import styles from './index.module.scss';

const FlashRecordsPage: React.FC = () => {
  const { records, addRecord, deleteRecord } = useFlashRecordStore();
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [deviceIndex, setDeviceIndex] = useState(0);
  const [romIndex, setRomIndex] = useState(0);
  const [notes, setNotes] = useState('');
  const [filterDevice, setFilterDevice] = useState('全部');
  const [filterTime, setFilterTime] = useState('全部');

  const formatFullDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const deviceOptions = useMemo(() => ['全部', ...mockDevices.map(d => d.name)], []);
  const timeOptions = ['全部', '今天', '近7天', '近30天'];

  const getTimeRange = (filter: string): { start?: Date; end?: Date } => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (filter) {
      case '今天':
        return { start: today };
      case '近7天':
        return { start: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000) };
      case '近30天':
        return { start: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000) };
      default:
        return {};
    }
  };

  const filteredRecords = useMemo(() => {
    let result = records;
    
    if (filterDevice !== '全部') {
      result = result.filter(r => r.deviceName === filterDevice);
    }
    
    if (filterTime !== '全部') {
      const range = getTimeRange(filterTime);
      result = result.filter(r => {
        const recordDate = new Date(r.backupTime);
        if (range.start && recordDate < range.start) return false;
        if (range.end && recordDate > range.end) return false;
        return true;
      });
    }
    
    return result.sort((a, b) => new Date(b.backupTime).getTime() - new Date(a.backupTime).getTime());
  }, [records, filterDevice, filterTime]);

  const handleAddRecord = () => {
    const device = mockDevices[deviceIndex];
    const rom = mockRoms[romIndex];
    
    addRecord({
      deviceId: device.id,
      deviceName: device.name,
      romName: rom.name,
      version: rom.version,
      backupTime: new Date().toISOString(),
      notes: notes
    });
    
    setShowForm(false);
    setNotes('');
  };

  const handleEditRecord = () => {
    const { updateRecord } = useFlashRecordStore();
    updateRecord(editingRecord.id, { notes });
    setShowEdit(false);
    setEditingRecord(null);
    setNotes('');
    Taro.showToast({ title: '更新成功', icon: 'success' });
  };

  const openEditForm = (record: any) => {
    setEditingRecord(record);
    setNotes(record.notes || '');
    setShowEdit(true);
  };

  const handleDeleteRecord = (id: string) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这条刷机记录吗？',
      success: (res) => {
        if (res.confirm) {
          deleteRecord(id);
        }
      }
    });
  };

  return (
    <View className={styles.page}>
      <View className={styles.filterBar}>
        <View className={styles.filterItem}>
          <Text className={styles.filterLabel}>机型</Text>
          <Picker
            mode='selector'
            range={deviceOptions}
            onChange={(e) => setFilterDevice(deviceOptions[Number(e.detail.value)])}
          >
            <View className={styles.filterValue}>
              <Text>{filterDevice}</Text>
              <Text className={styles.arrow}>&#8250;</Text>
            </View>
          </Picker>
        </View>
        
        <View className={styles.filterItem}>
          <Text className={styles.filterLabel}>时间</Text>
          <Picker
            mode='selector'
            range={timeOptions}
            onChange={(e) => setFilterTime(timeOptions[Number(e.detail.value)])}
          >
            <View className={styles.filterValue}>
              <Text>{filterTime}</Text>
              <Text className={styles.arrow}>&#8250;</Text>
            </View>
          </Picker>
        </View>
      </View>

      <ScrollView scrollY className={styles.recordList}>
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <View key={record.id} className={styles.recordCard}>
              <View className={styles.recordHeader}>
                <View className={styles.deviceInfo}>
                  <Text className={styles.deviceName}>{record.deviceName}</Text>
                  <Text className={styles.romInfo}>{record.romName} v{record.version}</Text>
                </View>
                <View className={styles.actions}>
                  <View
                    className={styles.actionBtn}
                    onClick={() => openEditForm(record)}
                  >
                    <Text className={styles.editText}>编辑</Text>
                  </View>
                  <View
                    className={styles.actionBtn}
                    onClick={() => handleDeleteRecord(record.id)}
                  >
                    <Text className={styles.deleteText}>删除</Text>
                  </View>
                </View>
              </View>
              
              <View className={styles.recordMeta}>
                <View className={styles.metaItem}>
                  <Text className={styles.metaLabel}>备份时间</Text>
                  <Text className={styles.metaValue}>{formatFullDate(record.backupTime)}</Text>
                </View>
                <View className={styles.metaItem}>
                  <Text className={styles.metaLabel}>刷入版本</Text>
                  <Text className={styles.metaValue}>{record.version}</Text>
                </View>
              </View>
              
              {record.notes && (
                <View className={styles.notes}>
                  <Text className={styles.notesLabel}>异常备注</Text>
                  <Text className={styles.notesText}>{record.notes}</Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>&#128230;</Text>
            <Text className={styles.emptyText}>暂无符合条件的记录</Text>
            <Text className={styles.emptyHint}>尝试调整筛选条件</Text>
          </View>
        )}
      </ScrollView>

      {showForm && (
        <View className={styles.formOverlay} onClick={() => setShowForm(false)}>
          <View className={styles.form} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.formTitle}>添加刷机记录</Text>
            
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>选择机型</Text>
              <Picker
                mode='selector'
                range={mockDevices}
                rangeKey='name'
                onChange={(e) => setDeviceIndex(Number(e.detail.value))}
              >
                <View className={styles.pickerValue}>
                  <Text>{mockDevices[deviceIndex]?.name || '请选择'}</Text>
                  <Text className={styles.arrow}>&#8250;</Text>
                </View>
              </Picker>
            </View>
            
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>刷入版本</Text>
              <Picker
                mode='selector'
                range={mockRoms}
                rangeKey='name'
                onChange={(e) => setRomIndex(Number(e.detail.value))}
              >
                <View className={styles.pickerValue}>
                  <Text>{mockRoms[romIndex]?.name || '请选择'} v{mockRoms[romIndex]?.version || ''}</Text>
                  <Text className={styles.arrow}>&#8250;</Text>
                </View>
              </Picker>
            </View>
            
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>异常备注（可选）</Text>
              <Input
                className={styles.notesInput}
                placeholder='如有异常情况请备注...'
                value={notes}
                onInput={(e) => setNotes(e.detail.value)}
              />
            </View>
            
            <View className={styles.formActions}>
              <View
                className={styles.cancelBtn}
                onClick={() => setShowForm(false)}
              >
                <Text className={styles.cancelText}>取消</Text>
              </View>
              <View
                className={styles.submitBtn}
                onClick={handleAddRecord}
              >
                <Text className={styles.submitText}>保存</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {showEdit && (
        <View className={styles.formOverlay} onClick={() => setShowEdit(false)}>
          <View className={styles.form} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.formTitle}>编辑备注</Text>
            
            <View className={styles.formItem}>
              <Text className={styles.formLabel}>异常备注</Text>
              <Input
                className={styles.notesInput}
                placeholder='请输入备注...'
                value={notes}
                onInput={(e) => setNotes(e.detail.value)}
              />
            </View>
            
            <View className={styles.formActions}>
              <View
                className={styles.cancelBtn}
                onClick={() => setShowEdit(false)}
              >
                <Text className={styles.cancelText}>取消</Text>
              </View>
              <View
                className={styles.submitBtn}
                onClick={handleEditRecord}
              >
                <Text className={styles.submitText}>保存</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {!showForm && !showEdit && (
        <View className={styles.bottomBar}>
          <View
            className={styles.addButton}
            onClick={() => setShowForm(true)}
          >
            <Text className={styles.addButtonText}>+ 添加记录</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default FlashRecordsPage;
