'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import type { LoginFormDataType } from '@app/types/auth';
import { postAuthSignIn } from '@api/auth.api';
import { createErrorHandler } from '@utils/createErrorHandler';
import Modal, { ModalFooter } from '@components/Modal';
import Button from '@components/Button';
import useUserStore from '@stores/userStore';
import LoginForm from '@app/login/LoginForm';
import EasyLogin from '@app/login/EasyLogin';

export default function LoginPage() {
  const { setAccessToken, setRefreshToken, setUser } = useUserStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const stateParam = searchParams.get('state');
  const redirectParam = searchParams.get('redirect');

  const [showModal, setShowModal] = useState(false);
  const [modalDismissed, setModalDismissed] = useState(false);

  useEffect(() => {
    if (stateParam === 'login-required') {
      setShowModal(true);
    } else {
      setModalDismissed(true);
    }
  }, [stateParam]);

  const loginMutation = useMutation({
    mutationFn: postAuthSignIn,
    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
      document.cookie = `accessToken=${accessToken}; path=/; max-age=${60 * 60 * 24}`;
      router.push(redirectParam || '/');
    },
    onError: createErrorHandler({ prefixMessage: '로그인 실패' }),
  });

  const handleLoginSubmit = (formData: LoginFormDataType) => {
    loginMutation.mutate(formData);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    setModalDismissed(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-b-primary px-4 pt-[10vh] sm:pt-[15vh]">
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          hasCloseButton={false}
          icon="danger"
          title="로그인이 필요한 페이지입니다."
        >
          <p className="text-center"></p>
          <ModalFooter>
            <Button
              state="danger"
              onClick={handleModalConfirm}
            >
              확인
            </Button>
          </ModalFooter>
        </Modal>
      )}
      {modalDismissed && (
        <>
          <h2 className="text-center text-2xl font-medium lg:text-4xl">
            로그인
          </h2>
          <div className="w-full max-w-[460px] space-y-12 pt-[4vh] sm:pt-[6vh]">
            <div className="flex flex-col gap-6">
              <LoginForm onSubmit={handleLoginSubmit} />
              <div className="text-center font-medium">
                아직 계정이 없으신가요?
                <Link
                  href="/signup"
                  className="ml-2 text-primary underline hover:opacity-50"
                >
                  가입하기
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex w-full items-center gap-4">
                <div className="flex-1 border-t border-bd-primary opacity-10"></div>
                <span>OR</span>
                <div className="flex-1 border-t border-bd-primary opacity-10"></div>
              </div>
              <EasyLogin page="login" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
