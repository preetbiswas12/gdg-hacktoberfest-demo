import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://chat.whatsapp.com/HVsWFjRedU0IlbYBwY8IQS?mode=ems_copy_t"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              WhatsApp <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/company/gdg-on-campus-galgotias-university/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="https://www.instagram.com/gdgocgu?igsh=ZGdramRrZjB3bWV3"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
            <a
              href="https://gdg.community.dev/gdg-on-campus-galgotias-university-greater-noida-india/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              GDG <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Organised & Presented  <br /> by <span>GDG on Campus <br/>Galgotias University</span>
            </h2>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
