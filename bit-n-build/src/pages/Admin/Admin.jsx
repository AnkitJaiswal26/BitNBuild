import React from "react";
import styles from "./Admin.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { ToastContainer, toast } from "react-toastify";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();

    const companies = [
        {
            name: "Boat",
            cin: "U74999UP2016PTC084312", 
            category: "Electronics"
        },
        {
            name: "Samsung",
            cin: "U74999UP2016PTC084312",
            category: "Electronics"
        },
        {
            name: "Britania 50-50",
            cin: "U74999UP2016PTC084312",
            category: "Snacks"
        }
    ];
    const requests = [];
    const requestType = "Update"

  return (
    <>
      <ToastContainer />
        <div className={styles.companyDashboardContainer}>
          <div className={styles.dashboardBox}>

            <div className={styles.detailsBox}>
              <div className={styles.detailsHeading}>
                <span>Requests</span>
              </div>
              {companies.length > 0 ? (
                <>
                  <div className={styles.docCardHeader}>
                    <span className={styles.docCardContent}>Company Name</span>
                    <span className={styles.docCardContent}>Company Identification Number</span>
                    <span className={styles.docCardContent}>Category</span>
                    <span className={styles.docCardContent}>Verify</span>
                  </div>
                  {companies.map((item, index) => {
                    return (
                      <div
                        className={
                          index % 2 == 0
                            ? `${styles.docCard} ${styles.evenDocCard}`
                            : `${styles.docCard} ${styles.oddDocCard}`
                        }
                      >
                        <span className={styles.docCardContent}>
                          {item.name}
                        </span>
                        <span className={styles.docCardContent}>
                          {item.cin}
                        </span>
                        <span className={styles.docCardContent}>
                          {item.category}
                        </span>
                        <span className={styles.docCardContent}>
                        <button className={styles.viewAllBtn} 
                            onClick={() => {
                            //   Verify Company;
                            }}
                        ><DoneRoundedIcon /></button>
                        <button className={styles.viewAllBtn}
                            onClick={() => {
                            //   Reject Company;
                            }}
                        ><CloseRoundedIcon /></button>
                        </span>
                      </div>
                    );
                  })}
                </>
              ) : (
                <span className={styles.emptyListMessage}>
                  No response found
                </span>
              )}
            </div>

            </div>
        </div>
    </>
  );
};

export default Admin;
