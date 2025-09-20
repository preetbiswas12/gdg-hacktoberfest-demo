import { Suspense, PropsWithChildren, useEffect, useState, lazy } from "react";
import About from "./About";
import Timeline from "./timeline";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import Event from "./event";
import setSplitText from "./utils/splitText";
import Speakers from "./Speakers";
import GoogleSheetsForm from "./GoogleSheetsForm";
import CountdownTimer from "./CountDownTimer";

 const Location = lazy(() => import("./location"));
 
const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="conatienr-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <Event />
            <Timeline />
            <CountdownTimer />
            <Speakers />
            <GoogleSheetsForm />
            <Suspense fallback={<div>Loading....</div>}>
              <Location />
            </Suspense>
            <Contact />
          </div>
        </div>
      </div>
      </div>
  );
};

export default MainContainer;
