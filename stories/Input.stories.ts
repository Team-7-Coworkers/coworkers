import type { Meta, StoryObj } from '@storybook/react';
import InputField from '../app/components/InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/Input',
  component: InputField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email'],
    },
    placeholder: {
      control: 'text',
    },
    errorMessage: {
      control: 'text',
    },
    isPassword: {
      control: 'boolean',
    },
    value: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: '기본 인풋입니다.',
    value: '',
    className: '',
  },
};

export const WithErrorMessage: Story = {
  args: {
    type: 'email',
    placeholder: '이메일을 입력하세요.',
    value: 'codeit@codeit.com',
    errorMessage: '유효한 이메일 주소를 입력해주세요.',
    className: 'w-[460px] h-[48px]',
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요.',
    value: '',
    isPassword: true,
    className: 'w-[460px] h-[48px]',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    type: 'text',
    placeholder: '커스텀 플레이스홀더',
    value: '',
  },
};

export const FilledValue: Story = {
  args: {
    type: 'text',
    placeholder: '값이 입력된 인풋',
    value: '미리 입력된 값',
  },
};

export const SmallInput: Story = {
  args: {
    type: 'text',
    placeholder: '작은 입력 필드',
    className: 'w-64 h-10',
  },
};
