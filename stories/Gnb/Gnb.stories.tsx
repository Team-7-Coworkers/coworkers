import { Meta, StoryObj } from '@storybook/react';
import GNB from '@/app/components/Gnb';

const meta: Meta<typeof GNB> = {
  title: 'Components/GNB',
  tags: ['autodocs'],
  component: GNB,
};

export default meta;

type Story = StoryObj<typeof GNB>;

export const NavBar: Story = {};
