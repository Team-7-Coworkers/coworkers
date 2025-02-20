import type { Meta, StoryObj } from '@storybook/react';
import CustomCalendar from '@/app/[teamid]/tasklist/CustomCalendar';
import { useState } from 'react';

type CustomCalendarProps = React.ComponentProps<typeof CustomCalendar>;

const meta: Meta<typeof CustomCalendar> = {
  title: 'Components/CustomCalendar',
  component: CustomCalendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selectedDate: {
      control: 'date',
    },
    onDateSelect: { action: 'date selected' },
  },
};

export default meta;
type Story = StoryObj<typeof CustomCalendar>;

const DefaultCalendar = (args: CustomCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <CustomCalendar
      {...args}
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
    />
  );
};

export const Default: Story = {
  render: (args) => <DefaultCalendar {...args} />,
};
