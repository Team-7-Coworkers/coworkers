import path from 'path';
import type { StorybookConfig } from '@storybook/nextjs';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

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
  webpackFinal: async (webpackConfig) => {
    // config.resolve가 없을 경우 초기화
    webpackConfig.resolve = webpackConfig.resolve || { alias: {} };

    // next/image를 모킹 파일로 대체
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      'next/image': path.resolve(__dirname, '../__mock__/next/image'),
    };

    // tsconfig 경로(alias)를 위한 플러그인 추가
    webpackConfig.resolve.plugins = [
      ...(webpackConfig.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: webpackConfig.resolve.extensions,
      }),
    ];

    return webpackConfig;
  },
};

export default config;
