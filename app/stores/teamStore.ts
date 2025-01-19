import { create } from 'zustand';

interface Team {
  id: string;
  name: string;
}

interface TeamState {
  teamList: Team[];
  currentTeam: Team | null;
  setTeamList: (teams: Team[]) => void;
  setCurrentTeam: (teamId: string) => void;
}

const useTeamStore = create<TeamState>((set, get) => ({
  teamList: [],
  currentTeam: null,
  setTeamList: (teams) => set({ teamList: teams }),
  setCurrentTeam: (teamId) => {
    const selectedTeam = get().teamList.find((team) => team.id === teamId);
    set({ currentTeam: selectedTeam || null });
  },
}));

export default useTeamStore;
