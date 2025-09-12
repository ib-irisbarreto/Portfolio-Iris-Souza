import './styles/Experiences_Section.css';
import '../App.css'

import { t } from "../translations";


const experiencesPhotos = [
  '/photos/home/Experiences/1.jpg',
  '/photos/home/Experiences/2.jpg',
  '/photos/home/Experiences/3.jpg',
  '/photos/home/Experiences/4.jpg',
  '/photos/home/Experiences/5.jpg'
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
          <div className="experience-section-text">
            {t("home_exp_description")
              .split(/\n\n/)
              .map((paragraph, idx) => (
                <p className="normal-text-bigger" key={idx}>{paragraph}</p>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}