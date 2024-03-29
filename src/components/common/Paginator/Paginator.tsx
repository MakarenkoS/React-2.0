import React from 'react';
import {useState} from 'react';
import classes from './Paginator.module.css';

type PropsType = {
    portionSize?: number
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged?: (pageNumber: number)=>void
}

let Paginator: React.FC<PropsType> = ({portionSize = 10, totalItemsCount, pageSize, currentPage = 1, onPageChanged = x => x} ) => {
   
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: Array<number> = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    // portionSize - кол-во кнопок страниц
    // props.pageSize - кол-во итемов на странице

    let portionCount = Math.ceil(pagesCount / portionSize); 
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber-1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    


    return (
        <div className={classes.paginatorList}>

            {portionNumber > 1 &&
                <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <span className={(p === currentPage && classes.selectedPage).toString()}
                        onClick={(e) => {
                            onPageChanged(p)
                        }
                        }>
                        {p}</span>
                })}

            {portionCount > portionNumber &&
                <button onClick={() => { setPortionNumber(portionNumber + 1) }}> Next</button>}
        </div>
    )
}


export default Paginator;