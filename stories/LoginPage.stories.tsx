import { Meta, StoryObj } from '@storybook/react';
import LoginPage from '@/app/login/page';

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/login',
  component: LoginPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof LoginPage>;

export const Empty: Story = {};
