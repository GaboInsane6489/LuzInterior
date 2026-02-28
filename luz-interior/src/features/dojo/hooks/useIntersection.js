import { useState, useEffect, useRef } from "react";

export const useIntersection = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Mantenemos true una vez que entra para que la animación no se resetee al salir
      if (entry.isIntersecting) setIsIntersecting(true);
    }, options);

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isIntersecting];
};
