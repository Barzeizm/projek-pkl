import React from "react";

const Paginations = ({
    totalPosts,
    ticketsPerPage,
    setCurrentTickets,
    currentPage,
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / ticketsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className=''>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentTickets(page)}
                        className={page == currentPage ? "active" : ""}>
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default Paginations;