import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../Components/Pagination";

const pageSize = 9;

const Home = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [data, setData] = useState([]);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		const page = parseInt(window.location.search.split("=")[1] || 1);
		if (searchText === "") {
			loadPageData(page);
		} else {
			handleSearch(page);
		}
	}, [location]);

	const loadPageData = async (page) => {
		const res = await fetch(
			(process.env.REACT_APP_LOCAL_BACKEND_URL
				? process.env.REACT_APP_LOCAL_BACKEND_URL
				: "") +
				"/api?pageNumber=" +
				page +
				"&pageSize=" +
				pageSize
		);
		const data = await res.json();
		console.log(data);
		setData(data.data);
	};

	const onClickHandler = (e) => {
		const id = e.currentTarget.id;
		navigate("/show/" + id);
	};

	const handleSearch = (page) => {
		fetch(
			(process.env.REACT_APP_LOCAL_BACKEND_URL
				? process.env.REACT_APP_LOCAL_BACKEND_URL
				: "") +
				"/api/search?pageNumber=" +
				page +
				"&pageSize=" +
				pageSize,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					ImgName: searchText,
				}),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.status === "success") {
					setData(data.data);
				} else {
					alert("Error = " + data.message);
				}
			})
			.catch((err) => {
				alert("Error occured" + err.message);
				console.log(err);
			});
	};

	const moveNext = () => {
		const page = parseInt(window.location.search.split("=")[1] || 1);
		navigate("/?pageNumber=" + (page + 1));
	};

	const movePrevious = () => {
		const page = parseInt(window.location.search.split("=")[1] || 1);
		navigate("/?pageNumber=" + (page - 1));
	};

	return (
		<div className="container">
			<input
				value={searchText}
				type="text"
				placeholder="Search here"
				onChange={(e) => setSearchText(e.target.value)}
			/>
			<button onClick={handleSearch}>Search</button>
			<div className="imagesGrid">
				{data.length > 0 ? (
					data.map((item, index) => {
						return (
							<div
								className="imageContainer"
								key={item._id}
								id={item._id}
								onClick={onClickHandler}
							>
								<h1>{item.ImgName}</h1>
								<img src={item.ImgURL} alt="" />
								<p>{item.ImgDetails}</p>
							</div>
						);
					})
				) : (
					<div>Woops so empty here...</div>
				)}
			</div>
			<Pagination
				pageNumber={parseInt(window.location.search.split("=")[1] || 1)}
				isEmpty={data.length === 0}
				moveNext={moveNext}
				movePrevious={movePrevious}
			/>
		</div>
	);
};
export default Home;
