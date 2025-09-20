import React, { useEffect, useState, useRef } from "react";
import "./styles/CountDownTimer.css";

const RELEASE_DATE = new Date("2025-10-01T00:00:00");

function getTimeRemaining() {
  const now = new Date();
  const total = RELEASE_DATE.getTime() - now.getTime();
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { total, days, hours, minutes, seconds };
}

const CountdownTimer: React.FC = () => {
  const [time, setTime] = useState(getTimeRemaining());
  const pointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const movePointer = (e: MouseEvent) => {
      if (pointerRef.current) {
        pointerRef.current.style.left = `${e.clientX}px`;
        pointerRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", movePointer);
    return () => window.removeEventListener("mousemove", movePointer);
  }, []);

  return (
    <div className="countdown-bg">
      <div className="countdown-card">
        {/* Star Field inside the card */}
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="star card-star" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`
          }} />
        ))}
        
        <h1 className="countdown-title">HactoberFest Starting in </h1>
        <p className="countdown-sub">
          Get ready to code <span className="date-highlight">on October 1, 2025</span>
        </p>
        <div className="countdown-values">
          <div>
            <span className="countdown-number">{String(time.days).padStart(2, "0")}</span>
            <span className="countdown-label">DAYS</span>
          </div>
          <div>
            <span className="countdown-number">{String(time.hours).padStart(2, "0")}</span>
            <span className="countdown-label">HOURS</span>
          </div>
          <div>
            <span className="countdown-number">{String(time.minutes).padStart(2, "0")}</span>
            <span className="countdown-label">MINUTES</span>
          </div>
          <div>
            <span className="countdown-number">{String(time.seconds).padStart(2, "0")}</span>
            <span className="countdown-label">SECONDS</span>
          </div>
        </div>
      </div>
      <div ref={pointerRef} className="custom-pointer" />
    </div>
  );
};

export default CountdownTimer;
