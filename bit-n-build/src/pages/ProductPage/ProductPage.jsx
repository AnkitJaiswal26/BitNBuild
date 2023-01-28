import React, { useState } from "react";
import styles from './ProductPage.module.css';

const ProductPage = () => {

    const productId = window.location.pathname.split("/")[2];

    const [codesQuantity, setCodesQuantity] = useState(0);
    const [manufDate, setManufDate] = useState();
    const [expiryDate, setExpiryDate] = useState();

    return (
        <div className={styles.productPageContainer}>
            <div className={styles.productPageContent}>
                <div className={styles.detailsBox}>
                    <span className={styles.detailsHeading}>Product Details</span>
                    <div className={styles.detailsBoxContent}>
                        <span className={styles.key}>Product ID: </span>
                        <span className={styles.name}>{productId}</span>
                        <span className={styles.key}>Product Name: </span>
                        <span className={styles.name}>Airdopes 121 v2</span>
                        <span className={styles.key}>MRP: </span>
                        <span className={styles.name}>₹3500</span>
                        <span className={styles.key}>No. of Codes generated: </span>
                        <span className={styles.name}>1200</span>
                    </div>
                </div>

                <div className={styles.detailsBox}>
                    <span className={styles.detailsHeading}>Generate New Codes</span>
                    <div className={styles.genCodeContent}>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Quantity of codes: </label>
                            <input
                                className={styles.input}
                                placeholder="Quantity"
                                onChange={(e) => setCodesQuantity(e.target.value)}
                                value={codesQuantity}
                            />
                            <label className={styles.inputLabel}>Manufacture Date: </label>
                            <input
                                className={styles.input}
                                type="date"
                                onChange={(e) => setManufDate(e.target.value)}
                                value={manufDate}
                            />
                            <label className={styles.inputLabel}>Expiry Date: </label>
                            <input
                                className={styles.input}
                                type="date"
                                onChange={(e) => setExpiryDate(e.target.value)}
                                value={expiryDate}
                            />
                        </div>
                        <div>
                            <button className={styles.genCodesBtn}>Generate Codes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;