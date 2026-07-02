import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

/**
 * @typedef {{ src: string, alt?: string }} ParallaxImage
 */

/**
 * @param {{
 *   images: ParallaxImage[],
 *   eyebrow?: string,
 *   title?: React.ReactNode,
 *   subtitle?: string,
 * }} props
 * Максимум 7 изображений — порядок в массиве определяет позицию/размер блока.
 * eyebrow/title/subtitle — текст баннера, который лежит над снимками
 * и плавно растворяется в первой части скролла.
 */
export function ZoomParallax({ images, eyebrow, title, subtitle }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  // Баннер виден в начале и гаснет вместе с приближением картинок
  const bannerOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const bannerY = useTransform(scrollYProgress, [0, 0.18], [0, -40]);

  const hasBanner = eyebrow || title || subtitle;

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {hasBanner && (
          <motion.div
            style={{ opacity: bannerOpacity, y: bannerY }}
            className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
          >
            {eyebrow && (
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-200 text-sm md:text-base">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 z-10 flex h-full w-full items-center justify-center ${
                index === 1
                  ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]'
                  : ''
              } ${
                index === 2
                  ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]'
                  : ''
              } ${
                index === 3
                  ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]'
                  : ''
              } ${
                index === 4
                  ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]'
                  : ''
              } ${
                index === 5
                  ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]'
                  : ''
              } ${
                index === 6
                  ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]'
                  : ''
              }`}
            >
              <div className="relative h-[25vh] w-[25vw]">
                <img
                  src={src || '/placeholder.svg'}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}