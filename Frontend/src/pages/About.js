import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About ModernShop</h1>
            <p>
              We're passionate about bringing you the best products at unbeatable prices, 
              with exceptional customer service that makes shopping a pleasure.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="our-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2020, ModernShop started as a small family business with a big dream: 
                to make quality products accessible to everyone. What began as a simple online store 
                has grown into a trusted e-commerce platform serving thousands of customers worldwide.
              </p>
              <p>
                Our journey is driven by innovation, customer satisfaction, and a commitment to 
                excellence. We carefully curate every product in our catalog to ensure you receive 
                only the best quality items at competitive prices.
              </p>
              <div className="story-highlights">
                <div className="highlight">
                  <span className="highlight-icon">🎯</span>
                  <div>
                    <h3>Our Mission</h3>
                    <p>To provide exceptional products and service that exceed customer expectations.</p>
                  </div>
                </div>
                <div className="highlight">
                  <span className="highlight-icon">👁️</span>
                  <div>
                    <h3>Our Vision</h3>
                    <p>To be the world's most trusted and customer-centric e-commerce platform.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <span className="placeholder-icon">🏢</span>
                <p>Our Journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="our-values">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Trust</h3>
              <p>We build lasting relationships with our customers through transparency and reliability.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Innovation</h3>
              <p>We continuously improve our platform and services to enhance your shopping experience.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h3>Quality</h3>
              <p>Every product is carefully selected to meet our high standards of quality and value.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Care</h3>
              <p>Your satisfaction is our priority, and we go above and beyond to make you happy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="our-team">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-description">
            The passionate people behind ModernShop who work hard to bring you the best shopping experience.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <span className="avatar-icon">👨‍💼</span>
              </div>
              <h3>John Smith</h3>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">
                Passionate entrepreneur with 15+ years of e-commerce experience.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <span className="avatar-icon">👩‍💻</span>
              </div>
              <h3>Sarah Johnson</h3>
              <p className="member-role">CTO</p>
              <p className="member-bio">
                Tech innovator focused on creating seamless user experiences.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <span className="avatar-icon">👨‍🎨</span>
              </div>
              <h3>Mike Chen</h3>
              <p className="member-role">Head of Design</p>
              <p className="member-bio">
                Creative designer making our platform beautiful and intuitive.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <span className="avatar-icon">👩‍🔧</span>
              </div>
              <h3>Lisa Rodriguez</h3>
              <p className="member-role">Operations Manager</p>
              <p className="member-bio">
                Logistics expert ensuring fast and reliable product delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">2020</div>
              <div className="stat-label">Founded</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Shop?</h2>
            <p>Discover amazing products and join thousands of satisfied customers.</p>
            <div className="cta-buttons">
              <a href="/products" className="btn btn-primary btn-large">
                Browse Products
              </a>
              <a href="/contact" className="btn btn-secondary btn-large">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
