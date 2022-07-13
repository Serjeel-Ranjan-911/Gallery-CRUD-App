import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Details = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);

	useEffect(() => {
		const id = window.location.pathname.split("/")[2];

		(async () => {
			const res = await fetch(
				(process.env.REACT_APP_LOCAL_BACKEND_URL
					? process.env.REACT_APP_LOCAL_BACKEND_URL
					: "") +
					"/api/show/" +
					id
			);
			const data = await res.json();
			console.log(data);
			setData(data.data);
		})();
	}, []);

	const deleteButtonHandler = () => {
		const id = window.location.pathname.split("/")[2];
		fetch(
			(process.env.REACT_APP_LOCAL_BACKEND_URL
				? process.env.REACT_APP_LOCAL_BACKEND_URL
				: "") +
				"/api/delete/" +
				id,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.status === "success") {
					alert("Successfully deleted");
				} else {
					alert("Error = " + data.message);
				}
				navigate(`/`);
			})
			.catch((err) => {
				alert("Error deleting image" + err.message);
				console.log(err);
			});
	};

	const editButtonHandler = () => {
		const id = window.location.pathname.split("/")[2];
		navigate(`/${id}/edit/`);
	};

	return (
		<div className="container">
			<div key={data._id}>
				<h1>{data.ImgName}</h1>
				<img src={data.ImgURL} alt="" />
				<p>{data.ImgDetails}</p>
			</div>

			<div>
				<button onClick={deleteButtonHandler}>Delete</button>
				<button onClick={editButtonHandler}>Edit</button>
			</div>
		</div>
	);
};
export default Details;
