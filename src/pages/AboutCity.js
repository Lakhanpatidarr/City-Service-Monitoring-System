import react from "react";
import New from '../assets/New.avif'
import CleanestImg from '../assets/Cleanest City Image.jpeg'
import CommercialImg from '../assets/Commercial Place Indore.jpg'
import IIT from '../assets/IIT.jpg'
import IIM from '../assets/IIM.jpg'
import Chappan from '../assets/Chappan.jpeg'
import Zoo from '../assets/Zoo.avif'
import CentralMuseum from '../assets/Central Museum.webp'
import Khajrana from '../assets/khajrana.avif'
import '../css/AboutCity.css'

const AboutCity = () => {
    return (
        <div className="about-img-container">
            <div className="first-image-container">
                <img src={CleanestImg} className="about-img-first"/>
                <h2>Cleanest City</h2>
                <p className="first-p-tag">Indore has been ranked the cleanest city in India for eight consecutive times.</p>
            </div>
            <div className="second-image-container">
                <img src={New} className="about-img-second"/>
                <h2>Metropolian City</h2>
                <p className="second-p-tag">Indore is developing its metropolitan network and connecting the city.</p>
            </div>
            <div className="third-image-container">
                <img src={CommercialImg} className="about-img-third"/>
                <h2>Commercial Hub</h2>
                <p className="third-p-tag">Indore is the commercial hub of Madhya Pradesh. It has an IT sector, business parks, etc.</p>
            </div>
            <div className="fourth-image-container">
                <img src={IIT} className="about-img-fourth"/>
                <h2>IIT Indore</h2>
                <p className="fourth-p-tag">IIT Indore is a premier institute known for its innovation and excellence in technology and research.</p>
            </div>
            <div className="five-image-container">
                <img src={IIM} className="about-img-five"/>
                <h2>IIM Indore</h2>
                <p className="five-p-tag">IIM Indore is a leading institute known for its excellence in management education and leadership development.</p>
            </div>
            <div className="six-image-container">
                <img src={Chappan} className="about-img-six"/>
                <h2>Chappan Dukan</h2>
                <p className="six-p-tag">Chappan Dukan is one of Indore's most famous food streets, known for its 56 delicious shops offering a variety of snacks and sweets.</p>
            </div>
            <div className="seven-image-container">
                <img src={Zoo} className="about-img-seven"/>
                <h2>Indore Zoo</h2>
                <p className="seven-p-tag">Indore Zoo is a popular tourist attraction, home to a wide variety of animals, birds, and reptiles in a natural environment.</p>
            </div>
            <div className="eight-image-container">
                <img src={CentralMuseum} className="about-img-eight"/>
                <h2>Central Museum</h2>
                <p className="eight-p-tag">Indore Central Museum showcases ancient sculptures and artifacts that reflect the city’s rich history and culture.</p>
            </div>
            <div className="nine-image-container">
                <img src={Khajrana} className="about-img-nine"/>
                <h2>Khajrana Ganesh Mandir</h2>
                <p className="nine-p-tag">Khajrana Ganesh Temple is one of Indore’s most famous temples, known for its spiritual atmosphere and devotion to Lord Ganesha.</p>
            </div>
        </div>
    )
}
export default AboutCity