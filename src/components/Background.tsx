import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TransactionType } from "./type";
import { ScrollContainerProvider } from "./scrollContainer";

interface BackgroundProps {
  className?: string;
  children?: React.ReactNode;
  type?: TransactionType;
  color?: string;
}

const outTransactionMap = {
  [TransactionType.Line]: LineOut,
  [TransactionType.Point]: PointOut,
  [TransactionType.Rotate]: LineOut,
  [TransactionType.Nominal]: NominalOut,
};

export function Background(props: BackgroundProps) {
  const {
    className,
    children,
    type = TransactionType.Nominal,
    color = "bg-[#fbf5ef]",
  } = props;

  const scrollContainer = useRef<HTMLDivElement>(null);

  const OutTransaction = outTransactionMap[type];

  return (
    <ScrollContainerProvider value={scrollContainer}>
      <motion.div
        ref={scrollContainer}
        id="scroll-container"
        className={`${
          className ? className : ""
        } absolute top-0 left-0 w-full h-full overflow-auto isolate`}
        initial={{ zIndex: -1 }}
        animate={{ zIndex: 0 }}
        exit={{
          zIndex: 1,
          transition: {
            duration: 2,
          },
        }}
      >
        {children}
        <div className="fixed top-0 left-0 w-full h-full -z-1">
          <OutTransaction key="OutTransaction" color={color} />
        </div>
      </motion.div>
    </ScrollContainerProvider>
  );
}

interface OutProps {
  color: string;
  className?: string;
}

function NominalOut({ color, className }: OutProps) {
  return (
    <motion.div
      className={`absolute top-0 left-0 w-full h-full ${color} ${className}`}
      exit={{
        opacity: 0,
        transition: {
          duration: 1,
        },
      }}
    />
  );
}

const factor = 0.3;
const lineCount = 10;

const getDelays = ((length: number) => {
  const delays: number[] = [];
  let currentDelay = 0;
  for (let i = 0; i < length; i++) {
    delays.push(currentDelay);
    currentDelay += factor / (Math.log(i + 1) + 1);
  }
  return (idx: number) => {
    return delays[idx];
  };
})(lineCount);

function LineOut({ color, className }: OutProps) {
  return (
    <div
      className={`${className} absolute top-0 left-0 w-full h-full flex flex-col-reverse`}
    >
      {Array.from({ length: lineCount }).map((_, idx) => {
        return (
          <motion.div
            key={idx}
            className={`w-full flex-1 ${color}`}
            exit={{
              y: `${lineCount * 100}%`,
              scaleY: 0,
            }}
            transition={{
              duration: 2,
              delay: getDelays(idx),
            }}
          />
        );
      })}
    </div>
  );
}

function PointOut({ color, className }: OutProps) {
  const [bgSize, setBgSize] = useState(
    Math.max(window.innerWidth, window.innerHeight)
  );
  useEffect(() => {
    const resize = () => {
      setBgSize(Math.max(window.innerWidth, window.innerHeight));
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      className={`${className} absolute top-0 left-1/2 transform -translate-x-1/2 grid grid-cols-10`}
      style={{ width: bgSize, height: bgSize }}
    >
      {Array.from({ length: 100 }).map((_, idx) => {
        const col = idx % 10;
        const row = Math.floor(idx / 10);
        return (
          <motion.div
            key={idx}
            className={`w-full h-full rounded-full ${color}`}
            initial={{
              scale: 1.5,
            }}
            exit={{
              scale: 0,
            }}
            transition={{
              duration: 2,
              delay: (col + row) * 0.1,
            }}
          />
        );
      })}
    </div>
  );
}
