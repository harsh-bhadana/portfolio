"use client";

import { useEffect, useRef } from "react";

interface AlwaysAnimatedIconProps {
  icon: any;
  size?: number;
  className?: string;
}

const AlwaysAnimatedIcon = ({ icon: Icon, size = 20, className = "" }: AlwaysAnimatedIconProps) => {
  const iconRef = useRef<any>(null);

  useEffect(() => {
    const trigger = () => {
      if (iconRef.current) {
        iconRef.current.startAnimation();
      }
    };
    
    // Initial trigger with some randomness to prevent synchronized jumping
    const timeout = setTimeout(trigger, Math.random() * 2000);
    const interval = setInterval(trigger, 5000 + Math.random() * 2000);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return <Icon ref={iconRef} size={size} className={className} />;
};

export default AlwaysAnimatedIcon;
