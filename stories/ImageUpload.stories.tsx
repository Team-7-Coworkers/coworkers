import type { Meta, StoryObj } from '@storybook/react';
import ImageUpload from '@/app/components/ImageUpload';

const MOCK_IMAGE_URL =
  'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1314/images.jpg';

const meta: Meta<typeof ImageUpload> = {
  title: 'Components/ImageUpload',
  component: ImageUpload,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['circle', 'square'], // 'circle'과 'square' 선택 가능
    },
    onUploadSuccess: { action: 'uploaded' }, // 업로드 성공 이벤트
    onUploadError: { action: 'upload error' }, // 업로드 실패 이벤트
  },
  parameters: {
    viewport: {
      viewports: {
        small: {
          name: 'Small (320px)',
          styles: {
            width: '320px',
            height: '640px',
          },
        },
        medium: {
          name: 'Medium (768px)',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        large: {
          name: 'Large (1024px)',
          styles: {
            width: '1024px',
            height: '1280px',
          },
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageUpload>;

// Circle 버전
export const Circle: Story = {
  args: {
    variant: 'circle',
  },
  parameters: {
    viewport: {
      defaultViewport: 'small',
    },
  },
};

// Square 버전
export const Square: Story = {
  args: {
    variant: 'square',
  },
  parameters: {
    viewport: {
      defaultViewport: 'medium',
    },
  },
};

// Circle with Preview
export const CircleWithMockPreview: Story = {
  args: {
    variant: 'circle',
    url: MOCK_IMAGE_URL,
    onUploadSuccess: (url: string) => console.log('업로드 성공:', url),
    onUploadError: (error: Error) => console.error('업로드 실패:', error),
  },
  parameters: {
    viewport: {
      defaultViewport: 'large',
    },
  },
};

// Square with Preview
export const SquareWithMockPreview: Story = {
  args: {
    variant: 'square',
    url: MOCK_IMAGE_URL,
    onUploadSuccess: (url: string) => console.log('업로드 성공:', url),
    onUploadError: (error: Error) => console.error('업로드 실패:', error),
  },
  parameters: {
    viewport: {
      defaultViewport: 'medium',
    },
  },
};
