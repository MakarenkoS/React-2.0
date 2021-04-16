import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';


describe("Profile status component", () => {
    
    test("status from prop should be in the state", () => {
        const component = create(<ProfileStatus status="test" />)
        const instance = component.getInstance();
        expect(instance.state.status).toBe("test");
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="test" />)
        const root = component.root;
        let span = root.findByType("span")
        expect(span.length).not.toBeNull();
    });

    test("after creation <input> should not be displayed", () => {
        const component = create(<ProfileStatus status="test" />)
        const root = component.root;

        expect(() => {
            let input = root.findByType("input")
        }).toThrow();
    });

    test("after creation <span> should contains correct status", () => {
        const component = create(<ProfileStatus status="test" />)
        const root = component.root;
        let span = root.findByType("span");

        console.log(span.children);
        expect(span.children[1]).toBe("test");
        
    });

    test("input shild be displayed in edit mode instead of span", () => {
        const component = create(<ProfileStatus status="test" />)
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("test")
    });

    // test("callback should be called", () => {
    //     const mockCallback = jest.fn();
    //     const component = create(<ProfileStatus status="test" updateUserStatus = {mockCallback} />)
    //     const instance = component.getInstance();
    //     instance.deactivateEditMode();
    //     expect(mockCallback.mock.calls.length.toBe(1);
    // });


});




