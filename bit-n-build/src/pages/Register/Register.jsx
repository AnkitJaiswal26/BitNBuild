import React, { useCallback, useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
// import { useCVPContext } from "../../Context/CVPContext";
// import { useAuth } from "../../Context/AuthContext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
//import { authenticator } from "otplib";
import Modal from "react-modal";
//import axios from "../../helpers/axios";
import CloseIcon from "@mui/icons-material/Close";
import MoonLoader from "react-spinners/MoonLoader";
import { useSafeBuyContext } from "../../Context/SafeBuyContext";
import { useAuth } from "../../Context/AuthContext";

const Register = () => {
	const navigate = useNavigate();

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [otp, setOtp] = useState("");

	const [pubAddr, setPubAddr] = useState("");
	const [sid, setSid] = useState("");
	const [email, setEmail] = useState("");

	//BNB
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);
	const [gender, setGender] = useState(false);

	const [mobileNo, setMobileNo] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { checkIfWalletConnected, currentAccount } = useAuth();

	useEffect(() => {
		checkIfWalletConnected();
	}, [currentAccount]);

	const { registerUser, fetchUserByAddress, fetchCompanyByAddress } =
		useSafeBuyContext();
	const fetchUser = useCallback(async () => {
		try {
			const user = await fetchUserByAddress(currentAccount);
			console.log(user);
			if (user.name !== "") {
				navigate("/");
			} else {
				const company = await fetchCompanyByAddress(currentAccount);
				if (company.cin !== "") {
					navigate("/");
				}
			}
		} catch (err) {}
	});

	useEffect(() => {
		if (currentAccount) fetchUser();
	}, [currentAccount]);

	const handleSubmit = async (e) => {
		console.log("Hello");
		e.preventDefault();
		try {
			console.log(currentAccount, name, email, mobileNo, gender, age);
			await registerUser(
				currentAccount,
				name,
				email,
				mobileNo,
				gender,
				age
			);
		} catch (err) {
			console.log(err);
		}
		console.log("Register");
	};

	return (
		<>
			<div className={styles.registerPageContainer}>
				<form className={`${styles.formBox}`} onSubmit={handleSubmit}>
					<div className={`${styles.header}`}>
						Want to make your Product Sales safer?
					</div>
					<h2 className={`${styles.heading}`}>Register</h2>

					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Full Name
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							onChange={(e) => setName(e.target.value)}
							value={name}
						/>
					</div>
					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>Email</label>
						<input
							className={`${styles.input}`}
							type="text"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</div>
					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Mobile No
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							onChange={(e) => setMobileNo(e.target.value)}
							value={mobileNo}
						/>
					</div>
					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>Age</label>
						<input
							className={`${styles.input}`}
							type="number"
							onChange={(e) => setAge(e.target.value)}
							value={age}
						/>
					</div>
					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>Gender</label>
						<select
							className={`${styles.input}`}
							onChange={(e) => setGender(e.target.value)}
						>
							<option value={true}>Male</option>
							<option value={false}>Female</option>
							{/* <option>Others</option> */}
						</select>
					</div>

					<button
						className={styles.registerBtn}
						onClick={handleSubmit}
					>
						Register
						<ArrowForwardIcon className={styles.arrowForwardIcon} />
					</button>
				</form>
			</div>
		</>
	);
};

export default Register;
