import React, { useCallback } from 'react';

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <button className="up-btn" onClick={scrollToTop}>
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
