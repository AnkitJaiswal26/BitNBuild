import React from "react";

const ProductCanvas = ({ entry, draw, height, width }) => {
	const canvas = React.useRef();

	React.useEffect(() => {
		const context = canvas.current.getContext("2d");
		draw(context, entry, height, width);
	});

	return (
		<canvas
			className="templateCanvas"
			ref={canvas}
			height={height}
			width={width}
		/>
	);
};

export default ProductCanvas;
