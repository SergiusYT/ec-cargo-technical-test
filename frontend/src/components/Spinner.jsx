import { useEffect, useRef, useState } from 'react';

const FONTS = [
  'Anton', 'Georgia', 'Courier New', 'Impact',
  'Trebuchet MS', 'Palatino', 'Verdana', 'Arial Black'
];

const Spinner = ({ onDone, minMs = 2500 }) => {
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const [phase, setPhase] = useState('enter'); // 'enter' | 'hold' | 'exit'

  // Cambio de fuente continuo
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (textRef.current) {
        textRef.current.style.fontFamily = FONTS[index % FONTS.length];
        index++;
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Secuencia de animación
  useEffect(() => {
    // 1. Entra (400ms de CSS) → hold
    const enterTimer = setTimeout(() => {
      setPhase('hold');
    }, 400);

    // 2. Después del minMs total, inicia salida
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, minMs);

    // 3. Cuando termina la salida (exit dura 600ms), avisa al padre
    const doneTimer = setTimeout(() => {
      onDone?.();
    }, minMs + 600);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [minMs, onDone]);

  return (
    <div
      ref={overlayRef}
      className={`spinner-overlay spinner-overlay--${phase}`}
    >
      {/* Barra roja inferior inspirada en el original */}
      <div className="spinner-red-bar" />

      <div className="spinner-text-wrapper">
        <span className="spinner-text" ref={textRef}>Cargando</span>
        <div className="spinner-bar" />
        <span className="spinner-sub">Por favor espera...</span>
      </div>
    </div>
  );
};

export default Spinner;