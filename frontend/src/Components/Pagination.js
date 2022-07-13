import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Pagination = (props) => {
	return (
		<div className="pagination">
			{props.pageNumber > 1 && (
				<BsFillArrowLeftCircleFill onClick={props.movePrevious} />
			)}
			<p>{props.pageNumber}</p>
			{!props.isEmpty && (
				<BsFillArrowRightCircleFill onClick={props.moveNext} />
			)}
		</div>
	);
};

export default Pagination;
