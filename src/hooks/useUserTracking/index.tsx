import { useEffect } from "react";
import { useTimer } from "../useTimer";
import { useNavigate } from "react-router-dom";

export function useUserTracking() {
  const navigate = useNavigate();
  const { time, start, reset} = useTimer();

  useEffect(() => {
    const registrarEvento = (tipo: string, detalhes = {}) => {
      const log = {
        tipo,
        horario: new Date().toISOString(),
        ...detalhes,
      };
      console.log(log);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target;
      if (target instanceof HTMLElement) {
        registrarEvento("click", {
          tag: target.tagName,
          id: target.id,
          class: target.className,
          texto: target.innerText?.slice(0, 50),
        });
      }
      reset(); 
    };

    const handleScroll = () => {
      registrarEvento("scroll", {
        scrollY: window.scrollY,
      });
      reset(); 
    };

    const handleKeydown = (e: KeyboardEvent) => {
      registrarEvento("keydown", {
        tecla: e.key,
      });
      reset();
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeydown);

    start();

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [reset, start]);

  useEffect(() => {
    if (time >= 45) {
      navigate("/");
    }
  }, [time, navigate]);
}
