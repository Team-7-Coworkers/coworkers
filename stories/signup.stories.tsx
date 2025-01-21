import { Meta, StoryObj } from '@storybook/react';
import SignupPage from '@/app/signup/page';

const meta: Meta<typeof SignupPage> = {
  title: 'Pages/signup',
  component: SignupPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof SignupPage>;

// 기본 스토리
export const Default: Story = {};
