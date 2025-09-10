import { t, getSystemLanguage } from "../translations";

import './styles/Studies_Section.css';
import '../App.css'


const studies = [
  {
    level: {
      en: "Secondary",
      "pt-pt": "Secundário"
    },
    course: {
      en: "Science and Technology",
      "pt-pt": "Ciências e Tecnologia"
    },
    school: {
      en: "Mondim de Basto Basic and Secondary School",
      "pt-pt": "Escola Básica e Secundária de Mondim de Basto"
    },
    image: '/photos/ipb.jpg'
  },
  {
    level: {
      en: "Bachelor's",
      "pt-pt": "Licenciatura"
    },
    course: {
      en: "Communication and Journalism",
      "pt-pt": "Comunicação e Jornalismo"
    },
    school: {
      en: "Polytechnic Institute of Bragança",
      "pt-pt": "Instituto Politécnico de Bragança"
    },
    image: '/photos/ipb.jpg'
  },
];


export default function StudiesSection() {
  const lang = getSystemLanguage();

  return (
    <section className="studies-section">
      <h2 className="section-title">{t("home_studies_title")}</h2>

      <div className="studies-grid">
        {studies.map((study, idx) => (
          <article
            key={idx}
            className="study-card"
            style={study.image ? { backgroundImage: `url('${study.image}')` } : {}}
          >
            {/* overlay to fade the image (keeps text readable) */}
            <div className="study-overlay" />

            {/* text sits above the overlay */}
            <div className="study-text">
              <div className="section-subtitle-bigger" style={{ lineHeight: '0.5' }}>{study.level[lang]}</div>
              <div className="section-subtitle-bigger" >{study.course[lang]}</div>
              <div className="normal-text-bigger">{study.school[lang]}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}