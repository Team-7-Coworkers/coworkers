'use client';

import KebobDropdown from '../KebobDropdown';
import CheckIcon from '../CheckIcon';
import { TaskType } from '@/app/types/shared';
import DateDisplay from '../info-displays/DateDisplay';
import FrequencyDisplay from '../info-displays/FrequencyDisplay';

interface TaskHeaderProps {
  task: TaskType;
  isCompleted: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskDetailHeader({
  task,
  isCompleted,
  onEdit,
  onDelete,
}: TaskHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          {isCompleted && (
            <div className="flex items-center gap-2 text-xs font-semibold text-tertiary">
              <CheckIcon
                classname="w-4 h-4"
                color="#a3e635"
              />
              완료
            </div>
          )}
          <h2
            className={`mt-2 text-2lg font-bold ${isCompleted ? 'line-through' : ''}`}
          >
            {task.name}
          </h2>
        </div>
        <KebobDropdown
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
      {/*
        TODO: 글쓴이 프로필 추가하기 + 오른쪽의 날짜?는 뭔지 잘모르겠네요.

        시간은 어디는 있고 어디는 없는데...
        시간을 활용해서 할 수 있는 작업이 당장은 없어서 저번에 말씀드렸다시피
        후에 고려해보겠습니다!
      */}
      <div className="mt-3 flex items-center gap-3">
        <DateDisplay date={task.date} />
        <div className="text-xs text-b-tertiary">|</div>
        <FrequencyDisplay frequency={task.frequency} />
      </div>
    </>
  );
}
