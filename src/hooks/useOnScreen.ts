import { MutableRefObject, useEffect, useMemo, useState } from "react";

function useOnScreen(ref: MutableRefObject<Element>, thresInput: number) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = useMemo(() => {
    return new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: thresInput },
    );
  }, [thresInput]);

  useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [observer, ref]);

  return isIntersecting;
}

export default useOnScreen;
