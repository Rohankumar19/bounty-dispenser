'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const ButtonWrapper = ({
  text,
  widthLength,
  onclick,
}: {
  text: string;
  widthLength: string;
  onclick: () => void;
}) => {
  return (
    <div className="flex items-center justify-center">
      <SpotlightButton
        text={text}
        widthLength={widthLength}
        onclick={onclick}
      />
    </div>
  );
};

const SpotlightButton = ({
  text,
  widthLength,
  onclick,
}: {
  text: string;
  widthLength: string;
  onclick: () => void;
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { width } = (e.target as HTMLElement)?.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current!.animate({ left }, { duration: 250, fill: 'forwards' });
    };

    const handleMouseLeave = () => {
      spanRef.current!.animate(
        { left: '50%' },
        { duration: 100, fill: 'forwards' },
      );
    };

    btnRef?.current?.addEventListener('mousemove', handleMouseMove);
    btnRef?.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btnRef?.current?.removeEventListener('mousemove', handleMouseMove);
      btnRef?.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      onClick={onclick}
      className="relative w-full overflow-hidden rounded-lg bg px-4 py-3 text-lg font-medium text-black m-10"
    >
      <span className="pointer-events-none relative z-10 text-white">
        {text}
      </span>
      <span
        ref={spanRef}
        className={`pointer-events-none absolute left-[50%] top-[50%] h-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-login-page-color ${widthLength}`}
      />
    </motion.button>
  );
};

export default ButtonWrapper;
