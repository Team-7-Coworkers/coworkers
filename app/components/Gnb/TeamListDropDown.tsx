import { GroupType } from '@/app/types/shared';
import { redirect } from 'next/navigation';
import TeamListDropDownItem from './TeamListDropDownItem';
import Dropdown from '../Dropdown';

interface TeamListDropDownProps {
  teamList: GroupType[];
  currentTeam?: GroupType;
}

export default function TeamListDropDown({
  teamList,
  currentTeam,
}: TeamListDropDownProps) {
  const handleClick = (teamId: number) => {
    redirect(`/${teamId}`);
  };

  return (
    <Dropdown>
      <Dropdown.Button>{currentTeam?.name || ''} ▾</Dropdown.Button>

      <Dropdown.Menu
        animationType="scale"
        className="top-[52px] z-30 w-56 pb-4 sm:-left-[144px] lg:-left-[200px]"
      >
        {teamList.map((team) => {
          return (
            <Dropdown.MenuItem
              key={team.id}
              onClick={() => handleClick(team.id)}
            >
              <TeamListDropDownItem team={team} />
            </Dropdown.MenuItem>
          );
        })}
        <button
          className="m-auto block w-[186px] rounded-xl border-[1px] border-slate-50 py-3.5 text-lg font-medium transition-all hover:scale-95 hover:opacity-70"
          onClick={() => redirect('/addteam')}
        >
          + 팀 추가하기
        </button>
      </Dropdown.Menu>
    </Dropdown>
  );
}
