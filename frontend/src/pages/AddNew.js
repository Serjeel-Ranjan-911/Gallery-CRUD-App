import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNew = () => {
	const navigate = useNavigate();
	const [ImgName, setImgName] = useState("");
	const [ImgURL, setImgURL] = useState("");
	const [ImgDetails, setImgDetails] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			ImgName,
			ImgURL,
			ImgDetails,
		};
		console.log(data);
		fetch(
			(process.env.REACT_APP_LOCAL_BACKEND_URL
				? process.env.REACT_APP_LOCAL_BACKEND_URL
				: "") + "/api",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.status === "success") {
					alert("Successfully added");
					navigate("/");
				} else {
					alert("Error = " + data.message);
				}
			})
			.catch((err) => {
				alert("Error adding image" + err.message);
				console.log(err);
			});
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<label>Image Name:</label>
				<input
					type="text"
					value={ImgName}
					name="ImgName"
					onChange={(e) => setImgName(e.target.value)}
				/>
				<label>Image URL:</label>
				<input
					type="text"
					value={ImgURL}
					name="ImgURL"
					onChange={(e) => setImgURL(e.target.value)}
				/>
				<label>Image Details:</label>
				<input
					type="text"
					value={ImgDetails}
					name="ImgDetails"
					onChange={(e) => setImgDetails(e.target.value)}
				/>
				<button type="submit" value="Submit">
					Submit
				</button>
			</form>
		</div>
	);
};
export default AddNew;
