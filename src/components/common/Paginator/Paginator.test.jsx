import React from 'react';
import { create } from 'react-test-renderer';
import Paginator from './Paginator';


describe("Paginator component tests", () => {
    
    test("pages count is 11, but should be only 10", () => {
        const component = create(<Paginator totalItemsCount={1} pagesSize={1} portionSize={10} currentPage={1} onPageChanged={()=>{}}/>)
        const root = component.root;
        
        let spans = root.findAllByType("span");
        expect(spans.length).toBe(10)
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<Paginator totalItemsCount={11} pagesSize={1} portionSize={10} currentPage={1} />)
        const root = component.root;
        let span = root.findByType("button")
        expect(span.length).not.toBeNull();
    });

    // test("if pages count is more then 10 button Next should be appear", () => {
    //     const component = create(<Paginator totalItemsCount={11} pagesSize={1} portionSize={10}/>)
    //     const root = component.root;
    //     let spans = root.findAllByType("button");
    //     expect(button.length).toBe(1)
    // });
})

