import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@biconomy/web3-auth/dist/src/style.css";

import { AuthContextProvider } from "./Context/AuthContext";
import { SafeBuyProvider } from "./Context/SafeBuyContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<SafeBuyProvider>
				<App />
			</SafeBuyProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
