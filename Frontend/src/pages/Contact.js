import React, { useState } from 'react';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1>Get In Touch</h1>
            <p>
              Have questions? We'd love to hear from you. Send us a message and 
              we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>
                Reach out to us through any of the following channels. We're here to help 
                and answer any questions you might have.
              </p>

              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-details">
                    <h3>Address</h3>
                    <p>
                      123 Shopping Street<br />
                      Commerce City, CC 12345<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-details">
                    <h3>Phone</h3>
                    <p>
                      <a href="tel:+1234567890">+1 (234) 567-8900</a><br />
                      <span className="contact-hours">Mon-Fri: 9AM-6PM EST</span>
                    </p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-details">
                    <h3>Email</h3>
                    <p>
                      <a href="mailto:hello@modernshop.com">hello@modernshop.com</a><br />
                      <a href="mailto:support@modernshop.com">support@modernshop.com</a>
                    </p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">💬</div>
                  <div className="contact-details">
                    <h3>Live Chat</h3>
                    <p>
                      Available 24/7 on our website<br />
                      <span className="contact-hours">Instant support</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="social-media">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="#" className="social-link">📘 Facebook</a>
                  <a href="#" className="social-link">🐦 Twitter</a>
                  <a href="#" className="social-link">📷 Instagram</a>
                  <a href="#" className="social-link">💼 LinkedIn</a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-container">
                <h2>Send us a Message</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Customer Support</option>
                      <option value="orders">Order Questions</option>
                      <option value="returns">Returns & Refunds</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Please describe your inquiry in detail..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-large">
                    Send Message
                  </button>
                </form>

                <div className="form-note">
                  <p>
                    * Required fields. We typically respond within 24 hours during business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How can I track my order?</h3>
              <p>
                Once your order ships, you'll receive a tracking number via email. 
                You can use this number to track your package on our website or the carrier's site.
              </p>
            </div>
            <div className="faq-item">
              <h3>What is your return policy?</h3>
              <p>
                We offer a 30-day return policy for most items. Products must be in 
                original condition with tags attached. Some restrictions apply.
              </p>
            </div>
            <div className="faq-item">
              <h3>Do you offer international shipping?</h3>
              <p>
                Yes, we ship to over 50 countries worldwide. Shipping costs and 
                delivery times vary by location. Check our shipping page for details.
              </p>
            </div>
            <div className="faq-item">
              <h3>How can I change or cancel my order?</h3>
              <p>
                Orders can be modified or cancelled within 1 hour of placement. 
                After that, please contact our customer service team for assistance.
              </p>
            </div>
          </div>
          <div className="faq-cta">
            <p>Still have questions?</p>
            <a href="#contact-form" className="btn btn-secondary">Contact Support</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
