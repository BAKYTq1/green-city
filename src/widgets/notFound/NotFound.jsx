import { Link } from "react-router-dom";
import img from "../../assets/IMG_0371.png";
import { translations } from "../../locales/i18n";
import { useLang } from "../../locales/LangContext";

export default function NotFoundPage() {
  const { lang } = useLang();
  const t = translations[lang].notFound;

  return (
    <div style={styles.page}>
      <style>{css}</style>

      <div style={styles.inner}>
        <div className="nf-blueprint" style={styles.blueprint}>
          <img src={img} alt="logo" className="nf-img" />
        </div>
        <div className="nf-code" style={styles.code}>404</div>

        <h1 className="nf-title" style={styles.title}>{t.title}</h1>
        <p className="nf-text" style={styles.text}>{t.text}</p>

        <Link to="/" style={styles.button} className="nf-button">
          {t.button}
        </Link>
      </div>
    </div>
  );
}

const GREEN = "#173620";
const GREEN_SOFT = "#2f5c3d";

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: "#faf9f6",
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    maxWidth: 420,
    width: "100%",
  },
  blueprint: {
    color: GREEN_SOFT,
    marginBottom: "-60px",
  },
  code: {
    fontWeight: 700,
    lineHeight: 1,
    color: GREEN,
    letterSpacing: "-0.02em",
    marginBottom: 12,
  },
  title: {
    fontWeight: 600,
    color: "#1a1a1a",
    margin: "0 0 10px",
  },
  text: {
    lineHeight: 1.6,
    color: "#666",
    margin: "0 0 32px",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "13px 28px",
    borderRadius: 999,
    background: GREEN,
    color: "#fff",
    fontSize: 15,
    fontWeight: 500,
    textDecoration: "none",
    transition: "background 0.2s ease, transform 0.2s ease",
  },
};

const css = `
  .nf-img {
    width: min(500px, 80vw);
    height: auto;
    display: block;
  }
  .nf-code {
    font-size: clamp(48px, 12vw, 88px);
  }
  .nf-title {
    font-size: clamp(17px, 4vw, 22px);
  }
  .nf-text {
    font-size: clamp(13px, 2.5vw, 15px);
    max-width: 340px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 480px) {
    .nf-blueprint {
      margin-bottom: -30px !important;
    }
    .nf-button {
      width: 100%;
      padding: 14px 24px !important;
    }
  }

  .nf-button:hover {
    background: ${GREEN_SOFT};
    transform: translateY(-1px);
  }
  .nf-button:focus-visible {
    outline: 2px solid ${GREEN_SOFT};
    outline-offset: 3px;
  }
  @media (prefers-reduced-motion: reduce) {
    .nf-button { transition: none; }
  }
`;