import { useEffect, useState } from 'react';
import { Lightbulb } from 'lucide-react';

interface InsightPanelProps {
  insights: string[];
}

export function InsightPanel({ insights }: InsightPanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % insights.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [insights.length]);

  return (
    null
  );
}