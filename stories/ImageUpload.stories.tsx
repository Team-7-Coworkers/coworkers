import type { Meta, StoryObj } from '@storybook/react';
import ImageUpload from '@/app/components/ImageUpload';

const meta: Meta<typeof ImageUpload> = {
  title: 'Components/ImageUpload',
  component: ImageUpload,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['circle', 'square'],
    },
    onUploadSuccess: { action: 'uploaded' },
    onUploadError: { action: 'upload error' },
  },
};

export default meta;

type Story = StoryObj<typeof ImageUpload>;

export const Circle: Story = {
  args: {
    variant: 'circle',
  },
};

export const Square: Story = {
  args: {
    variant: 'square',
  },
};

export const CircleWithPreview: Story = {
  args: {
    variant: 'circle',
    onUploadSuccess: (url: string) => console.log('업로드 성공:', url),
    onUploadError: (error: Error) => console.error('업로드 실패:', error),
  },
};

export const SquareWithPreview: Story = {
  args: {
    variant: 'square',
    onUploadSuccess: (url: string) => console.log('업로드 성공:', url),
    onUploadError: (error: Error) => console.error('업로드 실패:', error),
  },
};
