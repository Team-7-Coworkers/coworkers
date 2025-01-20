import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    styleType: {
      control: 'select',
      options: ['solid', 'outlined', 'outlined-secondary'],
    },
    state: {
      control: 'select',
      options: ['default', 'danger', 'floating'],
    },
    size: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const SolidDefault: Story = {
  args: {
    children: 'Solid Default',
    styleType: 'solid',
    state: 'default',
  },
};

export const SolidFloating: Story = {
  args: {
    children: 'Solid Floating',
    styleType: 'solid',
    state: 'floating',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <div className="flex items-center w-[125px] justify-center">
        <span className="mr-2">+</span> 할 일 추가
      </div>
    ),
    styleType: 'solid',
    state: 'floating',
    size: 'h-[48px]',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger',
    styleType: 'solid',
    state: 'danger',
  },
};

export const OutlinedDefault: Story = {
  args: {
    children: 'Outlined Default',
    styleType: 'outlined',
    state: 'default',
  },
};

export const OutlinedSecondary: Story = {
  args: {
    children: 'Outlined Secondary',
    styleType: 'outlined-secondary',
    state: 'default',
  },
};

export const DisabledSolid: Story = {
  args: {
    children: 'Disabled Solid',
    styleType: 'solid',
    state: 'default',
    disabled: true,
  },
};

export const DisabledOutlined: Story = {
  args: {
    children: 'Disabled Outlined',
    styleType: 'outlined',
    state: 'default',
    disabled: true,
  },
};

export const XSmall: Story = {
  args: {
    children: 'XSmall',
    styleType: 'solid',
    state: 'default',
    size: 'X-small',
  },
};

export const CustomSize: Story = {
  args: {
    children: 'Custom Size',
    styleType: 'solid',
    state: 'default',
    size: 'w-[200px] h-[60px] rounded-[14px]',
  },
};
