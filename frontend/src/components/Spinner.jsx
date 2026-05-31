import { useEffect, useRef, useState } from 'react';

const FONTS = [
  'Anton', 'Georgia', 'Courier New', 'Impact',
  'Trebuchet MS', 'Palatino', 'Verdana', 'Arial Black'
];

const Spinner = ({ minMs = 1500, loading, onHide }) => {
  const textRef = useRef(null);
  const [phase, setPhase] = useState('enter');
  const minDone = useRef(false);
  const loadingDone = useRef(false);

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

  const tryExit = () => {
    if (minDone.current && loadingDone.current) {
      setPhase('exit');
      setTimeout(() => onHide?.(), 600); // espera animación de salida
    }
  };

  // Tiempo mínimo
  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase('hold'), 400);
    const minTimer = setTimeout(() => {
      minDone.current = true;
      tryExit();
    }, minMs);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(minTimer);
    };
  }, []);

  // Cuando el hook termina de cargar
  useEffect(() => {
    if (!loading) {
      loadingDone.current = true;
      tryExit();
    }
  }, [loading]);

  return (
    <div className={`spinner-overlay spinner-overlay--${phase}`}>
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