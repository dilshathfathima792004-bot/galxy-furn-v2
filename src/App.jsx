import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabase";

function App() {
  
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [customer, setCustomer] = useState(null);

    useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("login")?.classList.add("login-open");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  
useEffect(() => {
  let mounted = true;

  supabase.auth.getSession().then(({ data }) => {
    if (mounted) {
      setCustomer(data.session?.user ?? null);
    }
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setCustomer(session?.user ?? null);
  });

  return () => {
    mounted = false;
    subscription.unsubscribe();
  };
}, []);

  return (
    <main className="galxy-page">

      {/* ================= HEADER ================= */}
      <header className="galxy-header">

        <a href="#home" className="brand">
          <img
            src="/images/galxy-furn-logo.png"
            alt="GALXY FURN"
          />
        </a>

        <nav className="main-nav">
          <a href="#collection">EXPLORE</a>
          <a href="#interiors">DISCOVER</a>
          <a href="#contact">CONNECT</a>
        </nav>
        <div className="header-actions">
          
{customer ? (
  <div className="customer-profile">
    <button
      type="button"
      className="header-login"
      onClick={() => {
        const menu = document.getElementById("customer-menu");
        if (menu) {
          menu.hidden = !menu.hidden;
        }
      }}
    >
      
  {customer.user_metadata?.full_name || customer.email?.split("@")[0]}
  <span className="profile-chevron">⌄</span>

    </button>

    <div id="customer-menu" className="customer-menu" hidden>
      <p>{customer.user_metadata?.full_name || "Customer"}</p>
      <p>{customer.email}</p>
      <button
        type="button"
        onClick={async () => {
          const { error } = await supabase.auth.signOut();
          if (error) {
            alert(error.message);
          } else {
            document.getElementById("customer-menu").hidden = true;
            alert("You have signed out successfully.");
          }
        }}
      >
        Sign out
      </button>
    </div>
  </div>
) : (
  <a
    href="#login"
    className="header-login"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById("login")?.classList.add("login-open");
    }}
  >
    Login
  </a>
)}

          <a href="#contact" className="header-contact">
            Enquire
          </a>
        </div>
        

      </header>


      {/* ================= HOME ================= */}
      <section id="home" className="home-section">

        <div className="home-content">
          
