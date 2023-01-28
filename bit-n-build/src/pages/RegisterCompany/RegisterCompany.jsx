import React, { useCallback, useEffect, useState } from "react";
import styles from "./RegisterCompany.module.css";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import MoonLoader from "react-spinners/MoonLoader";
import { useSafeBuyContext } from "../../Context/SafeBuyContext";
import { useAuth } from "../../Context/AuthContext";

const Register = () => {
	const navigate = useNavigate();

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [otp, setOtp] = useState("");

	const [email, setEmail] = useState("");

	//BNB
	const [companyName, setCompanyName] = useState("");
	const [cin, setCin] = useState("");
	const [category, setCategory] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	function closeModal() {
		setModalIsOpen(false);
	}

	const { checkIfWalletConnected, currentAccount } = useAuth();

	useEffect(() => {
		checkIfWalletConnected();
	}, [currentAccount]);

	const { registerCompany, fetchCompanyByAddress } = useSafeBuyContext();

	const fetchUser = useCallback(async () => {
		try {
			const company = await fetchCompanyByAddress(currentAccount);
			if (company.cin !== "") {
				navigate("/companyDashboard");
			}
		} catch (err) {}
	});

	useEffect(() => {
		if (currentAccount) fetchUser();
	}, [currentAccount]);

	const handleSubmit = async (e) => {
		console.log("Register");
		console.log("Hello");
		e.preventDefault();
		try {
			console.log(currentAccount, companyName, cin);
			await registerCompany(currentAccount, companyName, cin);
		} catch (err) {
			console.log(err);
		}
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

						<button
							className={`${styles.submitButton}`}
							onClick={handleSubmit}
						>
							{isLoading ? (
								<MoonLoader
									className={styles.loader}
									color="white"
									size={20}
								/>
							) : (
								"Submit"
							)}
						</button>
					</form>
				</div>
			</Modal>
			<div className={styles.registerPageContainer}>
				<form className={`${styles.formBox}`} onSubmit={handleSubmit}>
					<div className={`${styles.header}`}>
						Want to make your Product Sales safer?
					</div>
					<h2 className={`${styles.heading}`}>Register</h2>

					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Company Name
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							onChange={(e) => setCompanyName(e.target.value)}
							value={companyName}
						/>
					</div>
					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Company Identification Number
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							onChange={(e) => setCin(e.target.value)}
							value={cin}
						/>
					</div>
					<div className={`${styles.inputContainer}`}>
						<label className={`${styles.inputLabel}`}>
							Category
						</label>
						<input
							className={`${styles.input}`}
							type="text"
							onChange={(e) => setCategory(e.target.value)}
							value={category}
						/>
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
