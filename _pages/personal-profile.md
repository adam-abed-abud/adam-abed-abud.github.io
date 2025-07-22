---
layout: page
title: Personal Profile
permalink: /personal-profile/
description: A deeper dive into who I am - my journey, passions, and what drives me forward.
nav: true
nav_order: 2
---

<style>
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  margin: -2rem -2rem 3rem -2rem;
  text-align: center;
  border-radius: 0 0 20px 20px;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 1rem;
  color: white;
}

.hero-section .subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.stat-card {
  background: var(--global-card-bg-color, #fff);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--global-divider-color, #eee);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--global-theme-color);
  display: block;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--global-text-color-light, #666);
  margin-top: 0.5rem;
}

.journey-timeline {
  position: relative;
  padding: 2rem 0;
}

.timeline-item {
  display: flex;
  margin-bottom: 3rem;
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: -3rem;
  width: 2px;
  background: linear-gradient(180deg, var(--global-theme-color) 0%, transparent 100%);
}

.timeline-icon {
  width: 40px;
  height: 40px;
  background: var(--global-theme-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 2rem;
  z-index: 1;
  position: relative;
}

.timeline-content {
  flex: 1;
  background: var(--global-card-bg-color, #fff);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  border-left: 4px solid var(--global-theme-color);
}

.timeline-content h3 {
  margin-top: 0;
  color: var(--global-theme-color);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.skill-category {
  background: var(--global-card-bg-color, #fff);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid var(--global-divider-color, #eee);
}

.skill-category h3 {
  color: var(--global-theme-color);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: var(--global-theme-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  transform: scale(1.05);
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
}

.interests-section {
  background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 3rem;
  border-radius: 20px;
  margin: 3rem 0;
  text-align: center;
}

.interests-section h2 {
  color: white;
  margin-bottom: 2rem;
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.interest-card {
  background: rgba(255,255,255,0.1);
  padding: 1.5rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.interest-card:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-3px);
}

.interest-card i {
  font-size: 2rem;
  margin-bottom: 1rem;
  display: block;
}

.philosophy-quote {
  background: var(--global-card-bg-color, #fff);
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  margin: 3rem 0;
  border-left: 5px solid var(--global-theme-color);
  position: relative;
  overflow: hidden;
}

.philosophy-quote::before {
  content: '"';
  font-size: 8rem;
  color: var(--global-theme-color);
  opacity: 0.1;
  position: absolute;
  top: -2rem;
  left: 2rem;
  font-family: serif;
}

.philosophy-quote p {
  font-size: 1.3rem;
  font-style: italic;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.philosophy-quote .author {
  color: var(--global-theme-color);
  font-weight: bold;
}

.countries-visited {
  text-align: center;
  margin: 2rem 0;
}

.country-flags {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}

.country-flag {
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 10px;
}

.country-flag:hover {
  transform: scale(1.2);
  background: var(--global-card-bg-color, #fff);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;
    margin: -1rem -1rem 2rem -1rem;
  }
  
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .profile-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .timeline-item {
    flex-direction: column;
    text-align: center;
  }
  
  .timeline-item::before {
    display: none;
  }
  
  .timeline-icon {
    margin: 0 auto 1rem auto;
  }
}
</style>

<div class="hero-section">
  <h1>Adam Abed Abud</h1>
  <p class="subtitle">
    A passionate scientist, engineer, and entrepreneur bridging the gap between cutting-edge technology and real-world solutions. 
    Always learning, always building, always pushing boundaries.
  </p>
</div>

<div class="profile-stats">
  <div class="stat-card">
    <span class="stat-number">6</span>
    <div class="stat-label">Countries Lived In</div>
  </div>
  <div class="stat-card">
    <span class="stat-number">10+</span>
    <div class="stat-label">Years in R&D</div>
  </div>
  <div class="stat-card">
    <span class="stat-number">15+</span>
    <div class="stat-label">Programming Languages</div>
  </div>
  <div class="stat-card">
    <span class="stat-number">∞</span>
    <div class="stat-label">Curiosity Level</div>
  </div>
</div>

## My Journey 🚀

<div class="journey-timeline">
  <div class="timeline-item">
    <div class="timeline-icon">
      <i class="fas fa-flag"></i>
    </div>
    <div class="timeline-content">
      <h3>The Beginning - Iraq</h3>
      <p>Born and raised in Iraq <img src="../assets/img/iraq.png" height="20px" />, where my curiosity for how things work began. The rich cultural heritage and challenges of my homeland shaped my resilience and determination to make a positive impact through technology.</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-icon">
      <i class="fas fa-graduation-cap"></i>
    </div>
    <div class="timeline-content">
      <h3>Academic Foundation - Europe</h3>
      <p>Pursued my education across Europe, earning my MSc in Nuclear and Particle Physics and PhD in Applied Physics. Living in Italy <img src="../assets/img/italy.png" height="20px" />, Germany <img src="../assets/img/germany.png" height="20px" />, Sweden <img src="../assets/img/sweden.png" height="20px" />, France <img src="../assets/img/france.png" height="20px" />, and Switzerland <img src="../assets/img/switzerland.png" height="20px" /> taught me to adapt, learn languages, and appreciate diverse perspectives.</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-icon">
      <i class="fas fa-atom"></i>
    </div>
    <div class="timeline-content">
      <h3>CERN Experience</h3>
      <p>Worked on cutting-edge data acquisition systems handling terabytes per second. Led development of mission-critical software for particle physics experiments, combining my love for physics with software engineering excellence.</p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-icon">
      <i class="fas fa-rocket"></i>
    </div>
    <div class="timeline-content">
      <h3>Innovation & Entrepreneurship</h3>
      <p>Transitioned into the startup ecosystem, serving as a competition judge and business mentor. Helping companies scale through B2B strategies, marketing, and branding while continuing to push the boundaries of technology.</p>
    </div>
  </div>
</div>

## Core Expertise 🛠️

<div class="skills-grid">
  <div class="skill-category">
    <h3><i class="fas fa-code"></i> Technical Mastery</h3>
    <div class="skill-tags">
      <span class="skill-tag">C++</span>
      <span class="skill-tag">Python</span>
      <span class="skill-tag">Machine Learning</span>
      <span class="skill-tag">Data Engineering</span>
      <span class="skill-tag">High-Performance Computing</span>
      <span class="skill-tag">Storage Technologies</span>
      <span class="skill-tag">Computer Vision</span>
    </div>
  </div>

  <div class="skill-category">
    <h3><i class="fas fa-chart-line"></i> Business & Strategy</h3>
    <div class="skill-tags">
      <span class="skill-tag">B2B Strategy</span>
      <span class="skill-tag">Startup Mentoring</span>
      <span class="skill-tag">Product Development</span>
      <span class="skill-tag">Market Analysis</span>
      <span class="skill-tag">Brand Building</span>
      <span class="skill-tag">Growth Hacking</span>
    </div>
  </div>

  <div class="skill-category">
    <h3><i class="fas fa-brain"></i> Research & Innovation</h3>
    <div class="skill-tags">
      <span class="skill-tag">Algorithm Design</span>
      <span class="skill-tag">Performance Optimization</span>
      <span class="skill-tag">Scientific Computing</span>
      <span class="skill-tag">Data Analysis</span>
      <span class="skill-tag">System Architecture</span>
      <span class="skill-tag">Technology Evaluation</span>
    </div>
  </div>

  <div class="skill-category">
    <h3><i class="fas fa-users"></i> Leadership & Communication</h3>
    <div class="skill-tags">
      <span class="skill-tag">Team Leadership</span>
      <span class="skill-tag">Cross-cultural Communication</span>
      <span class="skill-tag">Technical Writing</span>
      <span class="skill-tag">Public Speaking</span>
      <span class="skill-tag">Project Management</span>
      <span class="skill-tag">Mentorship</span>
    </div>
  </div>
</div>

<div class="interests-section">
  <h2>Beyond the Code 🌟</h2>
  <p>What makes me tick when I'm not optimizing algorithms or building systems</p>
  
  <div class="interests-grid">
    <div class="interest-card">
      <i class="fas fa-dna"></i>
      <h3>Bio-hacking</h3>
      <p>Fascinated by optimizing human performance through technology, nutrition, and lifestyle design. Always experimenting with new approaches to enhance cognitive and physical capabilities.</p>
    </div>
    
    <div class="interest-card">
      <i class="fas fa-utensils"></i>
      <h3>Culinary Fusion</h3>
      <p>Love experimenting with cuisines from different cultures I've lived in. Iraqi comfort foods meet Italian pasta, German precision meets French elegance.</p>
    </div>
    
    <div class="interest-card">
      <i class="fas fa-scroll"></i>
      <h3>History Buff</h3>
      <p>Reading about historical patterns, technological revolutions, and how societies adapt to change. History informs my approach to innovation and future-thinking.</p>
    </div>
    
    <div class="interest-card">
      <i class="fas fa-microchip"></i>
      <h3>Hardware Tinkering</h3>
      <p>Building home automation systems with Arduino and ESP32. There's something magical about bridging the physical and digital worlds.</p>
    </div>
  </div>
</div>

<div class="countries-visited">
  <h2>Global Perspective 🌍</h2>
  <p>Living across continents has shaped my worldview and approach to problem-solving</p>
  
  <div class="country-flags">
    <div class="country-flag">
      <img src="../assets/img/iraq.png" height="40px" title="Iraq - Where it all began" />
    </div>
    <div class="country-flag">
      <img src="../assets/img/italy.png" height="40px" title="Italy - La dolce vita and academic rigor" />
    </div>
    <div class="country-flag">
      <img src="../assets/img/germany.png" height="40px" title="Germany - Engineering excellence and precision" />
    </div>
    <div class="country-flag">
      <img src="../assets/img/sweden.png" height="40px" title="Sweden - Innovation and sustainability mindset" />
    </div>
    <div class="country-flag">
      <img src="../assets/img/france.png" height="40px" title="France - Intellectual discourse and culinary arts" />
    </div>
    <div class="country-flag">
      <img src="../assets/img/switzerland.png" height="40px" title="Switzerland - Precision and multicultural harmony" />
    </div>
  </div>
  
  <p><em>Each country taught me something unique about innovation, culture, and the human spirit</em></p>
</div>

<div class="philosophy-quote">
  <p>"The intersection of technology and humanity is where the most meaningful innovations emerge. Every line of code, every algorithm, every system should ultimately serve to enhance human potential and solve real-world challenges."</p>
  <div class="author">— My approach to technology and life</div>
</div>

## What Drives Me Forward 🎯

The convergence of multiple passions and experiences has shaped my unique perspective:

- **🔬 Scientific Rigor**: My physics background taught me to question assumptions, design experiments, and seek evidence-based solutions
- **💻 Engineering Excellence**: Building systems that can handle massive scale while maintaining elegance and efficiency
- **🚀 Entrepreneurial Spirit**: Understanding that great technology means nothing without proper execution and market fit
- **🌍 Global Mindset**: Appreciating how different cultures approach problems and leveraging diverse perspectives
- **📚 Continuous Learning**: Technology evolves rapidly, and staying curious is the only way to stay relevant

## Let's Connect 🤝

I'm always excited to discuss:
- Cutting-edge storage technologies and their applications
- The intersection of AI/ML with traditional engineering
- Startup challenges and scaling strategies
- Cross-cultural perspectives on innovation
- The latest in bio-hacking and human optimization
- Anything that challenges conventional thinking!

---

*"Life is too short to work on boring problems. Let's build something amazing together."* 