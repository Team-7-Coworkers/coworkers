import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (/\.(png|jpg|css|ts|ico|svg)$/.test(pathname)) {
    return NextResponse.next();
  }

  // 쿠키에서 accessToken 추출
  const token = request.cookies.get('accessToken')?.value;

  // 로그인 페이지 접근 시, 이미 토큰이 있다면 메인 리다이렉트
  if (
    (pathname.startsWith('/login') || pathname.startsWith('/signup')) &&
    token
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // 페이지 검증
  // 로그인이 필요한 페이지인 경우, state와 redirect를 파라미터에 추가하여 로그인 페이지로 이동
  const segments = pathname.split('/'); // ex: "/1829/tasklist" → ["", "1829", "tasklist"]
  const firstSegment = segments[1];

  if (
    /^\d+$/.test(firstSegment) ||
    pathname.startsWith('/mypage') ||
    pathname.startsWith('/invitation') ||
    pathname.startsWith('/addteam') ||
    pathname.startsWith('/myhistory') ||
    pathname.startsWith('/boards/write') ||
    pathname.startsWith('/noteam')
  ) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('state', 'login-required');
      url.searchParams.set(
        'redirect',
        `${request.nextUrl.pathname}${request.nextUrl.search}`
      );
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
