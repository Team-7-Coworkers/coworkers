import Image from 'next/image';

interface FrequencyDisplayProps {
  frequency: string;
}

const frequencyMap: { [key: string]: string } = {
  ONCE: '한 번',
  DAILY: '매일 반복',
  WEEKLY: '주 반복',
  MONTHLY: '월 반복',
};

const getFormattedFrequency = (frequency: string): string => {
  return frequencyMap[frequency];
};

interface FrequencyDisplayProps {
  frequency: string;
}

const FrequencyDisplay = ({ frequency }: FrequencyDisplayProps) => {
  const formattedFrequency = getFormattedFrequency(frequency);

  return (
    <div className="flex items-center gap-2">
      {formattedFrequency !== '한 번' && (
        <Image
          src="/images/icons/ic_repeat.svg"
          alt="반복"
          width={16}
          height={16}
        />
      )}
      <p className="text-xs text-t-default">{formattedFrequency}</p>
    </div>
  );
};

export default FrequencyDisplay;
