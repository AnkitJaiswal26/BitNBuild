import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";
import { useSafeBuyContext } from "../../Context/SafeBuyContext";
import styles from "./ProductPage.module.css";
import { v4 as uuidv4 } from "uuid";
import * as xlsx from "xlsx";

const ProductPage = () => {
	const navigate = useNavigate();
	const [compData, setCompData] = useState([]);
	const [companyNFTAdd, setCompanyNFTAdd] = useState("");
	const [productDetails, setProductDetails] = useState([]);

	const [productItems, setProductItems] = useState([]);

	const { checkIfWalletConnected, currentAccount } = useAuth();

	useEffect(() => {
		checkIfWalletConnected();
	}, [currentAccount]);

	const {
		fetchCompanyByAddress,
		fetchCompanyNFTAddress,
		fetchAllProductItemsByProductId,
		fetchProductById,
		addBulkProducts,
	} = useSafeBuyContext();

	const fetchUser = useCallback(async () => {
		try {
			const company = await fetchCompanyByAddress(currentAccount);
			setCompData(company);

			const compNFTAdd = await fetchCompanyNFTAddress(company.comAdd);
			setCompanyNFTAdd(compNFTAdd);
		} catch (err) {
			console.log(err);
			// navigate("/registerCompany");
		}
	});

	const fetchProducts = useCallback(async () => {
		const productId = window.location.pathname.split("/")[2];
		const result = await fetchProductById(
			companyNFTAdd,
			parseInt(productId)
		);
		setProductDetails(result);
		console.log(result);

		const data = await fetchAllProductItemsByProductId(
			companyNFTAdd,
			productId
		);

		setProductItems(data);

		console.log(data);
	});
	const productId = window.location.pathname.split("/")[2];

	useEffect(() => {
		if (currentAccount) fetchUser();
		if (companyNFTAdd) fetchProducts();
	}, [currentAccount, companyNFTAdd]);

	const handleSubmit = async (e) => {
		console.log(validity, manufDate);
		e.preventDefault();

		var pubKeys = [];
		var privateKeys = [];
		var tokenURI = [];
		var validities = [];
		var manuDates = [];
		var expDates = [];

		console.log("Hello");

		const codesURLList = [];

		for (let i = 0; i < codesQuantity; i++) {
			console.log("Hello");
			const publicKey = uuidv4();
			const privateKey = uuidv4();
			pubKeys.push(publicKey);
			privateKeys.push(privateKey);
			tokenURI.push("");
			validities.push(validity);
			manuDates.push(manufDate);
			expDates.push(expiryDate);
			codesURLList.push({
				publicURL: `http://localhost:3000/verify/${compData.comAdd}/${publicKey}`,
				privateURL: `http://localhost:3000/buy/${compData.comAdd}/${privateKey}`
			});
		}

		console.log(
			companyNFTAdd,
			productId,
			pubKeys,
			privateKeys,
			manuDates,
			expDates,
			tokenURI,
			validities
		);

		await addBulkProducts(
			companyNFTAdd,
			productId,
			pubKeys,
			privateKeys,
			manuDates,
			expDates,
			tokenURI,
			validities
		);

		const worksheet = xlsx.utils.json_to_sheet(codesURLList);
		const workbook = xlsx.utils.book_new();
  		xlsx.utils.book_append_sheet(workbook, worksheet, "Codes URL");
		xlsx.writeFile(workbook, `codes-${productId}.xlsx`);

	};

	const [codesQuantity, setCodesQuantity] = useState(0);
	const [manufDate, setManufDate] = useState();
	const [expiryDate, setExpiryDate] = useState();
	const [validity, setValidity] = useState(0);

	return (
		<div className={styles.productPageContainer}>
			<div className={styles.productPageContent}>
				{productDetails.length && (
					<div className={styles.detailsBox}>
						<span className={styles.detailsHeading}>
							Product Details
						</span>
						<div className={styles.detailsBoxContent}>
							<span className={styles.key}>Product ID: </span>
							<span className={styles.name}>
								{productDetails.productId.toNumber()}
							</span>
							<span className={styles.key}>Product Name: </span>
							<span className={styles.name}>
								{productDetails.name}
							</span>
							<span className={styles.key}>MRP: </span>
							<span className={styles.name}>
								{productDetails.price.toNumber()}
							</span>
							<span className={styles.key}>
								No. of Codes generated:{" "}
							</span>
							<span className={styles.name}>
								{productItems.length}
							</span>
						</div>
					</div>
				)}

				<div className={styles.detailsBox}>
					<span className={styles.detailsHeading}>
						Generate New Codes
					</span>
					<div className={styles.genCodeContent}>
						<div className={styles.inputContainer}>
							<label className={styles.inputLabel}>
								Quantity of codes:{" "}
							</label>
							<input
								className={styles.input}
								placeholder="Quantity"
								onChange={(e) =>
									setCodesQuantity(e.target.value)
								}
								type="number"
								value={codesQuantity}
							/>
							<label className={styles.inputLabel}>
								Manufacture Date:{" "}
							</label>
							<input
								className={styles.input}
								type="date"
								onChange={(e) => setManufDate(e.target.value)}
								value={manufDate}
							/>
							<label className={styles.inputLabel}>
								Expiry Date:{" "}
							</label>
							<input
								className={styles.input}
								type="date"
								onChange={(e) => setExpiryDate(e.target.value)}
								value={expiryDate}
							/>
							<label className={styles.inputLabel}>
								Validity:{" "}
							</label>
							<input
								className={styles.input}
								placeholder="Validity in yrs"
								onChange={(e) => setValidity(e.target.value)}
								type="number"
								value={validity}
							/>
						</div>
						<div>
							<button
								className={styles.genCodesBtn}
								onClick={handleSubmit}
							>
								Generate Codes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
