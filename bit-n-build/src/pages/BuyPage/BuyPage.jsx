import React from "react";
import styles from "./BuyPage.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useSafeBuyContext } from "../../Context/SafeBuyContext";
import { stat } from "fs";
import ProductCanvas from "../ProductPage/ProductCanvas";

const BuyPage = () => {
	const { checkIfWalletConnected, currentAccount } = useAuth();
	const [product, setProduct] = useState([]);
	const [productName, setProductName] = useState("");
	const [companyName, setCompanyName] = useState("");
	const [state, setState] = useState(0);
	const [cidOfCard, setCidOfCard] = useState("");

	useEffect(() => {
		checkIfWalletConnected();
		fetchProductItem();
		checkStateOfProductItem();
	}, []);

	useEffect(() => {
		if (currentAccount !== "") {
			fetchUser();
		}
	}, [currentAccount]);

	const [user, setUser] = useState([]);

	const fetchUser = useCallback(async () => {
		try {
			const user = await fetchUserByAddress(currentAccount);
			setUser(user);
			console.log(user);
		} catch (err) {
			console.log(err);
		}
	});

	const {
		buyProduct,
		fetchProductItemById,
		fetchProductById,
		fetchCompanyByAddress,
		fetchCompanyNFTAddress,
		checkState,
		fetchUserByAddress,
		fetchProductItemByPrivateKey,
		uploadFilesToIPFS,
	} = useSafeBuyContext();

	const fetchProductItem = useCallback(async () => {
		try {
			var companyAddress = window.location.pathname.split("/")[2];
			var privateKey = window.location.pathname.split("/")[3];

			console.log(typeof privateKey);

			const companyNFTAddress = await fetchCompanyNFTAddress(
				companyAddress
			);
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

			var productItem = {
				productName: product.name,
				companyName: company.name,
				cin: company.cin,
				manDate: data.man_date,
				exDate: data.ex_date,
			};
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

			const companyNFTAddress = await fetchCompanyNFTAddress(
				companyAddress
			);
			console.log(companyAddress, "aa", companyNFTAddress);

			const id = await fetchProductItemByPrivateKey(
				companyNFTAddress,
				privateKey
			);
			console.log("ProductItem ID", id);

			const productItem = await fetchProductItemById(
				companyNFTAddress,
				id
			);
			console.log(productItem);
			setCidOfCard(productItem.cid);

			const data = await checkState(
				companyNFTAddress,
				productItem.pubKey
			);
			console.log("checkState", data.toNumber());
			setState(parseInt(data));
			return parseInt(data.toNumber());
		} catch (err) {
			console.log(err);
		}
	});

	function dataURLtoFile(dataurl, filename) {
		var arr = dataurl.split(","),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		return new File([u8arr], filename, { type: mime });
	}

	const checkProduct = useCallback(async () => {
		try {
			var companyAddress = window.location.pathname.split("/")[2];
			var privateKey = window.location.pathname.split("/")[3];

			const companyNFTAddress = await fetchCompanyNFTAddress(
				companyAddress
			);

			var canvases = document.getElementsByClassName("templateCanvas");
			console.log(canvases[0]);
			var url = canvases[0].toDataURL("image/png");

			let file = dataURLtoFile(url, "warranty.png");
			const cid = await uploadFilesToIPFS([file]);
			console.log(cid);
			await buyProduct(companyNFTAddress, privateKey, cid);
			// (contractAddress, privateKey, tokenURI)
			console.log("Product purchased and Private Key verified");
		} catch (err) {
			console.log(err);
		}
	});

	const draw = async (context, entry, height, width) => {
		var img = document.getElementById("templateImage");
		context.drawImage(img, 0, 0, width, height);
		context.font = "28px Arial";
		context.fillStyle = "red";
		context.fillText(user.name, 300, 598);

		context.font = "15px Arial";
		context.fillText(user.userAdd, 300, 555);
	};

	return (
		<>
			{state == 0 ? (
				<div className={styles.verifyPageContainer}>
					{product.productName ? (
						<div className={styles.verifyContainer}>
							<span className={styles.verifyDetails}>
								Product Name:{" "}
								<span className={styles.detailsContent}>
									{product.productName}
								</span>
							</span>
							<span className={styles.verifyDetails}>
								Company:{" "}
								<span className={styles.detailsContent}>
									{product.companyName}
								</span>
							</span>
							<span className={styles.verifyDetails}>
								Company Identification Number:{" "}
								<span className={styles.detailsContent}>
									{product.cin}
								</span>
							</span>
							<span className={styles.verifyDetails}>
								Manufacture Date:{" "}
								<span className={styles.detailsContent}>
									{product.manDate}
								</span>
							</span>
							<span className={styles.verifyDetails}>
								Expiry Date:{" "}
								<span className={styles.detailsContent}>
									{product.exDate}
								</span>
							</span>
							<button
								onClick={checkProduct}
								className={styles.checkProductBtn}
							>
								Buy Product
							</button>
							<div className={styles.canvasContainer}>
								<ProductCanvas
									entry={{
										product: product,
									}}
									draw={draw}
									height={900}
									width={700}
								/>
							</div>

							<img
								id="templateImage"
								className={styles.templateImage}
								height={900}
								width={700}
                crossorigin="anonymous"
								src={`https://${cidOfCard}.ipfs.w3s.link/warranty.png`}
							/>
						</div>
					) : (
						<></>
					)}
				</div>
			) : (
				<div className={styles.productPurchasedMessage}>
					The Product is already purchased!
				</div>
			)}
		</>
	);
};

export default BuyPage;
