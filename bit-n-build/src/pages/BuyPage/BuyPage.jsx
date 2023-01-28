import React from "react";
import styles from "./BuyPage.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useSafeBuyContext } from "../../Context/SafeBuyContext";

const BuyPage = () => {
  const { checkIfWalletConnected, currentAccount } = useAuth();
  const [product, setProduct] = useState([]);
  const [productName, setProductName] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    checkIfWalletConnected();
    fetchProductItem();
  }, []);

  const {
    buyProduct,
    fetchProductItemById,
    fetchProductById,
    fetchCompanyByAddress,
    fetchCompanyNFTAddress,
  } = useSafeBuyContext();

  const fetchProductItem = useCallback(async () => {
    try {
      var companyAddress = window.location.pathname.split("/")[2];
      var id = parseInt(window.location.pathname.split("/")[3]);
      console.log(typeof id);

      const companyNFTAddress = await fetchCompanyNFTAddress(companyAddress);
      console.log(companyAddress, "aa", companyNFTAddress);

      const data = await fetchProductItemById(companyNFTAddress, id);
      console.log("data", data.productId.toNumber());

      const product = await fetchProductById(
        companyNFTAddress,
        data.productId.toNumber()
      );
      console.log("product", product);

      const company = await fetchCompanyByAddress(companyAddress);
      console.log("company", company);

      var productItem = [
        {
          productName: product.name,
          companyName: company.name,
          cin: company.cin,
          manDate: data.man_date,
          exDate: data.ex_date,
        },
      ];
      setProduct(productItem);
      console.log("data", productItem);
    } catch (err) {
      console.log(err);
    }
  });

  const checkProduct = useCallback(async () => {
    try {
      await buyProduct(
        currentAccount,
        "0x5506f75ffC8fA955f9A1FF14DD197606e62c8158",
        "0x5506f75ffC8fA955f9A1FF14DD197606e62c8158"
      );
      // (contractAddress, privateKey, tokenURI)
      console.log("Product purchased and Private Key verified");
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div className={styles.verifyPageContainer}>
      {product.map((item, index) => {
        return (
          <div className={styles.verifyContainer} key={index}>
            <span className={styles.verifyDetails}>
              Product Name:{" "}
              <span className={styles.detailsContent}>{item.productName}</span>
            </span>
            <span className={styles.verifyDetails}>
              Company:{" "}
              <span className={styles.detailsContent}>{item.companyName}</span>
            </span>
            <span className={styles.verifyDetails}>
              Company Identification Number:{" "}
              <span className={styles.detailsContent}>{item.cin}</span>
            </span>
            <span className={styles.verifyDetails}>
              Manufacture Date:{" "}
              <span className={styles.detailsContent}>{item.man_date}</span>
            </span>
            <span className={styles.verifyDetails}>
              Expiry Date:{" "}
              <span className={styles.detailsContent}>{item.ex_date}</span>
            </span>
            <button onClick={checkProduct} className={styles.checkProductBtn}>
              Buy Product
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default BuyPage;
