import React from 'react';
import type { Preview } from '@storybook/react';
import { ConfigProvider } from 'antd';
import { lightTheme, darkTheme } from '../src/lib/antd/theme';
import '../src/styles/main.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#1e293b' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      // Sync theme with Storybook background selection
      const isDark = context.globals.backgrounds?.value === '#1e293b';
      const theme = isDark ? darkTheme : lightTheme;

      return (
        <ConfigProvider theme={theme}>
          <Story />
        </ConfigProvider>
      );
    },
  ],
};

export default preview;
