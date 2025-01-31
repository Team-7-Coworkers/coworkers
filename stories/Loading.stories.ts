import type { Meta, StoryObj } from '@storybook/react';

import Loading from '@/app/components/Loading';

const meta = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '로딩 컴포넌트',
      },
    },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 사용 방법
 */
export const Basic: Story = {
  args: {},
};

/**
 * 텍스트 값 사용
 */
export const TextProp: Story = {
  args: {
    text: '조립중...',
  },
};

/**
 * 클래스 이용하여 색상 변경
 */
export const ClassnameProp: Story = {
  args: {
    classname: 'text-purple',
  },
};
