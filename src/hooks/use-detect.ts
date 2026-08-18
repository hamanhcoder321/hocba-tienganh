import { useEffect, useState } from 'react';

export function useDetect() {
  const getDeviceFlags = () => {
    if (typeof window === 'undefined') {
      return { isMobile: false, isTablet: false, isDesktop: true };
    }

    const width = window.innerWidth;

    return {
      isMobile: width <= 767,
      isTablet: width > 767 && width <= 1024,
      isDesktop: width > 1024,
    };
  };

  const [device, setDevice] = useState(getDeviceFlags);

  useEffect(() => {
    const handler = () => setDevice(getDeviceFlags());

    window.addEventListener('resize', handler);
    window.addEventListener('orientationchange', handler);

    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('orientationchange', handler);
    };
  }, []);

  return device;
}
