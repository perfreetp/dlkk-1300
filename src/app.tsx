import React, { useEffect } from 'react';
import { useDidShow, useDidHide } from '@tarojs/taro';
import { DeviceStoreProvider } from '@/store/device';
import { FlashRecordStoreProvider } from '@/store/flashRecord';
import './app.scss';

function App(props) {
  useEffect(() => {});

  useDidShow(() => {});

  useDidHide(() => {});

  return (
    <FlashRecordStoreProvider>
      <DeviceStoreProvider>
        {props.children}
      </DeviceStoreProvider>
    </FlashRecordStoreProvider>
  );
}

export default App;
