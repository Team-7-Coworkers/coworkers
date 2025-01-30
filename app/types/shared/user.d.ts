export interface UserProfileType {
  image: string | null;
  nickname: string;
  id: number;
}

export interface UserType {
  id: number;
  email: string;
  nickname: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
  teamId: string;
}
