import React from "react";
import styles from "./BuyPage.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useSafeBuyContext } from "../../Context/SafeBuyContext";

const BuyPage = () => {
  const { checkIfWalletConnected, currentAccount } = useAuth();

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const { buyProduct, fetchProductItemById } =
    useSafeBuyContext();

  const fetchProductItem = useCallback(async() =>{
    try{
        const data = await fetchProductItemById();
    }catch(err){
        console.log(err);
    }
  })

  const checkProduct = useCallback (async() => {
    try{
        await buyProduct(currentAccount, "0x5506f75ffC8fA955f9A1FF14DD197606e62c8158", "0x5506f75ffC8fA955f9A1FF14DD197606e62c8158");
        // (contractAddress, privateKey, tokenURI)
        console.log("Product purchased and Private Key verified")
    }catch(err){
        console.log(err);
    }
  });

  return (
    <div className={styles.verifyPageContainer}>
      <div className={styles.verifyContainer}>
        <span className={styles.verifyDetails}>
          Product Name:{" "}
          <span className={styles.detailsContent}>Airdopes 121 v2</span>
        </span>
        <span className={styles.verifyDetails}>
          Company:{" "}
          <span className={styles.detailsContent}>boAt Lifestyles</span>
        </span>
        <span className={styles.verifyDetails}>
          Company Identification Number:{" "}
          <span className={styles.detailsContent}>191080080</span>
        </span>
        <span className={styles.verifyDetails}>
          Manufacture Date:{" "}
          <span className={styles.detailsContent}>15/07/2022</span>
        </span>
        <span className={styles.verifyDetails}>
          Expiry Date: <span className={styles.detailsContent}>15/07/2023</span>
        </span>
        <button onClick={checkProduct} className={styles.checkProductBtn}>
          Buy Product
        </button>
      </div>
    </div>
  );
};

export default BuyPage;
