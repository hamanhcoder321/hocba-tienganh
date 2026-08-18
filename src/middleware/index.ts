import { checkRedirectApi } from '@/lib/api/redirect';
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, redirect } = context;

  const baseUrl = import.meta.env.PUBLIC_CLIENT_URL;

  if (url.pathname.startsWith('/_astro') || url.pathname.startsWith('/api') || url.pathname.includes('.')) {
    return next();
  }

  let normalizedPath = url.pathname;
  if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1);
  }

  const currentUrl = `${baseUrl}${normalizedPath}${url.search}`;

  try {
    const redirectData = await checkRedirectApi(currentUrl);

    if (redirectData?.target) {
      const targetUrl = new URL(redirectData.target, baseUrl);

      if (targetUrl.href !== new URL(currentUrl).href) {
        return redirect(targetUrl.href, (Number(redirectData.type) || 301) as any);
      }
    }

    return next();
  } catch (error) {
    console.error('[Middleware Error]:', error);
    return next();
  }
});
