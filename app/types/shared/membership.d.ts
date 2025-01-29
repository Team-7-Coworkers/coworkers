import { GroupType } from './group';

export type Role = 'ADMIN' | 'MEMBER';

export interface MemberShipType {
  group: GroupType;
  role: Role;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}
