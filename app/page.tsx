import { ContactMap } from "@/components/ContactMap";
import { GallerySection } from "@/components/GallerySection";
import { HeroCounter } from "@/components/HeroCounter";
import { JoinForm } from "@/components/JoinForm";
import { ProgramsAccordion } from "@/components/ProgramsAccordion";
import { RevealArticle, RevealLi } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <Link className="skip-link" href="#main">
        Skip to content
      </Link>

      <SiteHeader />

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-bg" aria-hidden />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Hyderabad &amp; beyond · Telangana</p>
              <h1 id="hero-title" className="hero-title">
                Bengali culture, alive and <span className="text-gradient">at home</span> in Telangana
              </h1>
              <p className="hero-lead">
                We bring together families, artists, and enthusiasts to celebrate language, festivals, music,
                and community—building a bridge between Bengal and Telangana.
              </p>
              <p className="hero-slogan">
                <em>Connecting people through culture</em>
              </p>
              <div className="hero-actions">
                <Link href="#join" className="btn btn-primary">
                  Become a member
                </Link>
                <Link href="#programs" className="btn btn-ghost">
                  What we do
                </Link>
              </div>
              <dl className="hero-stats" aria-label="Quick facts">
                <div className="stat">
                  <dt className="stat-label">Focus</dt>
                  <dd className="stat-value">
                    <HeroCounter target={3} /> languages
                  </dd>
                  <dd className="stat-hint">English · বাংলা · తెలుగు</dd>
                </div>
                <div className="stat">
                  <dt className="stat-label">Community</dt>
                  <dd className="stat-value">All ages</dd>
                  <dd className="stat-hint">Families &amp; youth</dd>
                </div>
                <div className="stat">
                  <dt className="stat-label">Region</dt>
                  <dd className="stat-value">Telangana</dd>
                  <dd className="stat-hint">State-wide reach</dd>
                </div>
              </dl>
            </div>
            <div className="hero-visual" aria-hidden>
              <div className="hero-card hero-card--primary">
                <span className="hero-card-badge">Cultural programs</span>
                <p>Puja, music, theatre, debates, and workshops across the year.</p>
              </div>
              <div className="hero-card hero-card--accent">
                <span className="hero-card-badge">Together</span>
                <p>A welcoming space for Bengalis and friends of Bengal in Telangana.</p>
              </div>
              <div className="hero-orb" />
            </div>
          </div>
        </section>

        <section className="section section--tint" id="about" aria-labelledby="about-title">
          <div className="container narrow">
            <h2 id="about-title" className="section-title">
              About TBCA
            </h2>
            <p className="lead">
              <strong>Telangana Bengali Cultural Association (TBCA)</strong> is a non-profit initiative
              dedicated to preserving Bengali heritage while embracing our life in Telangana. Like sister
              associations that have enriched Hyderabad’s cultural map—such as the long-running community
              work reflected in Telangana Bengali Cultural Association.
              —we focus on grassroots participation, transparent volunteering, and programs that anyone can
              join.
            </p>
            <p>
              From literary adda to children’s language labs, from Durga Puja to Rabindra Jayanti and regional
              collaborations with Telugu friends and neighbours, TBCA is a home for culture without borders.
            </p>
          </div>
        </section>

        <section className="section" id="mission" aria-labelledby="mission-title">
          <div className="container">
            <div className="section-head">
              <h2 id="mission-title" className="section-title">
                How we help Bengali culture in Telangana
              </h2>
              <p className="section-sub">Practical, inclusive, and rooted in community.</p>
            </div>
            <ul className="feature-grid">
              <RevealLi className="feature-card">
                <div className="feature-icon" aria-hidden>
                  🪔
                </div>
                <h3>Festivals &amp; rituals</h3>
                <p>
                  Organizing and supporting Durga Puja, Kali Puja, Saraswati Puja, Pohela Boishakh, and
                  seasonal celebrations with authentic traditions and open doors for newcomers.
                </p>
              </RevealLi>
              <RevealLi className="feature-card">
                <div className="feature-icon" aria-hidden>
                  📖
                </div>
                <h3>Language &amp; literature</h3>
                <p>
                  Reading circles, script workshops for children, and bridges between Bengali and Telugu
                  literary cultures.
                </p>
              </RevealLi>
              <RevealLi className="feature-card">
                <div className="feature-icon" aria-hidden>
                  🎭
                </div>
                <h3>Music &amp; performing arts</h3>
                <p>Rabindra Sangeet, Nazrulgeeti, drama, dance, and collaborations with local artists.</p>
              </RevealLi>
              <RevealLi className="feature-card">
                <div className="feature-icon" aria-hidden>
                  🤝
                </div>
                <h3>Community care</h3>
                <p>
                  Volunteer networking, newcomer support, senior engagement, and civic participation as
                  responsible residents of Telangana.
                </p>
              </RevealLi>
            </ul>
          </div>
        </section>

        <section className="section section--dark" id="programs" aria-labelledby="programs-title">
          <div className="container">
            <div className="section-head section-head--light">
              <h2 id="programs-title" className="section-title">
                Programs you can explore
              </h2>
              <p className="section-sub">Tap a card—details expand on mobile and desktop.</p>
            </div>
            <ProgramsAccordion />
          </div>
        </section>

        <section className="section" id="events" aria-labelledby="events-title">
          <div className="container">
            <div className="section-head">
              <h2 id="events-title" className="section-title">
                Upcoming highlights
              </h2>
              <p className="section-sub">Sample calendar—replace dates with your real schedule.</p>
            </div>
            <div className="event-cards">
              <RevealArticle className="event-card">
                <time className="event-date" dateTime="2026-04">
                  Apr 2026
                </time>
                <h3>Pohela Boishakh</h3>
                <p>Nobo Borsho procession, traditional food, and children’s fancy dress.</p>
                <span className="event-tag">Community</span>
              </RevealArticle>
              <RevealArticle className="event-card">
                <time className="event-date" dateTime="2026-05">
                  May 2026
                </time>
                <h3>Rabindra Jayanti</h3>
                <p>Evening of songs, recitation, and talks on Gurudev’s vision.</p>
                <span className="event-tag">Heritage</span>
              </RevealArticle>
              <RevealArticle className="event-card">
                <time className="event-date" dateTime="2026-10">
                  Oct 2026
                </time>
                <h3>Durga Puja &amp; cultural fair</h3>
                <p>Puja, anjali, dhak, prasad, and open stalls for handicrafts and books.</p>
                <span className="event-tag">Flagship</span>
              </RevealArticle>
            </div>
          </div>
        </section>

        <GallerySection />

        <JoinForm />

        <section className="section" id="contact" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div>
              <h2 id="contact-title" className="section-title">
                Contact
              </h2>
              <p>Reach us by email, phone, or at the address below.</p>
              <address className="contact-card">
                <p>
                  <strong>Telangana Bengali Cultural Association</strong>
                </p>
                <p>
                  30-265/20/C7/301, Flat No. 301
                  <br />
                  Sri Sai Mitra Marvel
                  <br />
                  Officers Colony, DR A S Rao Nagar
                  <br />
                  Secunderabad, Hyderabad, Telangana&nbsp;–&nbsp;500062
                </p>
                <p>
                  <a href="tel:+910000000000">+91-00000-00000</a>
                </p>
                <p>
                  <a href="mailto:info@tbca.in">info@tbca.in</a>
                </p>
              </address>
            </div>
            <ContactMap />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Image src="/tbca-logo.jpeg" alt="" width={48} height={48} className="footer-logo" />
            <div>
              <strong>TBCA</strong>
              <p className="footer-slogan">
                <em>Connecting people through culture</em>
              </p>
            </div>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            <Link href="#about">About</Link>
            <Link href="#gallery">Gallery</Link>
            <Link href="#contact">Contact</Link>
          </nav>
          <p className="footer-copy">© {year} Telangana Bengali Cultural Association.</p>
        </div>
      </footer>
    </>
  );
}
