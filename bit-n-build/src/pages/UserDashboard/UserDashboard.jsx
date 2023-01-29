import React from "react";
import styles from "./UserDashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSafeBuyContext } from "../../Context/SafeBuyContext";
import { useAuth } from "../../Context/AuthContext";

const UserDashboard = () => {
	const navigate = useNavigate();

	const { checkIfWalletConnected, currentAccount } = useAuth();
	const [user, setUser] = useState([]);

	useEffect(() => {
		checkIfWalletConnected();
	}, [currentAccount]);

	const {
		registerUser,
		fetchUserByAddress,
		fetchUserItems,
		fetchAllCompaniesNFT,
	} = useSafeBuyContext();
	const fetchUser = useCallback(async () => {
		try {
			const data = await fetchUserByAddress(currentAccount);
			console.log(data);
			setUser(data);
		} catch (err) {
			navigate("/register");
		}
	});

	useEffect(() => {
		if (currentAccount) {
			fetchUser();
			fetchUserProductItems();
		}
	}, [currentAccount]);

	const fetchUserProductItems = async () => {
		try {
			const companies = await fetchAllCompaniesNFT();
			var result = [];
			for (let i = 0; i < companies.length; i++) {
				const temp = await fetchUserItems(companies[i]);
				result = [...result, ...temp];
			}
			console.log(companies);
		} catch (err) {
			console.log(err);
		}
	};

	const products = useState([
		{
			name: "Airdopes 121 v2",
			expiryDate: "15/07/2023",
		},
		{
			name: "Rockerz 235 v2",
			expiryDate: "15/07/2023",
		},
		{
			name: "BassHeads 100",
			expiryDate: "15/07/2023",
		},
		{
			name: "BassHeads 103",
			expiryDate: "15/07/2023",
		},
	]);

	return (
		<>
			<ToastContainer />
			<div className={styles.companyDashboardContainer}>
				<div className={styles.dashboardBox}>
					<div className={styles.heading}>
						Welcome{" "}
						<span className={styles.accountName}>{user.name}</span>
					</div>

					<div className={styles.detailsBox}>
						<span className={styles.detailsHeading}>
							My Profile
						</span>
						<div className={styles.detailsBoxContent}>
							<span className={styles.key}>Public Address: </span>
							<span className={styles.name}>{user.userAdd}</span>
							<span className={styles.key}>Name: </span>
							<span className={styles.name}>{user.name}</span>
							<span className={styles.key}>Email ID: </span>
							<span className={styles.name}>{user.email}</span>
						</div>
					</div>

					<div className={styles.detailsBox}>
						<div className={styles.detailsHeading}>
							<span>Purchased Products</span>
						</div>
						{products.length > 0 ? (
							<>
								<div className={styles.docCardHeader}>
									<span className={styles.docCardContent}>
										Product Name
									</span>
									<span className={styles.docCardContent}>
										Expiry Date
									</span>
									<span className={styles.docCardContent}>
										Guarantee Card
									</span>
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
											<span
												className={
													styles.docCardContent
												}
											>
												{item.name}
											</span>
											<span
												className={
													styles.docCardContent
												}
											>
												{item.expiryDate}
											</span>
											<span
												className={
													styles.docCardContent
												}
											>
												<a href={item.guarenteeCard}>
													Open
												</a>
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

export default UserDashboard;
