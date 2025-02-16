'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/app/components/Button';
import ImageUpload from '@/app/components/ImageUpload';
import TextField from '@/app/components/TextField';
import {
  postArticles,
  patchArticles,
  getDetailsArticle,
} from '@/app/api/article.api';
import Loading from '@/app/components/Loading';
import { MAX_LENGTH } from '@/app/constants/form';
import { toast } from 'react-toastify';
import useUserStore from '@stores/userStore';
import Modal, { ModalFooter } from '@components/Modal';

const WriteContent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const articleId = searchParams.get('articleId');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useUserStore();

  const handleIncorrectModalClose = () => {
    setIsModalOpen(false);
    setShouldRedirect(true);
  };

  useEffect(() => {
    if (shouldRedirect) {
      router.replace('/boards');
    }
  }, [shouldRedirect, router]);

  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && user === null) {
      toast.error('로그인이 필요합니다.');
      router.replace('/login');
    }
  }, [isLoading, user, router]);

  //수정하기로 들어갔을 때 게시글 정보 가져옴
  useEffect(() => {
    if (!articleId) return;

    const fetchArticle = async () => {
      try {
        const data = await getDetailsArticle({ articleId: Number(articleId) });

        if ('message' in data) {
          toast.error('게시글 정보를 찾을 수 없습니다.');
          setShouldRedirect(true);
          return;
        }

        if (user && data.writer.id !== user.id) {
          setIsModalOpen(true);
          return;
        }

        setTitle(data.title);
        setContent(data.content);
        setImage(data.image);
      } catch {
        toast.error('게시글 정보를 불러오는 데 실패했습니다.');
        setShouldRedirect(true);
      }
    };

    fetchArticle();
  }, [articleId, user]);

  const postMutation = useMutation({
    mutationFn: postArticles,
    onSuccess: () => {
      toast.success('등록이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      router.push('/boards');
    },
    onError: () => {
      toast.error('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const patchMutation = useMutation({
    mutationFn: patchArticles,
    onSuccess: () => {
      toast.success('수정이 완료되었습니다.');
      router.push(`/boards/${articleId}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['article', articleId] });
    },
    onError: () => {
      toast.error('수정 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    if (articleId) {
      // 수정
      patchMutation.mutate({
        articleId: Number(articleId),
        title,
        content,
        ...(image && { image }),
      });
    } else {
      // 등록
      postMutation.mutate({
        title,
        content,
        ...(image && { image }),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading classname="" />
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex w-[90%] flex-col items-start pb-12 sm:w-[90%] lg:w-[65%]">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hasCloseButton={false}
        icon="danger"
        title="수정 권한이 없습니다."
      >
        <p className="text-center">게시판 목록으로 돌아갑니다.</p>
        <ModalFooter>
          <Button
            state="danger"
            onClick={handleIncorrectModalClose}
          >
            확인
          </Button>
        </ModalFooter>
      </Modal>

      <div className="flex w-full items-center justify-between border-b border-gray-700 pb-8 pt-12">
        <p className="pb-6 text-[20px] font-bold">
          {articleId ? '게시글 수정' : '게시글 쓰기'}
        </p>
        <Button
          styleType="solid"
          size="w-[184px] h-[42px]"
          classname="hidden sm:inline-block"
          onClick={handleSubmit}
        >
          {articleId ? '수정' : '등록'}
        </Button>
      </div>

      <p className="pb-4 pt-10">
        <span className="text-tertiary">* </span>제목
      </p>
      <input
        id="title"
        type="text"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => {
          if (e.target.value.length > 200) {
            alert(
              `제목은 최대 ${MAX_LENGTH.articleName}자까지 입력 가능합니다.`
            );

            return;
          }
          setTitle(e.target.value);
        }}
        className="border-1px w-full rounded-[12px] border border-[#F8FAFC1A] bg-b-secondary py-[8px] pl-[16px] text-md font-normal text-t-primary placeholder-[#9CA3AF] focus:border-bd-primary focus:outline-none sm:py-[16px] sm:pl-[24px] sm:text-lg"
      />

      <p className="pb-4 pt-8">
        <span className="text-tertiary">* </span>내용
      </p>
      <TextField
        type="box"
        placeholder="내용을 입력해주세요."
        height={240}
        value={content}
        onChange={(e) => {
          if (e.target.value.length > 2000) {
            alert(
              `내용은 최대 ${MAX_LENGTH.articleContent}자까지 입력 가능합니다.`
            );
            return;
          }
          setContent(e.target.value);
        }}
        enterSubmit
      />

      <p className="pb-4 pt-8">
        이미지
        <span className="text-[14px] text-t-default"> (선택)</span>
      </p>

      <ImageUpload
        url={image ? image : undefined}
        onUploadSuccess={setImage}
        onUploadError={() => {}}
        variant="square"
      />

      {/*모바일버전버튼 */}
      <Button
        styleType="solid"
        size="w-full h-[42px]"
        classname="sm:hidden mt-10"
        onClick={handleSubmit}
      >
        {articleId ? '수정' : '등록'}
      </Button>
    </div>
  );
};

export default function Write() {
  return (
    <Suspense fallback={<Loading />}>
      <WriteContent />
    </Suspense>
  );
}
