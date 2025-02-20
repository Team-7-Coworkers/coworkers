import type { Meta, StoryObj } from '@storybook/react';

import CircleGraph from '@app/[teamid]/CircleGraph';

const meta = {
  title: 'Components/CircleGraph',
  component: CircleGraph,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '원형 그래프 컴포넌트',
      },
    },
  },
} satisfies Meta<typeof CircleGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 비율값이 없으면 0으로 표시
 */
export const Basic: Story = {
  args: {},
};

/**
 * 비율값 0.3 설정
 */
export const RateProp: Story = {
  args: {
    rate: 0.3,
  },
};

/**
 * 클래스 이용하여 사이즈 조절 (100px, 비율 1)
 */
export const ClassnameProp: Story = {
  args: {
    rate: 1,
    classnames: 'size-[100px]',
  },
};
