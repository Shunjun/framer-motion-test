import { motion, useScroll, useTransform } from "framer-motion";
import { Background } from "../components/Background";
import { useRef } from "react";
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

  const { scrollY } = useScroll({
    container: scrollContainer!,
  });

  const vh = window.innerHeight;

  const scale = useTransform(scrollY, [0, vh, 2 * vh, 3 * vh], [0.3, 1, 1, 2]);
  const y = useTransform(
    scrollY,
    [0, vh, 2 * vh, 3 * vh, 4 * vh],
    [-vh / 8, 0, -vh, -vh, -2 * vh]
  );

  const borderRadius = useTransform(scrollY, [0, vh], [200, 0]);

  const { scrollYProgress } = useScroll({
    container: scrollContainer!,
    target: imageContainer,
    offset: ["end end", "101% end"],
  });

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
          className="fixed top-0 left-0 w-full h-200vh object-cover z-1 pointer-events-none transform-origin-b shadow-2xl"
          src={`${baseUrl === "/" ? "" : baseUrl}/images/main.avif`}
          alt="Scrolling Image"
          custom={scrollY}
          style={{
            borderRadius: 200,
            width: "100%",
            maxWidth: "none",
            scale: 0.3,
            rotate: -30,
            y: -vh / 1.3,
          }}
        />
        <motion.img
          className="fixed top-0 left-0 w-full h-200vh object-cover z-1 pointer-events-none transform-origin-b shadow-2xl"
          src={`${baseUrl === "/" ? "" : baseUrl}/images/main.avif`}
          alt="Scrolling Image"
          custom={scrollY}
          style={{
            borderRadius: 200,
            width: "100%",
            maxWidth: "none",
            scale: 0.3,
            rotate: 30,
            y: -vh / 1.3,
          }}
        />
        <motion.img
          className="fixed top-0 left-0 w-full h-200vh object-cover z-1 pointer-events-none shadow-2xl"
          src={`${baseUrl === "/" ? "" : baseUrl}/images/main.avif`}
          alt="Scrolling Image"
          custom={scrollY}
          style={{
            borderRadius,
            width: "100%",
            maxWidth: "none",
            scale,
            y,
          }}
        />
      </motion.section>
      <SmallImages vh={vh} containerRef={scrollContainer!} />
    </>
  );
}

export function SmallImages({
  vh,
  containerRef,
}: {
  vh: number;
  containerRef: React.RefObject<HTMLElement>;
}) {
  const smallImageContainer = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: smallImageContainer,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-60%", "0%"]);

  return (
    <section
      ref={smallImageContainer}
      className="overflow-hidden"
      style={{ height: vh / 2 }}
    >
      <motion.div
        className="relative h-full w-full flex cursor-pointer"
        style={{
          y,
        }}
      >
        {Array.from({ length: 4 }).map((_, idx) => {
          return (
            <div key={idx} className="h-full w-1/4 overflow-hidden">
              <motion.img
                src={`${baseUrl === "/" ? "" : baseUrl}/images/${idx}.jpg`}
                className="w-full h-full bg-white object-cover"
                initial={{
                  scale: 1.1,
                }}
                whileHover={{
                  scale: 1.3,
                }}
              />
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
