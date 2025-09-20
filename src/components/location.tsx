/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react';
import './styles/location.css';

// Left box image configuration
const techImages = {
  leftBox: {
    src: '/map.png',
    style: {
      transform: 'translateX(-50%) translateY(10%) scale(1.2)',
    },
  },
};

const Location = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const boxesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const delay = target.dataset.delay || '0s';
            target.style.animation = `fadeInUp 0.8s ${delay} forwards`;
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.1 }
    );

    boxesRef.current.forEach((box) => {
      if (box) observer.observe(box);
    });

    return () => {
      boxesRef.current.forEach((box) => {
        if (box) observer.unobserve(box);
      });
    };
  }, []);

  return (
    <section className="insiders-section" ref={sectionRef}>
      <h2 className="section-title">Location</h2>
      <div className="techstack-container">
        {/* Left Box - Image */}
        <div
          className="left-box"
          ref={el => { boxesRef.current[0] = el }}
          data-delay="0.1s"
        >
          {/* <div className="box-content">
            <span className="box-description">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Currently building a custom AI assistant <br/>&nbsp;&nbsp;&nbsp;using Electron JS named
            </span>
            <h3 className="box-title">
              Cypher
            </h3>
          </div> */}
          <img
            src={techImages.leftBox.src}
            alt="Technology stack"
            className="box-png left-png"
            style={techImages.leftBox.style}
          />
        </div>

        {/* Right Container - Single Text Box */}
        <div className="right-text-container" ref={el => { boxesRef.current[1] = el }} data-delay="0.3s">
          <div className="do-h2">
          <h4 >📌 Event Happening at</h4></div>
          <span style={{ fontSize: '1.3em', fontWeight: '500' }}>

  <a href="https://www.google.com/maps/place/Galgotias+University+Block-A/@28.3650107,77.5384253,17z/data=!3m1!4b1!4m6!3m5!1s0x390cc778a08457bd:0x4d40c51e1ec9c109!8m2!3d28.365006!4d77.5410002!16s%2Fg%2F11q7g9_4s5?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
    Galgotias University <br/>
    Plot No. 2, Yamuna Expressway <br/>
    opposite Buddha International Circuit, Sector 17A <br/>
    Greater Noida, Uttar Pradesh 203201.
  </a>
</span>
        </div>
      </div>
    </section>
  );
};

export default Location;
