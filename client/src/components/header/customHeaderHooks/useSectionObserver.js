import React, { useEffect, useRef } from "react";

const useSectionObserver = (
  headerRef,
  setIsActiveHeaderWrapper,
  setIsActiveHamburgerMenu,
  setIsActiveLogo
) => {
  const isMounted = useRef(null);

  useEffect(() => {
    const sectionOneOptions = {
      rootMargin: "-50% 0px 0px 0px",
    };

    const sectionOneObserver = new IntersectionObserver((entries) => {
      if (Boolean(isMounted.current)) {
        entries.forEach((item) => {
          if (item.isIntersecting) {
            setIsActiveHeaderWrapper(false);
            setIsActiveLogo(false);
            setIsActiveHamburgerMenu(false);
          } else {
            setIsActiveHeaderWrapper(true);
            setIsActiveLogo(true);
            setIsActiveHamburgerMenu(true);
          }
        });
      }
    }, sectionOneOptions);

    if (Boolean(headerRef.current)) {
      sectionOneObserver.observe(headerRef.current);
    }

    return () => {
      if (Boolean(headerRef.current))
        sectionOneObserver.unobserve(headerRef.current);
    };
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
};

export default useSectionObserver;
