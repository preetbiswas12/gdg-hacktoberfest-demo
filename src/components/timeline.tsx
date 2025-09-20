import "./styles/timeline.css";

const Timeline = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Events <span>&</span>
          <br /> Timeline
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Workshop on Git-Github</h4>
                <h5>Galgotias University</h5>
              </div>
              <h3>1/10</h3>
            </div>
            <p>
            Students and developers will embark on a journey to learn about the use of git-github and version controls with the hands on workshop conducted by industry experts.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathon</h4>
                <h5>Galgotias University</h5>
              </div>
              <h3>2/10</h3>
            </div>
            <p>
              Starting the main event of HacktoberFest, where developers will be given a wide range of problem statements to choose from and build a project around it in a span of 24 hours.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Open-Source</h4>
                <h5>Galgotias University</h5>
              </div>
              <h3>3/10</h3>
            </div>
            <p>
              Students will contribute to opensource and gain hand on industrial experience by working on real world projects alongside tech leads.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>The Final Merge</h4>
                <h5>Galgotias University</h5>
              </div>
              <h3>5/10</h3>
            </div>
             <p>
              Event ends with the closing ceremony and prize distribution to the winners and participants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
