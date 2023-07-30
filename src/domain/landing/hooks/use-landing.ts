import { useEffect } from "react";

export const setCSSVariable = (name: string, value: any) => {
  document.documentElement.style.setProperty(`--${name}`, value);
};

export const getPercentageScrolled = () => {
  const { scrollTop, clientHeight } = document.documentElement;
  const scrolledRatio = (scrollTop / clientHeight) * 100;
  const percentageScrolledOrFullHeight = Math.min(scrolledRatio, 100);

  console.log("[getPercentageScrolled]: ", percentageScrolledOrFullHeight);
  setCSSVariable("scroll", percentageScrolledOrFullHeight);

  return percentageScrolledOrFullHeight;
};

export const useLanding = () => {
  console.log("[useLanding]");

  useEffect(() => {
    console.log("[useLanding] - useEffect");

    window.addEventListener("resize", getPercentageScrolled);
    document.addEventListener("scroll", getPercentageScrolled);

    return () => {
      document.removeEventListener("resize", getPercentageScrolled);
      document.removeEventListener("scroll", getPercentageScrolled);
    };
  }, []);

  return {
    getPercentageScrolled,
  };
};
