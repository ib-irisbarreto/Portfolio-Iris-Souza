import './styles/Experiences_Section.css';
import '../App.css'

import { t } from "../translations";


const experiencesPhotos = [
  '/photos/ipb.jpg',
  '/photos/ipb.jpg',
  '/photos/ipb.jpg',
  '/photos/ipb.jpg',
  '/photos/ipb.jpg'
];


export default function ExperiencesSection() {
  return (
    <section className="experience-section">
      <h2 className="section-title">{t("home_exp_title")}</h2>

      <div className="experience-section-inner">
        <div className="photo-collage">
          {experiencesPhotos.map((src, i) => (
            <div key={i} className={`photo-collage-item p${(i % 6) + 1}`}>
              <img src={src} alt={`Experience photo ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>

        <div className="experience-section-text">
          <h3 className="section-subtitle-bigger">{t("home_exp_subtitle")}</h3>
          <p className="normal-text-bigger">{t("home_exp_description")}</p>
        </div>
      </div>
    </section>
  );
}