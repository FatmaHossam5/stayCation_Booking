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
      rowsPerPageOptions={[10, 25, 50, 100]}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};

export default CustomPagination;