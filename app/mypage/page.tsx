'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useMutation } from '@tanstack/react-query';

import {
  deleteUser,
  getUser,
  patchUser,
  patchUserPassword,
} from '@api/user.api';
import { createErrorHandler } from '@utils/createErrorHandler';
import useUserStore from '@stores/userStore';
import useTeamStore from '@stores/teamStore';
import Button from '@components/Button';
import UpdatePasswordModal from '@app/mypage/UpdatePasswordModal';
import ConFirmSecessionModal from '@app/mypage/ConfirnSecessionModal';
import MyPageForm from '@app/mypage/MyPageForm';
import { toast } from 'react-toastify';

export interface PasswordFormDataTypes {
  password: string;
  confirmPassword: string;
}

export interface UserFormDataTypes {
  nickname: string;
  image: string;
}

export default function MyPage() {
  const { user, updateUser, clearUser } = useUserStore();
  const { clearTeam } = useTeamStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordUpdateModalOpen, setPasswordUpdateModalOpen] =
    useState(false);
  const [isSecessionModalOpen, setIsSecessionModalOpen] = useState(false);

  const router = useRouter();

  const initialFormData = {
    nickname: user?.nickname || '',
    image: user?.image || '',
  };

  const updateUserMuation = useMutation({
    mutationFn: patchUser,
    onSuccess: async () => {
      const { nickname, image } = await getUser();

      updateUser({ nickname, image });
      toast.success('계정 정보가 변경되었습니다.');
      setIsEditing(false);
    },
    onError: createErrorHandler({ prefixMessage: '계정 정보 변경 실패' }),
  });

  const updatePasswordMutation = useMutation({
    mutationFn: patchUserPassword,
    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다.');
    },
    onError: createErrorHandler({ prefixMessage: '비밀번호 변경 실패' }),
  });

  const deleteUserSelfMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      clearUser();
      clearTeam();

      toast('회원 탈퇴가 정상 처리되었습니다.');

      router.push('/');
    },
    onError: createErrorHandler({ prefixMessage: '회원 탈퇴 실패' }),
  });

  useEffect(() => {
    const { accessToken } = useUserStore.getState();

    if (!accessToken) {
      toast.error('로그인이 필요합니다!');
      router.push('/');
    }
  }, [router]);

  const handleUpdateUserInfo = (formData: UserFormDataTypes) => {
    const updatedParams: Partial<UserFormDataTypes> = {
      ...(user?.nickname !== formData.nickname && {
        nickname: formData.nickname,
      }),
      ...(user?.image !== formData.image && { image: formData.image }),
    };

    updateUserMuation.mutate(updatedParams);
  };

  const handleUpdatePassword = (formdata: PasswordFormDataTypes) => {
    const { password, confirmPassword } = formdata;

    updatePasswordMutation.mutate({
      password,
      passwordConfirmation: confirmPassword,
    });

    setPasswordUpdateModalOpen(false);
  };

  const handleDeleteUser = () => {
    deleteUserSelfMutation.mutate();
  };

  return (
    <div className="mx-auto max-w-[792px] space-y-8 px-4 pt-[6vh] sm:px-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-2lg">계정 설정</p>
          {!isEditing ? (
            <Button
              size="X-small"
              onClick={() => setIsEditing(true)}
            >
              편집
            </Button>
          ) : (
            <Button
              size="X-small"
              state="danger"
              onClick={() => setIsEditing(false)}
            >
              취소
            </Button>
          )}
        </div>
        <div className="border-t-[1px] border-gray-500 pb-2" />
        <MyPageForm
          initialFormData={initialFormData}
          isEditing={isEditing}
          onSubmit={handleUpdateUserInfo}
          user={user}
        />
      </div>

      <div className="flex h-10 items-center justify-between border-t-[1px] border-gray-500 pb-4 pt-10">
        <p>비밀번호 변경</p>
        <Button
          type="button"
          size="X-small"
          onClick={() => setPasswordUpdateModalOpen(true)}
          state="default"
          classname="text-xs"
          disabled={isEditing}
        >
          변경하기
        </Button>
      </div>

      <button
        className="flex items-center gap-2 hover:opacity-70"
        onClick={() => setIsSecessionModalOpen(true)}
      >
        <Image
          src="/images/icons/ic_secession.svg"
          width={24}
          height={24}
          alt=""
        />
        <p className="font-medium text-danger">회원 탈퇴하기</p>
      </button>

      <UpdatePasswordModal
        isOpen={isPasswordUpdateModalOpen}
        onClose={() => setPasswordUpdateModalOpen(false)}
        onUpdatePassword={handleUpdatePassword}
      />

      <ConFirmSecessionModal
        isOpen={isSecessionModalOpen}
        onClose={() => setIsSecessionModalOpen(false)}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
}