{customer && (
  <div className="customer-welcome">
    <p>WELCOME BACK</p>
    <h2>
      {customer.user_metadata?.full_name ||
        customer.email?.split("@")[0]}
    </h2>
    <span>
      Discover pieces that make your space feel like yours.
    </span>
  </div>
)}


          <p className="eyebrow">
            CHENNAI · FURNITURE & INTERIORS
          </p>

          <h1>
            From space
            <span>to signature.</span>
          </h1>

          <p className="home-description">
            Furniture and interiors created to bring warmth,
            character and timeless presence into the spaces you live in.
          </p>

          <a href="#collection" className="gold-button">
            Explore Collection
          </a>

        </div>

        <div className="home-image-wrap">
          <img
            src="/images/Home.png"
            alt="GALXY FURN interior"
            className="home-image"
          />
        </div>

      </section>


      {/* ================= COLLECTION ================= */}
      <section id="collection" className="collection-section">

        <div className="section-heading">

          <p className="eyebrow">
            THE COLLECTION
          </p>

          <h2>
            Designed around
            <span>the way you live.</span>
          </h2>

          <p>
            Explore furniture and spaces created for the moments
            that make a house feel like home.
          </p>

        </div>


        <div className="collection-grid">

          <a href="#living" className="collection-card">
            <div className="collection-image">
              <img
                src="/images/living.png"
                alt="Living collection"
              />
            </div>

            <div className="collection-info">
              <span>01</span>
              <h3>Living</h3>
              <p>Comfort · Character · Conversation</p>
            </div>
          </a>


          <a href="#bedroom" className="collection-card">
            <div className="collection-image">
              <img
                src="/images/bedroom.png"
                alt="Bedroom collection"
              />
            </div>

            <div className="collection-info">
              <span>02</span>
              <h3>Bedroom</h3>
              <p>Calm · Comfort · Retreat</p>
            </div>
          </a>


          <a href="#dining" className="collection-card">
            <div className="collection-image">
              <img
                src="/images/dining.png"
                alt="Dining collection"
              />
            </div>

            <div className="collection-info">
              <span>03</span>
              <h3>Dining</h3>
              <p>Gather · Dine · Connect</p>
            </div>
          </a>


          <a href="#storage" className="collection-card">
            <div className="collection-image">
              <img
                src="/images/storage.png"
                alt="Storage collection"
              />
            </div>

            <div className="collection-info">
              <span>04</span>
              <h3>Storage</h3>
              <p>Order · Function · Form</p>
            </div>
          </a>

        </div>

      </section>


      {/* ================= LIVING ================= */}
      <section id="living" className="room-section">

        <div className="room-image">
          <img
            src="/images/living.png"
            alt="GALXY FURN living room"
          />
        </div>

        <div className="room-content">

          <p className="eyebrow">
            01 · LIVING
          </p>

          <h2>
            Spaces made
            <span>to live in.</span>
          </h2>

          <p>
            Living spaces should feel welcoming from the moment
            you enter them. Thoughtful proportions, rich materials
            and comfortable forms come together to create rooms
            with warmth and personality.
          </p>

          <a href="#contact" className="text-link">
            Enquire about Living
            <span>→</span>
          </a>

        </div>

      </section>


      {/* ================= BEDROOM ================= */}
      <section id="bedroom" className="room-section room-reverse">

        <div className="room-image">
          <img
            src="/images/bedroom.png"
            alt="GALXY FURN bedroom"
          />
        </div>

        <div className="room-content">

          <p className="eyebrow">
            02 · BEDROOM
          </p>

          <h2>
            A quieter
            <span>kind of luxury.</span>
          </h2>

          <p>
            Bedrooms deserve a sense of calm. From statement beds
            and considered storage to subtle lighting and warm
            finishes, every detail is designed to create a personal
            retreat.
          </p>

          <a href="#contact" className="text-link">
            Enquire about Bedroom
            <span>→</span>
          </a>

        </div>

      </section>


      {/* ================= DINING ================= */}
      <section id="dining" className="room-section">

        <div className="room-image">
          <img
            src="/images/dining.png"
            alt="GALXY FURN dining room"
          />
        </div>

        <div className="room-content">

          <p className="eyebrow">
            03 · DINING
          </p>

          <h2>
            Made for
            <span>gathering.</span>
          </h2>

          <p>
            Dining is more than a table and chairs. It is where
            conversations stretch longer, celebrations begin and
            everyday moments become memories.
          </p>

          <a href="#contact" className="text-link">
            Enquire about Dining
            <span>→</span>
          </a>

        </div>

      </section>


      {/* ================= STORAGE ================= */}
      <section id="storage" className="room-section room-reverse">

        <div className="room-image">
          <img
            src="/images/storage.png"
            alt="GALXY FURN storage and wardrobe"
          />
        </div>

        <div className="room-content">

          <p className="eyebrow">
            04 · STORAGE
          </p>

          <h2>
            Everything
            <span>in its place.</span>
          </h2>

          <p>
            Storage should disappear into the architecture while
            still making a statement. Explore wardrobes, cabinetry
            and storage solutions designed around your space.
          </p>

          <a href="#contact" className="text-link">
            Enquire about Storage
            <span>→</span>
          </a>

        </div>

      </section>


      {/* ================= INTERIORS ================= */}
      <section id="interiors" className="interiors-section">

        <div className="section-heading interiors-heading">

          <p className="eyebrow">
            GALXY FURN · INTERIORS
          </p>

          <h2>
            Complete spaces.
            <span>Considered details.</span>
          </h2>

          <p>
            Explore interiors where furniture, materials, lighting
            and architecture come together as one complete experience.
          </p>

        </div>


        <div className="interiors-grid">

          

<div className="interior-large">
  <img
    src="/images/living.png"
    alt="GALXY FURN interior"
  />

  <div className="interior-label">
    <span>01</span>
    <strong>Living</strong>
  </div>
