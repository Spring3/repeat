import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [bounds, setBounds] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })
  useEffect(() => {
    const resizeHandler = () => {
      setBounds({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

  return bounds;
}

export {
  useWindowSize
}
