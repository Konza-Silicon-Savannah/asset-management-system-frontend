import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
                        currentPage,
                        totalPages,
                        totalItems,
                        itemsPerPage,
                        onPageChange,
                        showInfo = true
                    }) => {
    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show ellipsis logic for more pages
            if (currentPage <= 3) {
                // Show first 3 pages, ellipsis, and last page
                pages.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Show first page, ellipsis, and last 3 pages
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                // Show first page, ellipsis, current page with neighbors, ellipsis, last page
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pages;
    };

    const handlePageClick = (page) => {
        if (page !== '...' && page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    if (totalPages <= 1) {
        return null; // Don't show pagination if there's only one page or no pages
    }

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const customStyles = `
        .pagination .page-link {
            color: #495057 !important;
            border-color: #dee2e6 !important;
        }
        
        .pagination .page-item.active .page-link {
            background-color: #00763A !important;
            border-color: #00763A !important;
            color: white !important;
        }
        
        .pagination .page-link:hover:not(.disabled) {
            background-color: rgba(0, 118, 58, 0.1) !important;
            border-color: #00763A !important;
            color: #00763A !important;
        }
        
        .pagination .page-link:focus {
            box-shadow: 0 0 0 0.2rem rgba(0, 118, 58, 0.25) !important;
            color: #00763A !important;
        }
        
        .pagination .page-item.disabled .page-link {
            color: #6c757d !important;
        }
    `;

    return (
        <>
            <style>{customStyles}</style>
            <div className="d-flex justify-content-between align-items-center mt-4">
                {showInfo && (
                    <div className="text-muted">
                        Showing {startItem} to {endItem} of {totalItems} entries
                    </div>
                )}

                <nav aria-label="Page navigation">
                    <ul className="pagination mb-0">
                        {/* Previous Button */}
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                aria-label="Previous"
                            >
                                <FaChevronLeft />
                            </button>
                        </li>

                        {/* Page Numbers */}
                        {generatePageNumbers().map((page, index) => (
                            <li
                                key={index}
                                className={`page-item ${
                                    page === currentPage ? 'active' : ''
                                } ${page === '...' ? 'disabled' : ''}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => handlePageClick(page)}
                                    disabled={page === '...'}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}

                        {/* Next Button */}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                aria-label="Next"
                            >
                                <FaChevronRight />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Pagination;