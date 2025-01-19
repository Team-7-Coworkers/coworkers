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
    text: 'Solid Default',
    styleType: 'solid',
    state: 'default',
  },
};

export const SolidFloating: Story = {
  args: {
    text: 'Solid Floating',
    styleType: 'solid',
    state: 'floating',
  },
};

export const Danger: Story = {
  args: {
    text: 'Danger',
    styleType: 'solid',
    state: 'danger',
  },
};

export const OutlinedDefault: Story = {
  args: {
    text: 'Outlined Default',
    styleType: 'outlined',
    state: 'default',
  },
};

export const OutlinedSecondary: Story = {
  args: {
    text: 'Outlined Secondary',
    styleType: 'outlined-secondary',
    state: 'default',
  },
};

export const DisabledSolid: Story = {
  args: {
    text: 'Disabled Solid',
    styleType: 'solid',
    state: 'default',
    disabled: true,
  },
};

export const DisabledOutlined: Story = {
  args: {
    text: 'Disabled Outlined',
    styleType: 'outlined',
    state: 'default',
    disabled: true,
  },
};

export const XSmall: Story = {
  args: {
    text: 'XSmall',
    styleType: 'solid',
    state: 'default',
    size: 'X-small',
  },
};

export const CustomSize: Story = {
  args: {
    text: 'Custom Size',
    styleType: 'solid',
    state: 'default',
    size: 'w-[200px] h-[60px] rounded-[14px]',
  },
};
