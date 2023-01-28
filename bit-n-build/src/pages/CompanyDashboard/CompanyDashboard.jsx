import React from "react";
import styles from "./CompanyDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Modal } from "@mui/material";

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

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
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
      setIsAddProductModalOpen(true);
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
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <button onClick={closeAddProductModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
        <div className={styles.companyDashboardContainer}>
          <div className={styles.dashboardBox}>
            <div className={styles.heading}>
              Welcome{" "}
              <span className={styles.accountName}>boAt</span>
            </div>

            <div className={styles.detailsBox}>
              <span className={styles.detailsHeading}>Company Details</span>
              <div className={styles.detailsBoxContent}>
                <span className={styles.key}>Public Address: </span>
                <span className={styles.name}>0xDDDa8055aa402769499a6695cC90c84160d3148f</span>
                <span className={styles.key}>Company Name: </span>
                <span className={styles.name}>boAt Lifestyles</span>
                <span className={styles.key}>Corporate Identification Number: </span>
                <span className={styles.name}>U74999UP2016PTC084312</span>
                <span className={styles.key}>Email ID: </span>
                <span className={styles.name}>info@boat-lifestyle.com</span>
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