</div>



          <div className="interior-small">
            <img
              src="/images/bedroom.png"
              alt="GALXY FURN bedroom interior"
            />

            <div className="interior-label">
              <span>02</span>
              <strong>Bedroom</strong>
            </div>
          </div>


          <div className="interior-small">
            <img
              src="/images/dining.png"
              alt="GALXY FURN dining interior"
            />

            <div className="interior-label">
              <span>03</span>
              <strong>Dining</strong>
            </div>
          </div>


          <div className="interior-large">
            <img
              src="/images/storage.png"
              alt="GALXY FURN storage interior"
            />

            <div className="interior-label">
              <span>04</span>
              <strong>Storage</strong>
            </div>
          </div>

        </div>

      </section>


      {/* ================= OUR STORY ================= */}
      <section id="story" className="story-section">

        <div className="story-number">
          05
        </div>

        <div className="story-content">

          <p className="eyebrow">
            OUR STORY
          </p>

          <h2>
            From space
            <span>to signature.</span>
          </h2>

          <p>
            GALXY FURN is built around a simple idea — the furniture
            we live with should feel like it belongs to us.
          </p>

          <p>
            We bring together furniture, materials and interior
            thinking to create spaces that feel distinctive,
            comfortable and personal.
          </p>

          <a href="#contact" className="text-link">
            Talk to GALXY FURN
            <span>→</span>
          </a>

        </div>

      </section>


      {/* ================= JOURNAL ================= */}
      <section id="journal" className="journal-section">

        <div className="section-heading">

          <p className="eyebrow">
            JOURNAL
          </p>

          <h2>
            Notes on
            <span>living beautifully.</span>
          </h2>

        </div>


        <div className="journal-grid">

          <article className="journal-card">
            <span>01 · DESIGN</span>
            <h3>
              Choosing furniture that makes a room feel complete
            </h3>
            <p>
              A few simple principles for creating a balanced,
              comfortable living space.
            </p>
            <a href="#contact">Read article →</a>
          </article>


          <article className="journal-card">
            <span>02 · INTERIORS</span>
            <h3>
              The details that transform an ordinary interior
            </h3>
            <p>
              Materials, lighting and proportion can change the
              character of an entire room.
            </p>
            <a href="#contact">Read article →</a>
          </article>


          <article className="journal-card">
            <span>03 · LIFESTYLE</span>
            <h3>
              Creating a home that feels uniquely yours
            </h3>
            <p>
              Your home should reflect how you live, gather,
              rest and grow.
            </p>
            <a href="#contact">Read article →</a>
          </article>

        </div>

      </section>


      {/* ================= SHOWROOM ================= */}
      <section id="showroom" className="showroom-section">

        <div className="showroom-content">

          <p className="eyebrow">
            SHOWROOM · CHENNAI
          </p>

          <h2>
            Come experience
            <span>GALXY FURN.</span>
          </h2>

          <p>
            Visit us in Chennai and experience our furniture and
            interiors in person.
          </p>

          <div className="address">

            <strong>
              GALXY FURN
            </strong>

            <p>
              No.1-A, Easwari Nagar,<br />
              Velachery Main Road,<br />
              Gowriwakkam,<br />
              Chennai – 600 073
            </p>

          </div>

          <a
            href="#contact"
            className="gold-button"
          >
            Plan a Visit
          </a>

        </div>

      </section>


      {/* ================= CONTACT ================= */}
      <section id="contact" className="contact-section">

        <div className="contact-heading">

          <p className="eyebrow">
            CONTACT / ENQUIRY
          </p>

          <h2>
            Let's create
            <span>your space.</span>
          </h2>

          <p>
            Have a furniture requirement, interior project or
            simply want to know more? Get in touch with GALXY FURN.
          </p>

        </div>


        <div className="contact-details">

          <a href="tel:+917448882468" className="contact-item">
            <span>PHONE</span>
            <strong>74488 82468</strong>
          </a>

          <a href="tel:+917092222468" className="contact-item">
            <span>PHONE</span>
            <strong>70922 22468</strong>
          </a>

          <a
            href="https://wa.me/917448882468"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
          >
            <span>WHATSAPP</span>
            <strong>Chat with us</strong>
          </a>

          <a
            href="mailto:galxyfurn@gmail.com"
            className="contact-item"
          >
            <span>EMAIL</span>
            <strong>galxyfurn@gmail.com</strong>
          </a>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="galxy-footer">

        <div className="footer-brand">

          <img
            src="/images/galxy-furn-logo.png"
            alt="GALXY FURN"
          />


        </div>


        <div className="footer-address">

          <strong>GALXY FURN</strong>

          <p>
            No.1-A, Easwari Nagar,<br />
            Velachery Main Road,<br />
            Gowriwakkam,<br />
            Chennai – 600 073
          </p>

        </div>


        <div className="footer-contact">

          <p>74488 82468</p>
          <p>70922 22468</p>
          <p>galxyfurn@gmail.com</p>

        </div>


        <div className="footer-bottom">

          <span>
            GSTIN: 33GFLPA7683P1ZP
          </span>

          <span>
            Subject to Chennai Jurisdiction
          </span>

          <span>
            © 2026 GALXY FURN
          </span>

        </div>

      </footer>
      {/* LOGIN POPUP */}
