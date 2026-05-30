import { useEffect } from 'react';

const PIECES = 40;

const WelcomeScreen = ({ onFinish, fading }) => {
  useEffect(() => {
    const style = document.getElementById('dynamic-animations');
    let css = '';

    for (let i = 0; i < PIECES; i++) {
      const key = i + 1;
      const row = Math.floor(i / 20);

      const r = Math.max(0, 255 - key * 2);
      const g = Math.max(0, 50 - key / 2);
      const b = key * 3;

      const x1 = (Math.floor(i / 2) * 10) % 100;
      const x2 = (Math.floor(key / 2) * 10) % 100;
      const x3 = (Math.ceil(key / 2) * 10) % 100;
      const y1 = (row * 50) % 100;
      const y2 = ((key % 2 === 0 ? 0 : 50) + row * 50) % 100;
      const y3 = ((row + 1) * 50) % 100;

      const originX = Math.random() * 100;
      const originY = Math.random() * 100;

      const initX = Math.floor(Math.random() * 1000) - 500;
      const initY = Math.floor(Math.random() * 1000) - 500;
      const initZ = Math.floor(Math.random() * 1000) - 500;
      const initDepth = Math.floor(Math.random() * 3000) - 2500;
      const delay = i * 30;

      css += `
        .text-${key} {
          color: rgba(${r}, ${g}, ${b}, 1);
          clip-path: polygon(${x1}% ${y1}%, ${x2}% ${y2}%, ${x3}% ${y3}%);
          transform-origin: ${originX}% ${originY}%;
          animation: fly${key} 5000ms ${delay}ms cubic-bezier(0.36, 0.1, 0.16, 1) forwards;
        }
        @keyframes fly${key} {
          0% {
            opacity: 0;
            clip-path: polygon(${x1}% ${y1}%, ${x2}% ${y2}%, ${x3}% ${y3}%);
            transform: translate(-50%, -50%) rotateX(${initX}deg) rotateY(${initY}deg) rotateZ(${initZ}deg) translateZ(${initDepth}px);
          }
          10% {
            opacity: 0;
          }
          90% {
            opacity: 1;
            clip-path: polygon(${x1}% ${y1}%, ${x2}% ${y2}%, ${x3}% ${y3}%);
            transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateZ(0px);
          }
          100% {
            opacity: 1;
            clip-path: none;
            transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateZ(0px);
          }
        }
      `;
    }

    style.innerHTML = css;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 7000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`welcome-screen ${fading ? 'fade-out' : ''}`}>      
    <div id="ui">
        {Array.from({ length: PIECES }).map((_, i) => (
          <div key={i} className={`text text-${i + 1}`}>
            Sistema de Inventarios
          </div>
        ))}
      </div>
      <div className="welcome-footer">
        <p>Desarrollado por <strong>Sergio Andres Lozano Bueno</strong></p>
        <p className="welcome-sub">Prueba Tecnica EC Cargos</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;