import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { cn, copyToClipboard } from '../libs/utils';
import { deleteGroupsMember, getGroupsInvitation } from '../api/group.api';

import Modal, { ModalFooter } from '../components/Modal';
import MemberListItem from './MemberListItem';
import Button from '../components/Button';

import styles from './teampage.module.css';
import Img from '../components/Img';
import Link from 'next/link';

export type MemberProps = {
  userId: number;
  userImage: string;
  userName: string;
  userEmail: string;
  role: string;
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
  const [memberModal, setMemberModal] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [dropMemberModal, setDropMemberModal] = useState(false);
  const [memberIdx, setMemberIdx] = useState(0);
  const [userId, setUserId] = useState(0);

  const queryClient = useQueryClient();
  const { refetch } = useQuery({
    queryKey: ['getLinkToken', groupId],
    queryFn: async () => await getGroupsInvitation({ groupId }),
    enabled: false,
  });
  const { mutate } = useMutation({
    mutationFn: async (userId: number) =>
      await deleteGroupsMember({ memberUserId: userId, groupId }),
    onSuccess: () => {
      // console.log('success', data);
      setDropMemberModal(false);
      queryClient.invalidateQueries({ queryKey: ['getGroupsById'] });
    },
    onError: (err) => {
      console.error('--- error', err);
      setDropMemberModal(false);
      alert('멤버 제외에 문제가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
    },
  });

  // 멤버 상세 모달
  const handleDetailClick = (userId: number) => {
    setMemberIdx(members.findIndex((member) => member.userId === userId));
    setMemberModal(true);
  };

  // 멤버 제외 모달
  const handleDeleteClick = (userId: number) => {
    setDropMemberModal(true);
    setUserId(userId);
  };

  // 멤버 제외
  const handleDropMember = () => {
    mutate(userId);
  };

  // 이메일 복사 버튼 클릭 함수
  const handleEmailCopyClick = () => {
    const email = members[memberIdx].userEmail;
    copyToClipboard(
      email,
      '이메일을 복사하였습니다.',
      '이메일 복사에 실패하였습니다. 잠시 후 다시 시도해 주세요.'
    );
  };

  // 멤버 초대 링크 복사 버튼 클릭 함수
  const handleLinkCopyClick = async () => {
    const { data: token, isError } = await refetch();
    // console.log('--- handleLinkCopyClick:result:', token);

    if (isError) {
      toast.error('링크 복사에 실패 하였습니다. 잠시 후 다시 시도해 주세요.');
    } else {
      const url = window.location.origin + '/invitation?t=' + token;
      copyToClipboard(
        url,
        '링크가 복사되었습니다.',
        '링크 복사에 실패 하였습니다. 잠시 후 다시 시도해 주세요.'
      );
      // setAddMemberModal(false);
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
              onClick={() => setAddMemberModal(true)}
            >
              + 새로운 멤버 초대하기
            </button>
          )}
        </header>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {members.map((member) => (
            <MemberListItem
              key={member.userId}
              {...member}
              editable={role === 'ADMIN'}
              onDetailClick={handleDetailClick}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </ul>
      </section>

      <Modal
        isOpen={memberModal}
        onClose={() => setMemberModal(false)}
        isCloseOutsideClick
      >
        <div className="flex flex-col items-center gap-6">
          <figure className={cn(styles.memberFigure, 'size-14')}>
            <Img
              src={members[memberIdx].userImage}
              baseImage="/images/icons/icon-base-user.svg"
              width={members[memberIdx].userImage ? 54 : 40}
              height={members[memberIdx].userImage ? 54 : 40}
              alt=""
              className={cn(
                members[memberIdx].userImage && 'size-[54px]',
                'mx-auto rounded-full object-cover'
              )}
            />
          </figure>
          <div className="text-center">
            <div className="text-md font-medium text-t-primary">
              {members[memberIdx].userName}
            </div>
            <Link
              href={`mailto:${members[memberIdx].userEmail}`}
              className="mt-2 text-xs hover:underline"
            >
              {members[memberIdx].userEmail}
            </Link>
          </div>
        </div>

        <ModalFooter>
          <Button onClick={handleEmailCopyClick}>이메일 복사하기</Button>
        </ModalFooter>
      </Modal>

      <Modal
        title="멤버 초대"
        isOpen={addMemberModal}
        onClose={() => setAddMemberModal(false)}
        isCloseOutsideClick
      >
        <div className="text-center">
          그룹에 참여할 수 있는 링크를 복사합니다.
        </div>

        <ModalFooter>
          <Button onClick={handleLinkCopyClick}>링크 복사하기</Button>
        </ModalFooter>
      </Modal>

      <Modal
        title="멤버 제외"
        isOpen={dropMemberModal}
        onClose={() => setDropMemberModal(false)}
        icon="danger"
      >
        <div className="text-center">해당 멤버를 제외 하시겠습니까?</div>

        <ModalFooter>
          <Button
            onClick={() => setDropMemberModal(false)}
            styleType="outlined"
          >
            취소
          </Button>
          <Button
            onClick={handleDropMember}
            state="danger"
          >
            제외
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
