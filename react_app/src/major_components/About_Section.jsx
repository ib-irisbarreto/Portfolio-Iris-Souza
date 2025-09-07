import './styles/About_Section.css';
import '../App.css'

import { t } from "../translations";


const profileImage = '/photos/ipb.jpg'


export default function AboutSection() {
  return (
		<section className="about-section">
			<h2 className="section-title">{t("home_aboutMe_title")}</h2>
			<div className="about-content">
				<div className="about-details">
					<div className="info-list">
						<div className="card">
							<div className="section-subtitle">{t("home_aboutMe_name_title")}</div>
							<div className="normal-text">{t("home_aboutMe_name")}</div>

							<div className="section-subtitle">{t("home_aboutMe_age_title")}</div>
							<div className="normal-text">{t("home_aboutMe_age")}</div>

							<div className="section-subtitle">{t("home_aboutMe_city_title")}</div>
							<div className="normal-text">{t("home_aboutMe_city")}</div>
						</div>

						<div className="card">
							<div className="section-subtitle">{t("home_aboutMe_description_title")}</div>
							<div className="normal-text">{t("home_aboutMe_description")}</div>
						</div>
					</div>
				</div>
			
				<div className="about-image">
					{profileImage ? (
						<img src={profileImage} alt="Profile" />
					) : (
						<div className="placeholder">Profile Image</div>
					)}
				</div>
			</div>
		</section>
  );
}