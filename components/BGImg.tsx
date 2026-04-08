"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function BgImage({ bgimage }: { bgimage?: string }) {
  const [current, setCurrent] = useState("/assets/bg.jpg");
  const [incoming, setIncoming] = useState<string | null>(null);
  const [showIncoming, setShowIncoming] = useState(false);

  // when bgimage changes, prepare incoming layer
  useEffect(() => {
    if (bgimage && bgimage !== current) {
      setIncoming(bgimage);
      setShowIncoming(false); // start hidden
    }
  }, [bgimage, current]);

  return (
    <div className="absolute inset-0">
      {/* Current (base) */}
      <Image
        src={current}
        alt="bg-current"
        fill
        className="object-cover"
        priority
      />

      {/* Incoming (top, fades in) */}
      {incoming && (
        <Image
          key={incoming} // ensures a fresh mount
          src={incoming}
          alt="bg-incoming"
          fill
          className={`object-cover transition-opacity duration-700 ${
            showIncoming ? "opacity-100" : "opacity-0"
          }`}
          onLoadingComplete={() => {
            // small delay ensures transition kicks even if cached
            requestAnimationFrame(() => setShowIncoming(true));

            // after fade completes, promote incoming → current
            setTimeout(() => {
              setCurrent(incoming);
              setIncoming(null);
              setShowIncoming(false);
            }, 700); // match duration
          }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}