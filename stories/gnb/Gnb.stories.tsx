import { Meta, StoryObj } from '@storybook/react';
import GNB from '@components/gnb/Gnb';

const meta: Meta<typeof GNB> = {
  title: 'Components/GNB',
  component: GNB,
};

export default meta;

type Story = StoryObj<typeof GNB>;

export const Default: Story = {};
