import React from "react"

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  showNumbers?: boolean
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  showNumbers = true,
}) => {
  if (totalPages <= 1) return null

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    onPageChange(page)
  }

  const renderPageNumbers = () => {
    const pages = []

    // simple window logic (3 pages around current)
    const start = Math.max(1, currentPage - 1)
    const end = Math.min(totalPages, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  const pages = renderPageNumbers()

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Prev Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {showNumbers && (
        <div className="flex gap-2">
          {currentPage > 2 && (
            <>
              <button
                onClick={() => goToPage(1)}
                className="px-3 py-1 border rounded"
              >
                1
              </button>
              {currentPage > 3 && <span className="px-2">...</span>}
            </>
          )}

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 border rounded ${
                page === currentPage ? "bg-black text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 2 && <span className="px-2">...</span>}
              <button
                onClick={() => goToPage(totalPages)}
                className="px-3 py-1 border rounded"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
      )}

      {/* Next Button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}