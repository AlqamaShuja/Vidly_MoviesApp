import React from 'react';
import _ from 'lodash';
import PropType from 'prop-types';

const Pagination = (props) => {

    const { itemCount, pageSize, onPageChange, currentPage } = props;
    const pagesCount = Math.ceil(itemCount / pageSize) ;
    if(pagesCount === 1 ) return null;
    const pages = _.range(1, pagesCount + 1 );

    return ( 
        <div>
            <nav>
                <ul className="pagination"> 
                    {pages.map(page => (
                      <li key={page} className={page === currentPage ? "page-item active" : "page-item"}> 
                      <a className="page-link" 
                         onClick={()=> onPageChange(page)}> {page} </a> </li>
                   ))}
                </ul>
            </nav>
        </div>
     );
}

Pagination.propType = {
    itemCount: PropType.number.isRequired,
    pageSize: PropType.number.isRequired, 
    onPageChange: PropType.func.isRequired,
    currentPage: PropType.number.isRequired
}
 
export default Pagination;
