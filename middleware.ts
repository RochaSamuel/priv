import { NextResponse } from 'next/server'
import { withAuth, NextRequestWithAuth, NextAuthMiddlewareOptions } from 'next-auth/middleware'

const middleware = (request: NextRequestWithAuth) => {
  console.log('[MIDDLEWARE_NEXTAUTH_TOKEN]: ', request.nextauth.token)

  const isPrivateRoutes = !request.nextUrl.pathname.startsWith('/auth')
  const isAdminUser = request.nextauth.token?.role === 'admin'

  if (isPrivateRoutes && !request.nextauth.token) {
    return NextResponse.rewrite(new URL('/auth/login', request.url))
  }
}

const callbackOptions: NextAuthMiddlewareOptions = {}

export default withAuth(middleware, callbackOptions)

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)"],
};