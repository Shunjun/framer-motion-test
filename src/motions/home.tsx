import { motion } from "framer-motion";
import Block from "../components/Block";
import { useNavigate } from "react-router-dom";
import { Background } from "../components/Background";
import { useState } from "react";
import { TransactionType } from "../components/type";

export default function Home() {
  const nav = useNavigate();

  const [type, setType] = useState<TransactionType>(TransactionType.Line);

  const handleClick = (type: TransactionType) => () => {
    setType(type);
    setTimeout(() => {
      nav("/images");
    });
  };

  return (
    <Background type={type}>
      <div className="absolute z-1 top-1/3 left-1/2 transform -translate-x-1/2 pointer-events-none z-6">
        <div className="custom-font text-[32px] text-pink-300 overflow-hidden">
          <motion.span
            className="inline-block"
            exit={{
              y: "-100%",
              transition: {
                ease: "backInOut",
                duration: 1,
                delay: 0.2,
              },
            }}
          >
            WE SHOULD BE
          </motion.span>
        </div>
        <div className="custom-font whitespace-nowrap text-[150px] text-gray-7 leading-tight overflow-hidden">
          <motion.span
            className="inline-block"
            exit={{
              y: "-100%",
              transition: {
                ease: "backInOut",
                duration: 1,
                delay: 0.5,
              },
            }}
          >
            CREA
          </motion.span>
          &nbsp;&nbsp;
          <motion.span
            className="inline-block"
            exit={{
              y: "-100%",
              transition: {
                ease: "backInOut",
                duration: 1,
                delay: 0.7,
              },
            }}
          >
            TIVE
          </motion.span>
        </div>
      </div>

      <Block
        onClick={handleClick(TransactionType.Line)}
        type="line"
        className="absolute top-40 left-1/10"
        color="bg-pink-300"
        initial={{
          rotate: -12,
          transformOrigin: "bottom left",
        }}
      />
      <Block
        onClick={handleClick(TransactionType.Point)}
        type="point"
        className="absolute top-5/10 left-4/10"
        color="bg-green-300"
        initial={{
          transformOrigin: "-10% -10%",
          rotate: 15,
        }}
      />
      <Block
        onClick={handleClick(TransactionType.Rotate)}
        type="rotate"
        color="bg-blue-300"
        className="absolute top-3/10 left-7/10"
        initial={{
          transformOrigin: "center",
          rotate: 5,
        }}
      />
    </Background>
  );
}
