import { withAuth } from 'next-auth/middleware';

// Protects every /admin route except the login page.
export default withAuth({
  pages: { signIn: '/admin/login' },
});

export const config = {
  matcher: ['/admin/((?!login).*)', '/admin'],
};
