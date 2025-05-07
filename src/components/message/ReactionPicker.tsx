"use client";

import { useEffect, useRef, useState } from "react";

const emojis = ["💖", "🔥", "😂", "🥲", "💀"];

interface ReactionPickerProps {
  position: "left" | "right";
  onEmojiClick: (emoji: string) => void;
}

const ReactionPicker = ({ position, onEmojiClick }: ReactionPickerProps) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const [finalPosition, setFinalPosition] = useState<
    "left" | "right" | "center"
  >("right");

  useEffect(() => {
    const adjustPosition = () => {
      if (!pickerRef.current) return;

      const rect = pickerRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const padding = 16;

      if (rect.left < padding) {
        setFinalPosition("right");
      } else if (rect.right > window.innerWidth - padding) {
        setFinalPosition("left");
      } else {
        setFinalPosition(position);
      }
    };

    adjustPosition();
    window.addEventListener("resize", adjustPosition);
    return () => window.removeEventListener("resize", adjustPosition);
  }, [position]);

  const positionStyles: Record<typeof finalPosition, string> = {
    left: "right-0",
    right: "left-0",
    center: "left-1/2 -translate-x-1/2",
  };

  return (
    <div
      ref={pickerRef}
      className={`absolute z-10 bottom-1 ${positionStyles[finalPosition]} bg-primary rounded-full flex p-1 justify-between items-center drop-shadow-2xl w-fit gap-2 transition-all duration-300`}
    >
      {emojis.map((emoji, i) => (
        <span
          onClick={() => onEmojiClick(emoji)}
          key={i}
          className="w-6 h-6 text-lg flex justify-center items-center text-center rounded-full cursor-pointer transition-transform hover:scale-125 hover:bg-primary-foreground/5 opacity-0 animate-emojiIn"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default ReactionPicker;
