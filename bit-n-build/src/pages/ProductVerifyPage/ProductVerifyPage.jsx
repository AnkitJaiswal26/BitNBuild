import React from "react";
import styles from './ProductVerifyPage.module.css';

const ProductVerifyPage = () => {

    const checkProduct = () => {

    }

    return (
        <div className={styles.verifyPageContainer}>
            <div className={styles.verifyContainer}>
                <span className={styles.verifyDetails}>Product Name: <span className={styles.detailsContent}>Airdopes 121 v2</span></span>
                <span className={styles.verifyDetails}>Company: <span className={styles.detailsContent}>boAt Lifestyles</span></span>
                <span className={styles.verifyDetails}>Company Identification Number: <span className={styles.detailsContent}>191080080</span></span>
                <span className={styles.verifyDetails}>Manufacture Date: <span className={styles.detailsContent}>15/07/2022</span></span>
                <span className={styles.verifyDetails}>Expiry Date: <span className={styles.detailsContent}>15/07/2023</span></span>
                <button onClick={checkProduct} className={styles.checkProductBtn}>Check Product</button>
            </div>
        </div>
    );
}

export default ProductVerifyPage;