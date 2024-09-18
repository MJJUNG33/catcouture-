import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./PaginationControls.css";

// PaginationControls is with prev, next buttons, current page and total pages on the product page.
// implement conditions for buttons that prev button is disabled on the first page
// and next button is disabled on the last page.
const PaginationControls = ({ onPrev, onNext, currentPage, totalPages }) => {
  const prevDisable = currentPage > 1 ? false : true;
  const nextDisable = currentPage < totalPages ? false : true;

  return (
    <div className="container">
      <div className="controls">
        <div>
          <button
            aria-label="Previous page"
            onClick={onPrev}
            disabled={prevDisable}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </button>
        </div>
        <span>
          Page <span className="currentPage">{currentPage}</span> of{" "}
          {totalPages}
        </span>
        <div>
          <button
            aria-label="Next page"
            onClick={onNext}
            disabled={nextDisable}
          >
            <FontAwesomeIcon icon={faChevronRight} size="2x" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
