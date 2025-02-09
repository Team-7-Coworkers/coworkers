import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { cn } from '../libs/utils';
import { getGroupsInvitation } from '../api/group.api';

import Modal, { ModalFooter } from '../components/Modal';
import MemberListItem from './MemberListItem';
import Button from '../components/Button';

import styles from './teampage.module.css';
import Img from '../components/Img';

export type MemberProps = {
  userId: number;
  userImage: string;
  userName: string;
  userEmail: string;
};

interface Props {
  /** 그룹 아이디 */
  groupId: number;
  /** 멤버 목록 */
  members: MemberProps[];
  /** 관리자 기능 처리 */
  role: string;
}

export default function MemberList({ groupId, members, role }: Props) {
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [memberIdx, setMemberIdx] = useState<number>(0);
  const { refetch } = useQuery({
    queryKey: ['getLinkToken', groupId],
    queryFn: async () => await getGroupsInvitation({ groupId }),
    enabled: false,
  });

  // 멤버 상세 모달 이지만, 보이는 정보는 같음..;;;
  const handleMemberClick = (userId: number) => {
    setMemberModalOpen(true);
    setMemberIdx(members.findIndex((member) => member.userId === userId));
  };

  // 이메일 복사 버튼 클릭 함수
  const handleEmailCopyClick = () => {
    const email = members[memberIdx].userEmail;
    navigator.clipboard.writeText(email);
    // TODO: 복사 되었다고 alert 대신 토스트 뛰우기
    alert('이메일이 복사되었습니다.');
    setMemberModalOpen(false);
  };

  // 멤버 초대 링크 복사 버튼 클릭 함수
  const handleLinkCopyClick = async () => {
    const { data: token, isError } = await refetch();
    // console.log('--- handleLinkCopyClick:result:', token);

    if (isError) {
      // TODO: 복사 실패 alert 대신 토스트 뛰우기
      alert('링크 복사에 실패 하였습니다. 잠시 후 다시 시도해 주세요.');
    } else {
      // TODO: 문서나 UI로는 정확한 프로세스가 확인이 안됨
      const url = window.location.origin + '/invitation?t=' + token;
      navigator.clipboard.writeText(url);
      // TODO: 복사 되었다고 alert 대신 토스트 뛰우기
      alert('링크가 복사되었습니다.');
      setAddMemberModalOpen(false);
    }
  };

  return (
    <>
      <section className={styles.section}>
        <header className={styles.sectionheader}>
          <h2 className={styles.title}>멤버</h2>
          <span className="ml-2 text-lg text-t-default">
            ({members.length}명)
          </span>

          {role === 'ADMIN' && (
            <button
              className="text-button ml-auto text-md"
              onClick={() => setAddMemberModalOpen(true)}
            >
              + 새로운 멤버 초대하기
            </button>
          )}
        </header>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {members.map((member) => (
            <MemberListItem
              key={member.userId}
              userId={member.userId}
              userImage={member.userImage}
              userName={member.userName}
              userEmail={member.userEmail}
              onClick={handleMemberClick}
            />
          ))}
        </ul>
      </section>

      <Modal
        isOpen={memberModalOpen}
        onClose={() => setMemberModalOpen(false)}
      >
        <div className="flex flex-col items-center gap-6">
          <figure className={cn(styles.memberFigure, 'size-14')}>
            <Img
              src={members[memberIdx].userImage}
              baseImage="/images/icons/icon-base-user.svg"
              width="40"
              height="40"
              alt=""
              className="mx-auto"
            />
          </figure>
          <div className="text-center">
            <div className="text-md font-medium text-t-primary">
              {members[memberIdx].userName}
            </div>
            <div className="mt-2 text-xs">{members[memberIdx].userEmail}</div>
          </div>
        </div>

        <ModalFooter>
          <Button onClick={handleEmailCopyClick}>이메일 복사하기</Button>
        </ModalFooter>
      </Modal>

      <Modal
        title="멤버 초대"
        isOpen={addMemberModalOpen}
        onClose={() => setAddMemberModalOpen(false)}
      >
        <div className="text-center">
          그룹에 참여할 수 있는 링크를 복사합니다.
        </div>

        <ModalFooter>
          <Button onClick={handleLinkCopyClick}>링크 복사하기</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
