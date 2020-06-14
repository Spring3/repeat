import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [bounds, setBounds] = useState(typeof window !== 'undefined' && {
    height: window.innerHeight,
    width: window.innerWidth
  })
  useEffect(() => {
    const resizeHandler = () => {
      if (typeof window !== 'undefined') {
        setBounds({
          height: window.innerHeight,
          width: window.innerWidth
        });
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeHandler);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', resizeHandler);
      }
    }
  }, []);

  return bounds;
}

export {
  useWindowSize
}
