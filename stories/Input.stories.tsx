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
    state: {
      control: 'select',
      options: ['default', 'default-disabled'],
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
    // errorMessage: '유효하지 않은 입력입니다.',
  },
};

export const WithErrorMessage: Story = {
  args: {
    type: 'email',
    placeholder: '이메일을 입력하세요.',
    value: '',
    errorMessage: '유효한 이메일이 아닙니다.',
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요.',
    value: '',
    isPassword: true,
    errorMessage: '비밀번호를 입력해주세요.',
  },
};

export const TestPasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요.',
    value: '12341234',
    isPassword: true,
    errorMessage: '',
  },
};

export const DisabledEmailInput: Story = {
  args: {
    type: 'email',
    placeholder: '이메일을 입력하세요.',
    value: '',
    errorMessage: '',
    state: 'default-disabled',
  },
};

export const DisabledPasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: '입력이 비활성화되었습니다.',
    value: '12341234',
    isPassword: true,
    errorMessage: '',
    state: 'default-disabled',
    children: (
      <button
        type="button"
        className="bg-primary text-sm text-white hover:underline"
        onClick={() => alert('변경하기 버튼 클릭')}
      >
        변경하기
      </button>
    ),
  },
};
