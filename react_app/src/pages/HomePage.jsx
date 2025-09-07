import './styles/HomePage.css';

import HeaderSlider from "../major_components/Header_Slider";
import AboutSection from "../major_components/About_Section";
import StudiesSection from "../major_components/Studies_Section";
import ExperiencesSection from "../major_components/Experiences_Section";


function HomePage() {
  return (
    <>
      <HeaderSlider />
      <AboutSection />
      <StudiesSection />
      <ExperiencesSection />
    </>
  );
}

export default HomePage;
