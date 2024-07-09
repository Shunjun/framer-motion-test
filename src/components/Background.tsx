import { motion, TargetAndTransition } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { TransactionType } from "./type";
import { ScrollContainerProvider, useScrollContainer } from "./scrollContainer";

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

  const scrollContainer = useRef<HTMLDivElement | null>(null);
  const [isReady, updateReady] = useReducer(() => {
    return true;
  }, false);

  console.log(isReady);

  const OutTransaction = outTransactionMap[type];

  const memoChildren = useMemo(() => children, [children]);

  return (
    <ScrollContainerProvider
      value={{
        isReady,
        updateReady,
        ref: scrollContainer,
      }}
    >
      <OutTransaction key="outTransaction" color={color} className={className}>
        {isReady && memoChildren}
      </OutTransaction>
    </ScrollContainerProvider>
  );
}

function BaseBackground({
  children,
  className,
  exit,
}: {
  children: React.ReactNode;
  className?: string;
  exit?: TargetAndTransition;
}) {
  const { ref, updateReady, isReady } = useScrollContainer()!;
  const isReadyRef = useRef(isReady);
  isReadyRef.current = isReady;

  const getRef = useCallback((node: HTMLDivElement) => {
    if (!isReadyRef.current && ref) {
      ref.current = node;
      updateReady();
    }
  }, []);

  return (
    <motion.div
      ref={getRef}
      id="scroll-container"
      className={`${className} absolute top-0 left-0 w-full h-full overflow-auto isolate`}
      initial={{ zIndex: -1 }}
      animate={{ zIndex: 0 }}
      exit={{
        zIndex: 1,
        transition: {
          duration: 2,
        },
        ...exit,
      }}
    >
      {children}
    </motion.div>
  );
}

interface OutProps {
  color: string;
  className?: string;
  children?: React.ReactNode;
}

function NominalOut({ color, className, children }: OutProps) {
  return (
    <BaseBackground
      className={className}
      exit={{
        opacity: 0,
        transition: {
          duration: 1,
        },
      }}
    >
      {children}
      <div className="fixed top-0 left-0 w-full h-full -z-1">
        <motion.div
          className={`absolute top-0 left-0 w-full h-full ${color}`}
        />
      </div>
    </BaseBackground>
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

function LineOut({ children, color, className }: OutProps) {
  return (
    <BaseBackground className={className}>
      {children}
      <div className="fixed top-0 left-0 w-full h-full -z-1">
        <div
          className={`absolute top-0 left-0 w-full h-full flex flex-col-reverse`}
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
      </div>
    </BaseBackground>
  );
}

function PointOut({ children, color, className }: OutProps) {
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
    <BaseBackground className={className}>
      {children}
      <div className="fixed top-0 left-0 w-full h-full -z-1">
        <div
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 grid grid-cols-10`}
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
      </div>
    </BaseBackground>
  );
}
