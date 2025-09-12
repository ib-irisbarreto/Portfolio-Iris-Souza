import React from "react";

import emailIcon from "../assets/icons/email.svg";
import githubIcon from "../assets/icons/github.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import instagramIcon from "../assets/icons/instagram.svg";

import "./styles/SiteFooter.css";
import "../App.css";

import { t } from "../translations";

const currentYear = new Date().getFullYear();
const email = "irisbarretomes@gmail.com";
const mailtoLink = `mailto:${email}`;
const githubLink = "https://github.com/ib-irisbarreto";
const linkedinLink = "https://www.linkedin.com/in/iris-souza-430290256";
const instagramLink = "https://www.instagram.com/barretoiriiis";


export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div>
          <span className="section-title" style={{ color: "#fff" }}>{t("site_footer_title")}</span>
					<div className="normal-text-bold">
						<ul className="footer-links">
							<li>
								<a href={mailtoLink}>
									<img src={emailIcon} alt="Email" className="footer-icon" /> {email}
								</a>
							</li>
							<li>
								<a href={githubLink} target="_blank" rel="noopener noreferrer">
									<img src={githubIcon} alt="GitHub" className="footer-icon" /> {t("site_footer_github")}
								</a>
							</li>
							<li>
								<a href={linkedinLink} target="_blank" rel="noopener noreferrer">
									<img src={linkedinIcon} alt="LinkedIn" className="footer-icon" /> {t("site_footer_linkedin")}
								</a>
							</li>
							<li>
								<a href={instagramLink} target="_blank" rel="noopener noreferrer">
									<img src={instagramIcon} alt="Instagram" className="footer-icon" /> {t("site_footer_instagram")}
								</a>
							</li>
						</ul>
					</div>
        </div>
        <div className="footer-copy">
					<div className="normal-text-bold">
						&copy; {currentYear} {t("site_footer_copyright_client")}
						<span className="footer-credit"> &mdash; {t("site_footer_copyright_designer")}</span>
					</div>
        </div>
      </div>
    </footer>
  );
}