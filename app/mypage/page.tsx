'use client';

import { useEffect, useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import { useMutation } from '@tanstack/react-query';
import {
  deleteUser,
  getUser,
  patchUser,
  patchUserPassword,
} from '../api/user.api';
import useUserStore from '../stores/userStore';
import axios from 'axios';
import Button from '../components/Button';
import UpdatePasswordModal from './UpdatePasswordModal';
import InputField from '../components/InputField';
import { validateName, validateUserUpdated } from '../utils/formValidators';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ConFirmSecessionModal from './ConfirnSecessionModal';
import useTeamStore from '../stores/teamStore';

export interface PasswordFormDataTypes {
  password: string;
  confirmPassword: string;
}

export interface UserFormDataTypes {
  nickname: string;
  image: string;
}

export default function MyPage() {
  const { user, accessToken, updateUser, clearUser } = useUserStore();
  const { clearTeam } = useTeamStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordUpdateModalOpen, setPasswordUpdateModalOpen] =
    useState(false);
  const [isSecessionModalOpen, setIsSecessionModalOpen] = useState(false);
  const [userFormData, setUserFormData] = useState<UserFormDataTypes>({
    nickname: user?.nickname || '',
    image: user?.image || '',
  });
  const [isChanged, setIsChanged] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const router = useRouter();

  const updateUserMuation = useMutation({
    mutationFn: patchUser,
    onSuccess: async () => {
      const { nickname, image } = await getUser();

      updateUser({ nickname, image });
      alert('계정 정보가 변경되었습니다.');
      setIsEditing(false);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          '오류가 발생했습니다. 다시 시도해주세요.';
        alert(`비밀번호 업데이트 실패: ${errorMessage}`);
      } else {
        alert('예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: patchUserPassword,
    onSuccess: () => {
      alert('비밀번호가 변경되었습니다.');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          '오류가 발생했습니다. 다시 시도해주세요.';
        alert(`비밀번호 업데이트 실패: ${errorMessage}`);
      } else {
        alert('예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  const deleteUserSelfMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      clearUser();
      clearTeam();

      alert('회원 탈퇴가 정상 처리되었습니다.');

      router.push('/');
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          '오류가 발생했습니다. 다시 시도해주세요.';
        alert(`비밀번호 업데이트 실패: ${errorMessage}`);
      } else {
        alert('예기치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });

  useEffect(() => {
    const { accessToken: isAthenticated } = useUserStore.getState();

    if (!isAthenticated) {
      alert('로그인이 필요합니다!');
      router.push('/');
    }
  }, [accessToken, router]);

  useEffect(() => {
    if (user) {
      setUserFormData({
        nickname: user.nickname,
        image: user.image || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    setIsChanged(validateUserUpdated(user, userFormData));
    setIsValidated(!validateName(userFormData.nickname.trim()));
  }, [userFormData, user]);

  const handleUploadSuccess = (url: string) => {
    setUserFormData((prev) => ({ ...prev, image: url }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUserInfo = () => {
    const updatedParams: Partial<UserFormDataTypes> = {
      ...(user?.nickname !== userFormData.nickname && {
        nickname: userFormData.nickname,
      }),
      ...(user?.image !== userFormData.image && { image: userFormData.image }),
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

  if (!accessToken) return;

  return (
    <div className="mx-auto max-w-[792px] space-y-4 px-4 py-6 sm:px-6">
      <div className="space-y-6">
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
        <form className={`space-y-6 ${isEditing ? '' : 'pointer-events-none'}`}>
          <div className="mb flex">
            <ImageUpload
              url={user?.image || undefined}
              onUploadSuccess={handleUploadSuccess}
              onUploadError={() => {}}
              variant="circle"
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-3">
            <p>이름</p>
            <InputField
              id="nickname"
              type="text"
              value={userFormData.nickname}
              placeholder={user?.nickname || ''}
              state={isEditing ? undefined : 'default-disabled'}
              validator={validateName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <p>이메일</p>
              {isEditing && (
                <p className="text-xs text-t-default">
                  이메일은 변경할 수 없습니다.
                </p>
              )}
            </div>
            <InputField
              id="email"
              type="email"
              placeholder={user?.email || ''}
              state="default-disabled"
              onChange={handleChange}
            />
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${isEditing ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'} `}
          >
            <Button
              type="button"
              size="large"
              classname="w-full"
              onClick={handleUpdateUserInfo}
              disabled={!isValidated || !isChanged}
            >
              변경 사항 저장
            </Button>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-between">
        <p>비밀번호 변경</p>
        <Button
          type="button"
          size="X-small"
          onClick={() => setPasswordUpdateModalOpen(true)}
          state="default"
          classname="text-xs"
        >
          변경하기
        </Button>
      </div>

      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={() => setIsSecessionModalOpen(true)}
      >
        <Image
          src="/images/icons/ic_secession.svg"
          width={24}
          height={24}
          alt=""
        />
        <p className="font-medium text-danger">회원 탈퇴하기</p>
      </div>

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
