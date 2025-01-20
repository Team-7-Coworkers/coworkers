import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

module.exports = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],

  // Webpack 설정 추가
  webpackFinal: async (config) => {
    // next/image를 모킹 파일로 대체
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next/image': path.resolve(__dirname, '../__mock__/next/image'),
    };
    return config;
  },
};
