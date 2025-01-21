interface TeamListDropDownProps {
  option?: { id: number; name: string }[];
  onSelect?: (value: string) => void;
}

export const mockTeamList = [
  { id: 1, name: '경영관리팀' },
  { id: 2, name: '프로덕트팀' },
  { id: 3, name: '마케팅팀' }
];

export default function TeamListDropDown({
  option = mockTeamList
}: TeamListDropDownProps) {
  return (
    <>
      <div className="relative hidden sm:block">
        <select
          className="cursor-pointer bg-transparent outline-none"
          defaultValue={option[2].name} // currentTeam이 default로
        >
          {option.map((team) => (
            <option
              key={team.id}
              className="bg-b-secondary"
            >
              {team.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
