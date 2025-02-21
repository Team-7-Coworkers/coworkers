import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from '../app/components/Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    description: {
      story: '드롭다운 컴포넌트입니다.',
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {},
  render: () => {
    const DropDownStoryBook = () => {
      return (
        <Dropdown>
          <Dropdown.Button>드롭다운 버튼</Dropdown.Button>
          <Dropdown.Menu
            className="right-0 top-[30px]"
            animationType={undefined}
          >
            <Dropdown.MenuItem onClick={() => alert('한 번 clicked')}>
              한 번
            </Dropdown.MenuItem>
            <Dropdown.MenuItem onClick={() => alert('매일 clicked')}>
              매일
            </Dropdown.MenuItem>
            <Dropdown.MenuItem onClick={() => alert('주 반복 clicked')}>
              주 반복
            </Dropdown.MenuItem>
            <Dropdown.MenuItem onClick={() => alert('월 반복 clicked')}>
              월 반복
            </Dropdown.MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      );
    };

    return <DropDownStoryBook />;
  },
};

export const WithScaleAnimation: Story = {
  args: {},
  render: () => {
    const DropDownStoryBook = () => {
      return (
        <Dropdown>
          <Dropdown.Button>드롭다운 버튼</Dropdown.Button>
          <Dropdown.Menu
            className="right-0 top-[30px] text-center"
            animationType="scale"
          >
            <Dropdown.MenuItem
              onClick={() => console.log('마이 히스토리 clicked')}
            >
              마이 히스토리
            </Dropdown.MenuItem>
            <Dropdown.MenuItem onClick={() => console.log('계정 설정 clicked')}>
              계정 설정
            </Dropdown.MenuItem>
            <Dropdown.MenuItem onClick={() => console.log('팀 참여 clicked')}>
              팀 참여
            </Dropdown.MenuItem>
            <Dropdown.MenuItem onClick={() => console.log('로그아웃 clicked')}>
              로그아웃
            </Dropdown.MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      );
    };

    return <DropDownStoryBook />;
  },
};

export const WithSlideAnimation: Story = {
  args: {},
  render: () => {
    const DropDownStoryBook = () => {
      return (
        <Dropdown>
          <Dropdown.Button>드롭다운 버튼</Dropdown.Button>
          <Dropdown.Menu
            className="left-[-4px] top-[30px]"
            animationType="slide"
          >
            <Dropdown.MenuItem onClick={() => alert('한 번 clicked')}>
              한 번
            </Dropdown.MenuItem>
            <Dropdown.MenuItem onClick={() => alert('매일 clicked')}>
              매일
            </Dropdown.MenuItem>
            <Dropdown.MenuItem onClick={() => alert('주 반복 clicked')}>
              주 반복
            </Dropdown.MenuItem>
            <Dropdown.MenuItem onClick={() => alert('월 반복 clicked')}>
              월 반복
            </Dropdown.MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      );
    };

    return <DropDownStoryBook />;
  },
};
