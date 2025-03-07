"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [maxPagesToShow, setMaxPagesToShow] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      setMaxPagesToShow(window.innerWidth < 640 ? 3 : 5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderPageNumbers = () => {
    const pages = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="px-2 sm:px-3 py-1 rounded hover:bg-primary-blue text-primary-black text-sm sm:text-base"
        >
          1
        </button>
      );

      if (startPage > 2) {
        pages.push(
          <span
            key="ellipsis-start"
            className="px-1 sm:px-2 text-primary-black"
          >
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-2 sm:px-3 py-1 rounded text-sm sm:text-base ${
            i === currentPage
              ? "bg-primary-yellow text-primary-black font-bold"
              : "hover:bg-primary-blue text-primary-black"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis-end" className="px-1 sm:px-2 text-primary-black">
            ...
          </span>
        );
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-2 sm:px-3 py-1 rounded hover:bg-primary-blue text-primary-black text-sm sm:text-base"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
      <div className="text-sm text-primary-black order-2 sm:order-1">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex items-center gap-1 order-1 sm:order-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-1 rounded ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-primary-blue text-primary-black"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center">{renderPageNumbers()}</div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-1 rounded ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-primary-blue text-primary-black"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
