'use client';

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import type { Decorator } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useUserStore from '@stores/userStore';
import useTeamStore from '@stores/teamStore';

import GNB from '@components/Gnb';
import '@app/styles/globals.css';

const queryClient = new QueryClient();

const meta: Meta<typeof GNB> = {
  title: 'Components/GNB',
  component: GNB,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '비로그인 상태의 GNB 컴포넌트 스토리입니다.',
      },
    },
  },
};

export default meta;

const loggedOutDecorator: Decorator = (Story) => {
  useUserStore.setState({
    user: null,
    accessToken: null,
    refreshToken: null,
    isGoogleLogin: false,
    isKakaoLogin: false,
  });
  useTeamStore.setState({
    teamList: [],
    currentTeam: null,
    setTeamList: () => {},
    setCurrentTeam: () => {},
    clearTeam: () => {},
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  );
};

export const Desktop: StoryObj<typeof GNB> = {
  decorators: [loggedOutDecorator],
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  render: () => <GNB />,
};

export const Mobile: StoryObj<typeof GNB> = {
  decorators: [loggedOutDecorator],
  parameters: {
    viewport: {
      defaultViewport: 'mobile375',
      viewports: {
        mobile375: {
          name: 'Mobile 375',
          styles: {
            width: '375px',
            height: '740px',
          },
          type: 'mobile',
        },
      },
    },
  },
  render: () => <GNB />,
};
