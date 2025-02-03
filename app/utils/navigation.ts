// gnb 팀 리스트 메뉴/자유게시판을 렌더링 할 경로와 하지 않을 경로를 판단하는 함수
export const isHiddenGNBMenuPath = (pathname: string) => {
  const hiddenPaths = ['/login', '/signup'];
  const isTeamPage = /^\/\d+($|\/)/.test(pathname);

  return !hiddenPaths.includes(pathname) || isTeamPage;
};

// 루트 바로 뒤에 오는 숫자(teamId)만 추출하는 함수
// '/{teamId}', '/{teamId}/other' 의 경우에 teamId반환
// boards/{articleId} 등의 경우는 null 반환
export const extractTeamIdFromPath = (pathname: string): number | null => {
  const match = pathname.match(/^\/(\d+)(\/|$)/);

  return match ? Number(match[1]) : null;
};
