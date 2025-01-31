import { GroupType } from '@/app/types/shared';
import { redirect } from 'next/navigation';
import { ChangeEvent } from 'react';

interface TeamListDropDownProps {
  teamList: GroupType[];
  currentTeam?: GroupType;
}

export default function TeamListDropDown({
  teamList,
  currentTeam,
}: TeamListDropDownProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    redirect(`/${e.target.value}`);
  };

  return (
    <>
      <div className="relative hidden sm:block">
        <select
          className="cursor-pointer bg-transparent outline-none"
          value={currentTeam?.id || ''}
          onChange={handleChange}
        >
          {teamList.map((team) => (
            <option
              key={team.id}
              className="bg-b-secondary"
              value={team.id}
            >
              {team.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
