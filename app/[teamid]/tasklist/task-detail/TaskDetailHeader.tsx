'use client';

import KebobDropdown from '../KebobDropdown';
import CheckIcon from '../CheckIcon';
import { TaskType } from '@/app/types/shared';
import DateDisplay from '../info-displays/DateDisplay';
import FrequencyDisplay from '../info-displays/FrequencyDisplay';
import UserProfile from './UserProfile';

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
      <div className="mt-4">
        <UserProfile
          image={task.writer.image}
          nickname={task.writer.nickname}
        />
      </div>
      {/* TODO: 날짜 데이터 변경 고려 */}
      <div className="mt-3 flex items-center gap-3">
        <DateDisplay date={task.date} />
        <div className="text-xs text-b-tertiary">|</div>
        <FrequencyDisplay frequency={task.frequency} />
      </div>
    </>
  );
}
