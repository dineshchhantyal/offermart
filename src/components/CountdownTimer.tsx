"use client";
import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  expiryDate: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(expiryDate).getTime() - new Date().getTime();
    if (difference <= 0) return null;
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  if (!timeLeft) {
    return (
      <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
        Expired
      </div>
    );
  }

  const { hours, minutes, seconds } = timeLeft;

  return (
    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
      {hours}h {minutes}m {seconds}s left
    </div>
  );
};