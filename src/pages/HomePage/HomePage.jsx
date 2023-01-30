import React from "react";
import { useNavigate } from "react-router-dom";
import bg from '../../images/bg.png';
import styles from './HomePage.module.css';
import logo from '../../images/logo.svg';
import PersonIcon from '@mui/icons-material/Person';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import one from '../../images/one.png';
import two from '../../images/two.png';
import three from '../../images/three.png';

const HomePage = () => {

    const navigate = useNavigate();

    const navigateToUserRegisterPage = () => {
        navigate("/register");
    }
    const navigateToCompanyRegisterPage = () => {
        navigate("/registerCompany");
    }

    return (
        <div className={styles.homePageContainer}>
            <div
                style={{ backgroundImage: `url(${bg})` }}
                className={styles.heroSection}
            >
                <div className={styles.logoSection}>
                <img className={styles.logoImg} src={logo} alt="" />
                </div>
                <div className={styles.descSection}>
                <span>Building a secure & efficient solution<br />
        for Product Verification</span>
                <div className={styles.heroBtnContainer}>
                    <button onClick={navigateToUserRegisterPage} className={`${styles.registerBtn} ${styles.userBtn}`}>
                        <PersonIcon className={styles.btnIcon} />
                        User
                    </button>
                    <button onClick={navigateToCompanyRegisterPage} className={styles.registerBtn}>
                        <CorporateFareIcon className={styles.btnIcon} />
                        Company
                    </button>
                </div>
                </div>
            </div>
            <span className={styles.sectionHeader}>Special Features</span>
            <div className={styles.infoContainer}>
                <div className={styles.infoCard}>
                <img className={styles.infoImage} src={one} alt="" />
                <span>Secured by Blockchain</span>
                </div>
                <div className={styles.infoCard}>
                <img className={styles.infoImage} src={two} alt="" />
                <span>Easy Product Verification</span>
                </div>
                <div className={styles.infoCard}>
                <img className={styles.infoImage} src={three} alt="" />
                <span>Gasless Transactions</span>
                </div>
            </div>
        </div>
    );
}

export default HomePage;