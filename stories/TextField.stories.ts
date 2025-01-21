import TextField from './TextField';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['box', 'reply'],
    },
    placeholder: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
    },
  },
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Box: Story = {
  args: {
    type: 'box',
    placeholder: '댓글을 입력해주세요.',
    value: '',
  },
};

export const Reply: Story = {
  args: {
    type: 'reply',
    placeholder: '댓글을 입력해주세요.',
    value: '',
  },
};
