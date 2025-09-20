/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import "./styles/event.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Event = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          A<span className="hat-h2">bout</span>
          <div>
            <span className="do-h2">the<br/> event</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>DEVELOP</h3>
              <h4>What to do</h4>
              <p>
                From a wide range of problem statements related to real world problems, developers have to pitch out a solution and build a project around it in a span of 24 hours.
              </p>
              <p>
                The event is open to all students and developers who are interested in contributing to open source projects and learning.
              </p>
              {/* <h5>Skillset & tools</h5> */}
              {/* <div className="what-content-flex">
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">Three.js</div>
                <div className="what-tags">React</div>
                <div className="what-tags">Postgres SQL</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">Next.js</div>
                <div className="what-tags">Electron.js</div>
                <div className="what-tags">Tailwind CSS</div>
              </div> */}
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>DESIGN</h3>
              <h4>What to do</h4>
              <p>
                Participants will engage in hands-on design challenges, collaborating to create user-friendly interfaces and engaging visual content. This is an opportunity to apply design thinking principles and receive feedback from peers and mentors.
              </p>
              {/* <h5>Skillset & tools</h5> */}
              {/* <div className="what-content-flex">
                <div className="what-tags">Blender</div>
                <div className="what-tags">After Effects</div>
                <div className="what-tags">UI</div>
                <div className="what-tags">Motion Graphics</div>
                <div className="what-tags">Figma</div>
                <div className="what-tags">Photoshop</div>
                <div className="what-tags">Character Design</div>
                <div className="what-tags">Modelling</div>
                <div className="what-tags">Cinematic Video Editing</div>
              </div> */}
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
