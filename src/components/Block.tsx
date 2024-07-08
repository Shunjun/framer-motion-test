import { AnimationProps, motion, Variant } from "framer-motion";
import { CSSProperties } from "react";

const contentMap = {
  line: Line,
  point: Point,
  rotate: Rotate,
};

export default function Block({
  type,
  className,
  style,
  color,
  initial,
  onClick,

  ...rest
}: Omit<AnimationProps, "initial"> & {
  type: "line" | "point" | "rotate";
  className?: string;
  color?: string;
  style?: CSSProperties;
  initial: Variant;
  onClick?: React.MouseEventHandler;
}) {
  const Content = contentMap[type];

  return (
    <motion.div
      className={`${className} z-5`}
      initial="initial"
      whileHover="hover"
      variants={{
        hover: {
          zIndex: 6,
        },
      }}
      exit={{
        scale: 0,
        rotate: 180 + Math.fround(Math.random() * 180),
        transformOrigin: "center",
        transition: {
          ease: "easeInOut",
          duration: 1,
        },
      }}
    >
      <motion.div
        onClick={onClick}
        style={style}
        className={`${color} w-50 h-50 rounded-3xl cursor-pointer p-8 overflow-hidden`}
        variants={{
          initial,
          hover: {
            rotate: 0,
          },
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          duration: 0.2,
        }}
        {...rest}
      >
        {Content && <Content />}
      </motion.div>
    </motion.div>
  );
}

const factor = 0.5;
const lineCount = 20;

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

function Line() {
  return (
    <div className="relative flex flex-col-reverse w-full h-full h-2">
      {Array.from({ length: lineCount }).map((_, idx) => {
        return (
          <motion.div
            key={"botton" + idx}
            className="bg-white w-full"
            style={{
              height: (1 / (lineCount * 2)) * 100 + "%",
            }}
            variants={{
              hover: {
                y: 200,
                scaleY: 1.5,
                transition: {
                  ease: "easeInOut",
                  duration: 2,
                  delay: getDelays(idx),
                },
              },
            }}
          />
        );
      })}
      <div className="w-full h-1/2 top-0 bg-white" />
      {Array.from({ length: 20 }).map((_, idx) => {
        return (
          <motion.div
            key={"top" + idx}
            className="w-full absolute top-1/2 bg-white"
            style={{
              height: (1 / (lineCount * 2)) * 100 + "%",
            }}
            variants={{
              hover: {
                y: 300,
                transition: {
                  ease: "easeInOut",
                  duration: 3,
                  delay: idx * 0.15 + getDelays(lineCount - 1),
                  repeat: Infinity,
                },
              },
            }}
          />
        );
      })}
    </div>
  );
}

function getGridDelays(idx: number) {
  const col = idx % 8;
  const row = Math.floor(idx / 8);
  return (col + row) * 0.1;
}

function Point() {
  return (
    <div className="h-full grid grid-cols-8 grid-rows-8 gap-2 justify-items-center items-center">
      {Array.from({ length: 64 }).map((_, idx) => {
        return (
          <motion.div
            key={idx}
            className="w-2 h-2 rounded-full bg-white"
            variants={{
              hover: {
                scale: 4,
                transition: {
                  ease: "easeInOut",
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: getGridDelays(idx),
                },
              },
            }}
          />
        );
      })}
    </div>
  );
}

function Rotate() {
  return (
    <div className="relative h-full">
      {Array.from({ length: 8 }).map((_, idx) => {
        return (
          <motion.div
            key={idx}
            className="absolute w-full h-full flex place-items-center place-content-center"
            variants={{
              initial: {
                rotate: 45 * idx,
              },
              hover: {
                rotate: 360 + 45 * idx,
                transition: {
                  ease: "linear",
                  duration: 2.4,
                  repeat: Infinity,
                },
              },
            }}
          >
            <div className="w-3 h-12 bg-white relative -top-16" />
          </motion.div>
        );
      })}
    </div>
  );
}
