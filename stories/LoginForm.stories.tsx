import type { Meta, StoryObj } from '@storybook/react';
import LoginForm from '@/app/login/LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Components/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    description: {
      story: '로그인 폼 컴포넌트입니다.',
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

function StoryContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-b-primary px-4 py-6 sm:pt-[100px]">
      <div className="w-full max-w-[460px] sm:pt-[80px]">{children}</div>
    </div>
  );
}

export const Default: Story = {
  args: {},
  render: () => {
    const LoginFormStory = () => {
      const handleSubmit = (formData: { email: string; password: string }) => {
        alert(
          `Submitted:\nEmail: ${formData.email}\nPassword: ${formData.password}`
        );
      };

      return (
        <StoryContainer>
          <LoginForm onSubmit={handleSubmit} />
        </StoryContainer>
      );
    };

    return <LoginFormStory />;
  },
};

export const ValidInput: Story = {
  args: {},
  render: () => {
    const LoginFormStory = () => {
      const initialFormData = {
        email: 'example@example.com',
        password: 'example1!',
      };

      const handleSubmit = (formData: { email: string; password: string }) => {
        alert(
          `Submitted:\nEmail: ${formData.email}\nPassword: ${formData.password}`
        );
      };

      return (
        <StoryContainer>
          <LoginForm
            initialFormData={initialFormData}
            onSubmit={handleSubmit}
          />
        </StoryContainer>
      );
    };

    return <LoginFormStory />;
  },
};

export const InvalidInput: Story = {
  args: {},
  render: () => {
    const initialFormData = {
      email: 'invalide',
      password: 'invalid',
    };

    const LoginFormStory = () => {
      const handleSubmit = (formData: { email: string; password: string }) => {
        alert(
          `Submitted:\nEmail: ${formData.email}\nPassword: ${formData.password}`
        );
      };

      return (
        <StoryContainer>
          <LoginForm
            initialFormData={initialFormData}
            onSubmit={handleSubmit}
          />
        </StoryContainer>
      );
    };

    return <LoginFormStory />;
  },
};
