import React from 'react';
import Pagination from '@mui/material/Pagination';


const CustomPagination = ({ totalCount, currentPage, onPageChange, rowsPerPage, onRowsPerPageChange }) => {
  return (
    <Pagination
      count={Math.ceil(totalCount / rowsPerPage)}
      page={currentPage}
      onChange={onPageChange}
      showFirstButton
      showLastButton

      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};

export default CustomPagination;