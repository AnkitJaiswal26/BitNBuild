import React from "react";
import styles from "./CompanyDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Modal from "react-modal";
import { useSafeBuyContext } from "../../Context/SafeBuyContext";
import { useAuth } from "../../Context/AuthContext";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [compData, setCompData] = useState([]);
  const [companyNFTAdd, setCompanyNFTAdd] = useState("");

  const { checkIfWalletConnected, currentAccount } = useAuth();

  useEffect(() => {
    checkIfWalletConnected();
  }, [currentAccount]);

  const { fetchCompanyByAddress, fetchCompanyNFTAddress, fetchAllProducts } =
    useSafeBuyContext();

  const fetchUser = useCallback(async () => {
    try {
      const company = await fetchCompanyByAddress(currentAccount);
      setCompData(company);

      const compNFTAdd = await fetchCompanyNFTAddress();
      console.log(compNFTAdd);
    } catch (err) {
      // navigate("/registerCompany");
      console.log(err);
    }
  });

  const fetchProducts = useCallback(async () => {
    const result = await fetchAllProducts();
  });

  useEffect(() => {
    if (currentAccount) fetchUser();
  }, [currentAccount]);

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [productNameInModal, setProductNameInModal] = useState("");
  const [productPriceInModal, setProductPriceInModal] = useState("");

  const products = [
    {
      name: "Airdopes 121 v2",
      codesGen: 204
    },
    {
      name: "Rockerz 235 v2",
      codesGen: 1056
    },
    {
      name: "BassHeads 103",
      codesGen: 2046
    },
  ];
  const requests = [];
  const requestType = "Update"

  const closeAddProductModal = () => {
    setIsAddProductModalOpen(false);
  }

  const openAddProductModal = () => {
    console.log("Asdf")
    setIsAddProductModalOpen(true);
  }

  const handleAddProduct = () => {

  }

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={isAddProductModalOpen}
        onRequestClose={closeAddProductModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <button onClick={closeAddProductModal}>close</button>

          <div className={`${styles.inputContainer}`}>
            <label className={`${styles.inputLabel}`}>
              Product Name
            </label>
            <input
              className={`${styles.input}`}
              type="text"
              onChange={(e) => setProductNameInModal(e.target.value)}
              value={productNameInModal}
            />
          </div>
          <div className={`${styles.inputContainer}`}>
            <label className={`${styles.inputLabel}`}>Product Price</label>
            <input
              className={`${styles.input}`}
              type="text"
              onChange={(e) => setProductPriceInModal(e.target.value)}
              value={productPriceInModal}
            />
          </div>

          <button onClick={handleAddProduct}>Add Product</button>

        </div>
      </Modal>
      <div className={styles.companyDashboardContainer}>

        <div className={styles.dashboardBox}>
          <div className={styles.heading}>
            Welcome{" "}
            <span className={styles.accountName}>boAt</span>
          </div>
          <div className={styles.detailsBox}>
            <span className={styles.detailsHeading}>
              Company Details
            </span>
            <div className={styles.detailsBoxContent}>
              <span className={styles.key}>Public Address: </span>
              <span className={styles.name}>
                {compData.comAdd}
              </span>
              <span className={styles.key}>Company Name: </span>
              <span className={styles.name}>{compData.name}</span>
              <span className={styles.key}>
                Corporate Identification Number:{" "}
              </span>
              <span className={styles.name}>{compData.cin}</span>
              <span className={styles.key}>Email ID: </span>
              <span className={styles.name}>
                {compData.email}
              </span>
            </div>
          </div>

          <div className={styles.detailsBox}>
            <div className={styles.detailsHeading}>
              <span>Products</span>
              <div>
                <button className={styles.viewAllBtn}>View All</button>
                <button onClick={openAddProductModal} className={styles.addProductBtn}>Add Product</button>
              </div>
            </div>
            {products.length > 0 ? (
              <>
                <div className={styles.docCardHeader}>
                  <span className={styles.docCardContent}>Product Name</span>
                  <span className={styles.docCardContent}>Codes Generated</span>
                </div>
                {products.map((item, index) => {
                  return (
                    <div
                      className={
                        index % 2 == 0
                          ? `${styles.docCard} ${styles.evenDocCard}`
                          : `${styles.docCard} ${styles.oddDocCard}`
                      }
                      onClick={() => {
                        //   openDocPage(item.file.cid, item.file.fileName);
                      }}
                    >
                      <span className={styles.docCardContent}>
                        {item.name}
                      </span>
                      <span className={styles.docCardContent}>
                        {item.codesGen}
                      </span>
                    </div>
                  );
                })}
              </>
            ) : (
              <span className={styles.emptyListMessage}>
                No documents found
              </span>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default CompanyDashboard;
