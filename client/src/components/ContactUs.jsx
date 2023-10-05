import React, { useState } from "react";
import Navbar from "./Navbar";
import { BsFillSendFill } from "react-icons/bs";
import Footer from "./Footer";

function ContactUs() {
  const [emailError, setEmailError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const initialFormData = {
    name: "",
    email: "",
    message: "",
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email" && !validateEmail(value)) {
      setEmailError(!emailError);
    } else {
      setEmailError(!emailError);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    setFormData(initialFormData);
  };

  return (
    <section className="flex flex-col">
      <Navbar />
      <section className="contact flex justify-between items-center gap-4 rounded-lg">
        <article className="text-white w-[36rem]">
          <h1 className="text-5xl font-bold">Have Any Questions ??,</h1>
          <h2 className="text-2xl font-bold py-3">We'd Love To Hear Them.</h2>
          <p className="text-xl">
            Please fill out the form and let us know about your concerns.We will
            try our best to provide an optimized and timely solution.
          </p>
        </article>

        <form className="contactForm" onSubmit={handleSubmit}>
          <div className="formControl ">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="formControl relative">
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
            />
            {/* {emailError && (
              <small className="error absolute bottom-[-.3rem] right-0 text-sm text-orange-600">
                Invalid email address
              </small>
            )} */}
          </div>
          <div className="formControl">
            <label htmlFor="message">Leave us a message</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              cols="30"
              rows="8"
              placeholder="please type your message here..."
              required
            ></textarea>
          </div>
          <div className="formControl">
            <button className="submit" type="submit">
              <BsFillSendFill className="form-btn w-32 h-20 hover:border-white  hover:text-white hover:bg-transparent transition-colors ease-in-out duration-300" />
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </section>
  );
}

export default ContactUs;
