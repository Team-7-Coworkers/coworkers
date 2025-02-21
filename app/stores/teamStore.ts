'use Client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GroupType } from '../types/shared';

interface TeamState {
  teamList: GroupType[];
  currentTeam: GroupType | null;
  setTeamList: (teams: GroupType[]) => void; // 팀 목록을 설정하는 함수
  setCurrentTeam: (teamId: number) => void; // 현재 선택된 팀을 설정하는 함수
  clearTeam: () => void;
}

const useTeamStore = create<TeamState>()(
  persist(
    (set, get) => ({
      teamList: [],
      currentTeam: null,

      setTeamList: (teams) => set({ teamList: teams }),
      // 팀 목록을 상태에 저장하는 함수

      setCurrentTeam: (teamId) => {
        // 팀 ID를 기반으로 현재 팀을 설정하는 함수
        const selectedTeam = get().teamList.find((team) => team.id === teamId);
        set({ currentTeam: selectedTeam || null });
      },

      // 팀 상태 초기화
      clearTeam: () => {
        set({ teamList: [], currentTeam: null });
      },
    }),
    {
      name: 'coworkers-team-storage', // 로컬 스토리지에 저장될 키 이름
      partialize: (state) => ({
        // 로컬 스토리지에 저장할 상태 선택
        teamList: state.teamList,
        currentTeam: state.currentTeam,
      }),
    }
  )
);

export default useTeamStore;

// 사용 예시
// const { teamList, currentTeam, setTeamList, setCurrentTeam, clearTeam } = useTeamStore();
