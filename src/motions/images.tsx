import { motion, useScroll, useTransform } from "framer-motion";
import { Background } from "../components/Background";
import { useEffect, useRef, useState } from "react";
import { useScrollContainer } from "../components/scrollContainer";

export default function Images() {
  return (
    <>
      <Background color="bg-pink-300">
        <ImagesScroll />
      </Background>
    </>
  );
}

function ImagesScroll() {
  const scrollContainer = useScrollContainer();
  const imageContainer = useRef<HTMLDivElement>(null);
  const smallImageContainer = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    container: scrollContainer!,
  });

  const [vh] = useState(window.innerHeight);

  const scale = useTransform(scrollY, [0, vh, 2 * vh, 3 * vh], [0.4, 1, 1, 2]);
  const y = useTransform(
    scrollY,
    [0, vh, 2 * vh, 3 * vh, 4 * vh],
    [0, 0, -vh, -vh, -2 * vh]
  );

  const { scrollYProgress } = useScroll({
    container: scrollContainer!,
    target: imageContainer,
    offset: ["end end", "101% end"],
  });

  useEffect(() => {
    scrollYProgress.on("change", () => {
      console.log(scrollYProgress.get());
    });
  }, []);

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["", "inset(0 0 0 0)"]
  );

  return (
    <>
      <section style={{ height: vh }} />
      <section style={{ height: vh }} />
      <section style={{ height: vh }} />
      <motion.section
        ref={imageContainer}
        className="overflow-hidden"
        style={{
          height: vh,
          clipPath,
        }}
      >
        <motion.img
          className="fixed top-0 left-0 w-full h-200vh object-cover z-1 pointer-events-none"
          src="/images/main.avif"
          alt="Scrolling Image"
          custom={scrollY}
          style={{
            width: "100%",
            maxWidth: "none",
            scale,
            y,
          }}
        />
      </motion.section>
      <section
        ref={smallImageContainer}
        style={{ height: vh / 2, clipPath: "inset(0 0 0 0)" }}
        className="flex"
      >
        <div className="fixed bottom-0 h-full w-full flex">
          {Array.from({ length: 4 }).map((_, idx) => {
            return (
              <div key={idx} className="h-full w-1/4 overflow-hidden">
                <motion.img
                  src={`/images/${idx}.jpg`}
                  className="w-full h-full bg-white object-cover"
                  whileHover={{
                    scale: 1.1,
                  }}
                />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
