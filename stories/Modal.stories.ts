import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Modal from '@/app/components/Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    isOpen: true,
    onClose: fn(),
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: '모달 타이틀',
    children: '모달 바디',
  },
};
