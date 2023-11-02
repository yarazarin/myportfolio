import "./ContactForm.css";

import React, { useState } from "react";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const [captchaValue, setCaptchaValue] = useState(null);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleReset = () => {
    setFirstName("");
    setEmail("");
    setMessage("");
    setEmailSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (captchaValue === null) {
      alert("Please complete the CAPTCHA");
      return;
    }

    const templateParams = {
      firstName: firstName,
      email: email,
      message: message,
      subject: "Porto website",
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (response) => {
          console.log("Email sent successfully");
          setEmailSent(true);
        },
        () => {
          console.error("Failed to send email");
        }
      );

    handleReset();
    setCaptchaValue(null);
  };

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      {emailSent ? (
        <p>Email sent successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">
              First Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              placeholder="Your first name"
              onChange={handleFirstNameChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Your email address"
              onChange={handleEmailChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">
              Message <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              id="message"
              value={message}
              placeholder="Type your message here..."
              onChange={handleMessageChange}
              required
              className="form-control user-message"
            />
          </div>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={setCaptchaValue}
          />
          <button type="submit" className="btn-primary">
            Send
          </button>
          <button type="reset" className="btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
