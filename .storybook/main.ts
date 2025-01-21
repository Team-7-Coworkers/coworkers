import path from 'path';
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'], // POSIX 스타일 경로 유지
  webpackFinal: async (config) => {
    // config.resolve가 없을 경우 초기화
    config.resolve = config.resolve || { alias: {} };

    // next/image를 모킹 파일로 대체
    config.resolve.alias = {
      ...config.resolve.alias,
      'next/image': path.resolve(__dirname, '../__mock__/next/image'),
    };

    return config;
  },
};

export default config;
