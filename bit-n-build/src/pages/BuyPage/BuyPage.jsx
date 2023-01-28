import React from "react";
import styles from "./BuyPage.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useSafeBuyContext } from "../../Context/SafeBuyContext";
import { stat } from "fs";

const BuyPage = () => {
  const { checkIfWalletConnected, currentAccount } = useAuth();
  const [product, setProduct] = useState([]);
  const [productName, setProductName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [state, setState] = useState(0);

  useEffect(() => {
    checkIfWalletConnected();
    fetchProductItem();
    checkStateOfProductItem();
  }, []);

  const {
    buyProduct,
    fetchProductItemById,
    fetchProductById,
    fetchCompanyByAddress,
    fetchCompanyNFTAddress,
    checkState,
    fetchProductItemByPrivateKey,
  } = useSafeBuyContext();

  const fetchProductItem = useCallback(async () => {
    try {
      var companyAddress = window.location.pathname.split("/")[2];
      var privateKey = window.location.pathname.split("/")[3];

      console.log(typeof privateKey);

      const companyNFTAddress = await fetchCompanyNFTAddress(companyAddress);
      console.log(companyAddress, "aa", companyNFTAddress);

      const id = await fetchProductItemByPrivateKey(
        companyNFTAddress,
        privateKey
      );
      console.log("ProductItem ID", id);

      const data = await fetchProductItemById(companyNFTAddress, id);
      console.log("Product ID", data.productId.toNumber());

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

  const checkStateOfProductItem = useCallback(async () => {
    try {
      var companyAddress = window.location.pathname.split("/")[2];
      var privateKey = window.location.pathname.split("/")[3];

      const companyNFTAddress = await fetchCompanyNFTAddress(companyAddress);
      console.log(companyAddress, "aa", companyNFTAddress);

      const id = await fetchProductItemByPrivateKey(
        companyNFTAddress,
        privateKey
      );
      console.log("ProductItem ID", id);

      const productItem = await fetchProductItemById(companyNFTAddress, id);

      const data = await checkState(companyNFTAddress, productItem.pubKey);
      console.log("checkState", data.toNumber());
      setState(parseInt(data));
      return parseInt(data.toNumber());
    } catch (err) {
      console.log(err);
    }
  });

  const checkProduct = useCallback(async () => {
    try {
      var companyAddress = window.location.pathname.split("/")[2];
      var privateKey = window.location.pathname.split("/")[3];

      const companyNFTAddress = await fetchCompanyNFTAddress(companyAddress);

      await buyProduct(
        companyNFTAddress,
        privateKey,
        "0x5506f75ffC8fA955f9A1FF14DD197606e62c8158"
      );
      // (contractAddress, privateKey, tokenURI)
      console.log("Product purchased and Private Key verified");
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <>
      {state == 0 ? (
        <div className={styles.verifyPageContainer}>
          {product.map((item, index) => {
            return (
              <div className={styles.verifyContainer} key={index}>
                <span className={styles.verifyDetails}>
                  Product Name:{" "}
                  <span className={styles.detailsContent}>
                    {item.productName}
                  </span>
                </span>
                <span className={styles.verifyDetails}>
                  Company:{" "}
                  <span className={styles.detailsContent}>
                    {item.companyName}
                  </span>
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
                <button
                  onClick={checkProduct}
                  className={styles.checkProductBtn}
                >
                  Buy Product
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>The Product is already purchased!</div>
      )}
    </>
  );
};

export default BuyPage;
