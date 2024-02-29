import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { toast } from 'react-toastify';

export function middleware(request: NextRequest ) {
  const login = request.cookies.get('user')?.value;
  
  if(!login) {
    toast.error("Yêu cầu đăng nhập rồi thử lại!!")
    return NextResponse.redirect(new URL('/dang-ky', request.url));
  }  else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/web/:path*'],
}