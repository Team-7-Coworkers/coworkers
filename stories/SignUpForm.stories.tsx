import type { Meta, StoryObj } from '@storybook/react';
import SignupForm from '@/app/signup/SignupForm';

const meta: Meta<typeof SignupForm> = {
  title: 'Components/SignupForm',
  component: SignupForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    description: {
      story: '회원가입 폼 컴포넌트입니다.',
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof SignupForm>;

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
    const SignupFormStory = () => {
      const handleSubmit = (formData: {
        nickname: string;
        email: string;
        password: string;
        confirmPassword: string;
      }) => {
        alert(
          `Submitted:\nNickname: ${formData.nickname}\nEmail: ${formData.email}\nPassword: ${formData.password}\nConfirm Password: ${formData.confirmPassword}`
        );
      };

      return (
        <StoryContainer>
          <SignupForm onSubmit={handleSubmit} />
        </StoryContainer>
      );
    };

    return <SignupFormStory />;
  },
};

export const ValidInput: Story = {
  args: {},
  render: () => {
    const SignupFormStory = () => {
      const initialFormData = {
        nickname: 'example',
        email: 'example@example.com',
        password: 'example1!',
        confirmPassword: 'example1!',
      };
      const handleSubmit = (formData: {
        nickname: string;
        email: string;
        password: string;
        confirmPassword: string;
      }) => {
        alert(
          `Submitted:\nNickname: ${formData.nickname}\nEmail: ${formData.email}\nPassword: ${formData.password}\nConfirm Password: ${formData.confirmPassword}`
        );
      };

      return (
        <StoryContainer>
          <SignupForm
            initialFormData={initialFormData}
            onSubmit={handleSubmit}
          />
        </StoryContainer>
      );
    };

    return <SignupFormStory />;
  },
};

export const InvalidInput: Story = {
  args: {},
  render: () => {
    const SignupFormStory = () => {
      const initialFormData = {
        nickname: 'invalid',
        email: 'invalidinvalid',
        password: 'invalid',
        confirmPassword: 'invalid',
      };

      const handleSubmit = (formData: {
        nickname: string;
        email: string;
        password: string;
        confirmPassword: string;
      }) => {
        alert(
          `Submitted:\nNickname: ${formData.nickname}\nEmail: ${formData.email}\nPassword: ${formData.password}\nConfirm Password: ${formData.confirmPassword}`
        );
      };

      return (
        <StoryContainer>
          <SignupForm
            initialFormData={initialFormData}
            onSubmit={handleSubmit}
          />
        </StoryContainer>
      );
    };

    return <SignupFormStory />;
  },
};
