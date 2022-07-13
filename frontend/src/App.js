import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import AddNew from "./pages/AddNew";
import Edit from "./pages/Edit";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./Components/Navbar";
function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/show/:id" element={<Details />}/>
				<Route path="/new" element={<AddNew />} />
				<Route path="/:id/edit" element={<Edit />} />
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</Router>
	);
}

export default App;
