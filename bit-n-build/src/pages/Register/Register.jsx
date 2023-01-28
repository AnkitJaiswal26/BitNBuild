import React, { useCallback, useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
// import { useCVPContext } from "../../Context/CVPContext";
// import { useAuth } from "../../Context/AuthContext";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
//import { authenticator } from "otplib";
import Modal from "react-modal";
//import axios from "../../helpers/axios";
import CloseIcon from '@mui/icons-material/Close';
import MoonLoader from 'react-spinners/MoonLoader';

const Register = () => {
    const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const [pubAddr, setPubAddr] = useState("");
  const [sid, setSid] = useState("");
  const [email, setEmail] = useState("");

  //BNB
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");


  const [mobileNo, setMobileNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

//   const { registerStudent, getStudent } = useCVPContext();
//   const { checkIfWalletConnected, currentAccount } = useAuth();

  function closeModal() {
    setModalIsOpen(false);
  }
//   const openModal = async (e) => {
//     e.preventDefault();
//     if (
//       pubAddr === "" ||
//       sid === "" ||
//       email === "" ||
//       name === "" ||
//       mobileNo === ""
//     ) {
//       alert("Enter all details first");
//       return;
//     } else {
//       setModalIsOpen(true);
//       console.log("hjdab");
//       await axios
//         .post("/register", { email })
//         .then((res) => {
//           console.log("res", res);
//         })
//         .catch((err) => {
//           console.log("Errrr", err);
//         });
//     }
//   };

	// useEffect(() => {
	// 	checkIfWalletConnected();
	// }, []);

//   const fetchStudent = useCallback(async () => {
//     try {
//       const student = await getStudent();
//       if (student) {
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       // console.log(err);
//     }
//   });

// 	useEffect(() => {
// 		fetchStudent();
// 		setPubAddr(currentAccount);
// 	}, [currentAccount]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // if(isLoading){
    //   return;
    // }
    // try {
    //   setIsLoading(true);
    //   await axios
    //     .post("/register/otp", { otp })
    //     .then((res) => {
    //       console.log("res", res);
    //     })
    //   try {
    //     await registerStudent(name, email, pubAddr, mobileNo, sid);

    //     navigate("/dashboard");
    //   } catch (err) {
    //     console.log(err);
    //     setIsLoading(false);
    //     return;
    //   }
    // } catch (err) {
    //   setIsLoading(false);
    //   console.log("OTP error on frontend", err);
    // }
    console.log("Register")
  };
  const handleGenderChnage = (e) => {
    setGender(e.target.value);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Enter OTP"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={closeModal}>
          <CloseIcon />
        </button>
        <h2
          className={styles.heading}
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          Enter OTP
        </h2>

        <form>
          <div className={styles.inputGroup}>
            <input
              className={`${styles.input}`}
              style={{
                resize: "none",
              }}
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
          </div>

          <button className={`${styles.submitButton}`} onClick={handleSubmit}>
            
            {isLoading ? <MoonLoader className={styles.loader} color="white" size={20}/> : 'Submit'}
          </button>
        </form>
        </div>
        
      </Modal>
      <div className={styles.registerPageContainer}>
        <form className={`${styles.formBox}`}>
            <div className={`${styles.header}`}>Want to make your Product Sales safer?</div>
          <h2 className={`${styles.heading}`}>Register</h2>

          <div className={`${styles.inputContainer}`}>
            <label className={`${styles.inputLabel}`}>Full Name</label>
            <input
              className={`${styles.input}`}
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className={`${styles.inputContainer}`}>
            <label className={`${styles.inputLabel}`}>Age</label>
            <input
              className={`${styles.input}`}
              type="text"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </div>
          <div className={`${styles.inputContainer}`}>
                <label className={`${styles.inputLabel}`}>Gender</label>
                <select
                  className={`${styles.input}`}
                  onChange={handleGenderChnage}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
            </div>

          <button  className={styles.registerBtn}>
            Register
            <ArrowForwardIcon className={styles.arrowForwardIcon}/>
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
