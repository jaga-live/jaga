import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

const AnimatedBackground = () => {
  const [targetSection, setTargetSection] = useState(0);
  const sectionProgress = useMotionValue(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;
          const sectionIndex = Math.floor(scrollPosition / windowHeight);
          const newSection = Math.min(sectionIndex, 4);

          if (newSection !== targetSection) {
            setTargetSection(newSection);
            animate(sectionProgress, newSection, {
              duration: 1.8,
              ease: [0.25, 0.1, 0.25, 1],
            });
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetSection, sectionProgress]);

  // Pre-parse all colors once to avoid repeated string parsing
  const parsedColors = useMemo(() => {
    const sectionGradients = [
      [
        "rgba(103, 58, 183, 0.6)",
        "rgba(63, 81, 181, 0.5)",
        "rgba(33, 150, 243, 0.55)",
      ], // Deep Purple/Blue
      [
        "rgba(0, 188, 212, 0.6)",
        "rgba(0, 150, 136, 0.5)",
        "rgba(33, 150, 243, 0.55)",
      ], // Cyan/Teal
      [
        "rgba(156, 39, 176, 0.6)",
        "rgba(233, 30, 99, 0.5)",
        "rgba(103, 58, 183, 0.55)",
      ], // Purple/Pink
      [
        "rgba(33, 150, 243, 0.6)",
        "rgba(3, 169, 244, 0.5)",
        "rgba(0, 188, 212, 0.55)",
      ], // Blue/Cyan
      [
        "rgba(233, 30, 99, 0.6)",
        "rgba(255, 64, 129, 0.5)",
        "rgba(156, 39, 176, 0.55)",
      ], // Pink/Rose
    ];

    const parseRgba = (rgba: string) => {
      const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      return match
        ? [
            parseInt(match[1]),
            parseInt(match[2]),
            parseInt(match[3]),
            parseFloat(match[4]),
          ]
        : [0, 0, 0, 0];
    };

    return sectionGradients.map((section) => section.map(parseRgba));
  }, []);

  // Optimized color interpolation without string parsing
  const interpolateColor = (progress: number, blobIndex: number) => {
    const currentIdx = Math.floor(progress);
    const nextIdx = Math.min(currentIdx + 1, parsedColors.length - 1);
    const factor = progress - currentIdx;

    const curr = parsedColors[currentIdx][blobIndex];
    const next = parsedColors[nextIdx][blobIndex];

    const r = Math.round(curr[0] + (next[0] - curr[0]) * factor);
    const g = Math.round(curr[1] + (next[1] - curr[1]) * factor);
    const b = Math.round(curr[2] + (next[2] - curr[2]) * factor);
    const a = curr[3] + (next[3] - curr[3]) * factor;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const color0 = useTransform(sectionProgress, (v) => interpolateColor(v, 0));
  const color1 = useTransform(sectionProgress, (v) => interpolateColor(v, 1));
  const color2 = useTransform(sectionProgress, (v) => interpolateColor(v, 2));

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0a15] to-[#0a0a0f]" />

      {/* Optimized gradient blobs - spread toward corners with smooth color interpolation */}
      <motion.div
        animate={{
          x: ["-15%", "15%", "-15%"],
          y: ["-10%", "10%", "-10%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[5%] left-[10%] w-[700px] h-[700px] rounded-full blur-3xl will-change-transform"
        style={{
          background: useTransform(
            color0,
            (c) => `radial-gradient(circle, ${c} 0%, transparent 65%)`
          ),
        }}
      />

      <motion.div
        animate={{
          x: ["15%", "-15%", "15%"],
          y: ["10%", "-10%", "10%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[40%] right-[5%] w-[800px] h-[800px] rounded-full blur-3xl will-change-transform"
        style={{
          background: useTransform(
            color1,
            (c) => `radial-gradient(circle, ${c} 0%, transparent 65%)`
          ),
        }}
      />

      <motion.div
        animate={{
          x: ["-10%", "10%", "-10%"],
          y: ["15%", "-15%", "15%"],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[10%] left-[35%] w-[650px] h-[650px] rounded-full blur-3xl will-change-transform"
        style={{
          background: useTransform(
            color2,
            (c) => `radial-gradient(circle, ${c} 0%, transparent 65%)`
          ),
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
