import { useState } from 'react';
import { Orbit } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ResilientImage({ src, alt, className = '' }: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#16130E] to-[#080705] text-[#E6CF8B] p-6 border border-[#D4AF37]/25 ${className}`}
      >
        <Orbit className="w-8 h-8 text-[#D4AF37]" aria-hidden="true" />
        <span className="text-xs text-center max-w-xs leading-relaxed">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
