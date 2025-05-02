import { useState, useEffect, useRef, useCallback } from "react";

interface UseTimerOptions {
  interval?: number;
  autoStart?: boolean;
}

export function useTimer({ interval = 1000, autoStart = true }: UseTimerOptions = {}) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, interval);
      setIsRunning(true);
    }
  }, [interval]);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  }, []);  // Não precisa depender de nada

  // Reinicia o temporizador
  const reset = useCallback(() => {
    pause();
    setTime(0);
    if (autoStart) start();
  }, [autoStart, pause, start]);
  
  useEffect(() => {
    if (autoStart) start();

    return pause;
  }, [autoStart, start, pause]);

  return { time, isRunning, start, reset };
}
