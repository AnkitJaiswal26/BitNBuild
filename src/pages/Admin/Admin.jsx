import React from "react";
import styles from "./Admin.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { ToastContainer, toast } from "react-toastify";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { useSafeBuyContext } from "../../Context/SafeBuyContext";

const Admin = () => {
  const navigate = useNavigate();
  const { checkIfWalletConnected, currentAccount } = useAuth();

  const [requests, setRequests] = useState([]);
  const [owner, setIsOwner] = useState(false);

  const { fetchActiveRequests, acceptCompany, rejectCompany, isOwnerAddress } =
    useSafeBuyContext();

  const fetchAdmin = async () => {
    try {
      var own = await isOwnerAddress();
      setIsOwner(own);
      console.log(own);
      if (!own) navigate("/register");
      else fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(currentAccount);
    checkIfWalletConnected();
    if (currentAccount !== "") {
      fetchAdmin();
    }
  }, [currentAccount]);

  const fetchRequests = useCallback(async () => {
      console.log("Hello Admin :)");
      try {
        const data = await fetchActiveRequests();
        setRequests(data);
      } catch (err) {
        console.log(err);
      }
    
  });

  const acceptComp = useCallback(async (e, comAdd) => {
    console.log("Hello verifier, accept me :)");
    e.preventDefault();
    try {
      await acceptCompany(comAdd);
      console.log("Company Accepted");
    } catch (err) {
      console.log(err);
    }
  });

  const rejectComp = useCallback(async (e, comAdd) => {
    console.log("Hello verifier, reject me :(");
    e.preventDefault();
    try {
      await rejectCompany(comAdd);
      console.log("Company Rejected");
    } catch (err) {
      console.log(err);
    }
  });
  // const companies = [
  //     {
  //         name: "Boat",
  //         cin: "U74999UP2016PTC084312",
  //         category: "Electronics"
  //     },
  //     {
  //         name: "Samsung",
  //         cin: "U74999UP2016PTC084312",
  //         category: "Electronics"
  //     },
  //     {
  //         name: "Britania 50-50",
  //         cin: "U74999UP2016PTC084312",
  //         category: "Snacks"
  //     }
  // ];

  return (
    <>
      <ToastContainer />
      <div className={styles.companyDashboardContainer}>
        <div className={styles.dashboardBox}>
          <div className={styles.detailsBox}>
            <div className={styles.detailsHeading}>
              <span>Requests</span>
            </div>
            {requests.length > 0 ? (
              <>
                <div className={styles.docCardHeader}>
                  <span className={styles.docCardContent}>Company Name</span>
                  <span className={styles.docCardContent}>
                    Company Identification Number
                  </span>
                  <span className={styles.docCardContent}>Category</span>
                  <span className={styles.docCardContent}>Verify</span>
                </div>
                {requests.map((item, index) => {
                  return (
                    <div
                      className={
                        index % 2 == 0
                          ? `${styles.docCard} ${styles.evenDocCard}`
                          : `${styles.docCard} ${styles.oddDocCard}`
                      }
                      key={index}
                    >
                      <span className={styles.docCardContent}>{item.name}</span>
                      <span className={styles.docCardContent}>{item.cin}</span>
                      <span className={styles.docCardContent}>
                        {item.category}
                      </span>
                      <span className={styles.docCardContent}>
                        <button
                          className={styles.viewAllBtn}
                          onClick={(e) => {
                            acceptComp(e, item.comAdd);
                          }}
                        >
                          <DoneRoundedIcon />
                        </button>
                        <button
                          className={styles.viewAllBtn}
                          onClick={(e) => {
                            rejectComp(e, item.comAdd);
                          }}
                        >
                          <CloseRoundedIcon />
                        </button>
                      </span>
                    </div>
                  );
                })}
              </>
            ) : (
              <span className={styles.emptyListMessage}>No response found</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
