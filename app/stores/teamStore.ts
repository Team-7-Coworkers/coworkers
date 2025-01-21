import { create } from 'zustand';

interface Team {
  id: string;
  name: string;
}

interface TeamState {
  teamList: Team[];
  currentTeam: Team | null;
  setTeamList: (teams: Team[]) => void; // 팀 목록을 설정하는 함수
  setCurrentTeam: (teamId: string) => void; // 현재 선택된 팀을 설정하는 함수
}

const useTeamStore = create<TeamState>((set, get) => ({
  teamList: [],
  currentTeam: null,

  setTeamList: (teams) => set({ teamList: teams }),
  // 팀 목록을 상태에 저장하는 함수

  setCurrentTeam: (teamId) => {
    // 팀 ID를 기반으로 현재 팀을 설정하는 함수
    const selectedTeam = get().teamList.find((team) => team.id === teamId);
    // 팀 목록에서 주어진 ID와 일치하는 팀을 찾음

    set({ currentTeam: selectedTeam || null });
    // 찾은 팀을 상태의 currentTeam에 저장, 없으면 null로 설정
  },
}));

export default useTeamStore;

// 사용 예시
// const { teamList, currentTeam, setTeamList, setCurrentTeam } = useTeamStore();
