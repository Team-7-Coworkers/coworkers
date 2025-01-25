import { useState } from 'react';
import Image from 'next/image';

import { cn } from '../libs/utils';

import Modal, { ModalFooter } from '../components/Modal';
import MemberListItem from './MemberListItem';
import Button from '../components/Button';

import styles from './teampage.module.css';

export type MemberProps = {
  userId: number;
  userImage: string;
  userName: string;
  userEmail: string;
};

interface Props {
  members: MemberProps[];
  role: string;
}

export default function MemberList({ members, role }: Props) {
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [memberIdx, setMemberIdx] = useState<number>(0);

  const handleMemberClick = (userId: number) => {
    setMemberModalOpen(true);
    setMemberIdx(members.findIndex((member) => member.userId === userId));
  };

  const handleEmailCopyClick = () => {
    const email = members[memberIdx].userEmail;
    navigator.clipboard.writeText(email);
    // TODO: 복사 되었다고 alert 대신 토스트 뛰우기
    alert('이메일이 복사되었습니다.');
    setMemberModalOpen(false);
  };

  const handleLinkCopyClick = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    // TODO: 복사 되었다고 alert 대신 토스트 뛰우기
    alert('링크가 복사되었습니다.');
    setAddMemberModalOpen(false);
  };

  return (
    <>
      <section className={styles.section}>
        <header className={styles.sectionheader}>
          <h2 className={styles.title}>멤버</h2>
          <span className="ml-2 text-lg text-t-default">
            ({members.length}명)
          </span>

          {role === 'admin' && (
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
            <Image
              src={
                members[memberIdx].userImage ||
                '/images/icons/icon-base-user.svg'
              }
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
