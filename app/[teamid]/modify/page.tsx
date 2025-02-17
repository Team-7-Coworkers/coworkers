'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { getGroups, patchGroups } from '@/app/api/group.api';
import useTeamStore from '@/app/stores/teamStore';
import useUserStore from '@/app/stores/userStore';

import InputField from '@/app/components/InputField';
import ImageUpload from '@/app/components/ImageUpload';
import Button from '@/app/components/Button';
import Loading from '@/app/components/Loading';

import styles from '../../styles/team.module.css';
import { TOAST_CLOSE_TIME } from '@constants/times';

const MIN_NAME_LENGTH = 2;

export default function ModifyTeamPage() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [imageErrorMessage, setImageErrorMessage] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const { teamid } = useParams();
  const { user } = useUserStore();
  const { currentTeam, setCurrentTeam } = useTeamStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  // 그룹 정보 가져오기
  const {
    data: group,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getGroupById', teamid],
    queryFn: async () => await getGroups({ groupId: Number(teamid) }),
    enabled: !!teamid,
  });

  // 그룹(팀) 수정 뮤테이션
  const { mutate } = useMutation({
    mutationFn: async () =>
      await patchGroups({ groupId: Number(teamid), name, image }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['coworkers-teamList', 'getGroupsById', user?.id],
      });

      if (currentTeam?.id === data.id) {
        setCurrentTeam(data.id);
      }

      toast.success('팀 정보를 수정하였습니다.', {
        autoClose: TOAST_CLOSE_TIME.success,
      });
      // console.log('--- patchGroups:data:', data);
      router.push(`/${data.id}`);
    },
    onError: (err) => {
      toast.error(
        '팀 정보 수정에 실패 하였습니다. 잠시 후 다시 시도해 주세요.'
      );
      console.error('--- patchGroups:error:', err);
    },
  });

  // 최소 2글자 이상인지 확인
  const validName = name.trim().length >= MIN_NAME_LENGTH;

  // 수정 폼 서브밋
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // disabled 에서 걸러지긴 하지만 그래도 넣어둠
    if (!validName) {
      setNameErrorMessage('팀 이름을 최소 2글자 이상 작성하셔야 합니다.');
      return;
    }

    mutate();
  };

  const handleImageUploadSuccess = (url: string) => {
    // console.log('--- handleImageUploadSuccess:', url);
    setImage(url);
  };

  const handleImageUploadError = (err: Error) => {
    console.error('--- handleImageUploadError:', err);
    setImageErrorMessage('이미지 업로드에 실패하였습니다.');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameErrorMessage('');
    setName(e.target.value);
  };

  useEffect(() => {
    if (!group) return;

    // 관리자 확인
    const isAdminUser =
      user?.id ===
      group?.members.find((member) => member.role === 'ADMIN')?.userId;

    // 관리자 아닐 경우
    if (!isAdminUser) {
      toast.error('잘못된 접근입니다. 팀 페이지로 돌아갑니다.');
      return router.replace(`/${group.id}`);
    }

    setName(group.name);
    setImage(group.image);
  }, [group, user, router]);

  if (isLoading) {
    return (
      <div className="mt-24">
        <Loading />
      </div>
    );
  }

  if (isError) {
    toast.error(
      '팀 정보 가져오는데 실패 하였습니다. 잠시 후 다시 시도해 주세요.'
    );
    router.back();
    return null;
  }

  if (!group) return null;

  return (
    <div className={styles.area}>
      <h1 className={styles.title}>팀 수정하기</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.wrapImageUpload}>
          <label className={styles.label}>팀 프로필</label>
          <ImageUpload
            onUploadSuccess={handleImageUploadSuccess}
            onUploadError={handleImageUploadError}
            url={group.image}
          />
          {imageErrorMessage && (
            <div className={styles.errorMessage}>{imageErrorMessage}</div>
          )}
        </div>

        <label
          htmlFor="name"
          className={styles.label}
        >
          팀 이름
        </label>
        <InputField
          id="name"
          type="text"
          value={name}
          placeholder="팀 이름을 입력해주세요."
          onChange={handleNameChange}
          errorMessage={nameErrorMessage}
        />

        <div className="flex gap-4">
          <Button
            type="button"
            classname="w-full mt-10"
            styleType="outlined"
            onClick={() => router.back()}
          >
            취소하고 되돌아 가기
          </Button>
          <Button
            type="submit"
            classname="w-full mt-10"
            disabled={!validName}
          >
            수정하기
          </Button>
        </div>
        <div className={styles.help}>
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </div>
      </form>
    </div>
  );
}