<div id="login" className="login-overlay">
  <div className="login-modal">
    <button
      type="button"
      className="login-close"
      aria-label="Close login"
      onClick={() => document.getElementById("login").classList.remove("login-open")}
    >
      ×
    </button>

    <p className="eyebrow">GALXY FURN</p>
    <h2>Welcome back</h2>
    <p className="login-subtitle">Sign in to your account</p>

    
<form
  onSubmit={async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login successful!");
    document.getElementById("login")?.classList.remove("login-open");
  }}
>

      <label htmlFor="login-email">Email address</label>
      <input
        id="login-email"
        type="email"
        placeholder="Enter your email"
        required
      />

      <label htmlFor="login-password">Password</label>
      
<div className="password-field">
  <input
    id="login-password"
    type={showLoginPassword ? "text" : "password"}
    placeholder="Enter your password"
    required
  />
  <button
    type="button"
    className="password-toggle"
    onClick={() => setShowLoginPassword(!showLoginPassword)}
    aria-label={showLoginPassword ? "Hide password" : "Show password"}
  >
    {showLoginPassword ? "🙈" : "👁"}
  </button>
</div>


      <button type="submit" className="login-submit">LOGIN</button>
    </form>

    <p className="login-switch">
      New to GALXY FURN?{" "}
      
<button
  type="button"
  onClick={() => {
    document.getElementById("login")?.classList.remove("login-open");
    document.getElementById("signup")?.classList.add("signup-open");
  }}
>
  Sign up
</button>

    </p>
  </div>
</div>

{/* SIGN-UP POPUP */}
<div id="signup" className="login-overlay">
  <div className="login-modal">
    <button
      type="button"
      className="login-close"
      aria-label="Close sign up"
      onClick={() =>
        document.getElementById("signup")?.classList.remove("signup-open")
      }
    >
      ×
    </button>

    <p className="eyebrow">GALXY FURN</p>
    <h2>Create account</h2>
    <p className="login-subtitle">
      Join us to discover your signature style
    </p>

    <form
  onSubmit={async (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data.user) {
      alert(
        data.session
          ? "Account created successfully! You are signed in."
          : "Account created! Please check your email to confirm your account."
      );
    }
  }}
>
      <label htmlFor="signup-name">Full name</label>
      <input
        id="signup-name"
        type="text"
        placeholder="Enter your full name"
        required
      />

      <label htmlFor="signup-email">Email address</label>
      <input
        id="signup-email"
        type="email"
        placeholder="Enter your email"
        required
      />

      <label htmlFor="signup-password">Create password</label>
      
<div className="password-field">
  <input
    id="signup-password"
    type={showSignupPassword ? "text" : "password"}
    placeholder="Create a password"
    minLength={8}
    required
  />
  <button
    type="button"
    className="password-toggle"
    onClick={() => setShowSignupPassword(!showSignupPassword)}
    aria-label={showSignupPassword ? "Hide password" : "Show password"}
  >
    {showSignupPassword ? "🙈" : "👁"}
  </button>
</div>


      <button type="submit" className="login-submit">
        CREATE ACCOUNT
      </button>
    </form>

    <p className="login-switch">
      Already have an account?{" "}
      <button
        type="button"
        onClick={() => {
          document.getElementById("signup")?.classList.remove("signup-open");
          document.getElementById("login")?.classList.add("login-open");
        }}
      >
        Login
      </button>
    </p>
  </div>
</div>

    </main>
  );
}

export default App;