import { Redirect } from "react-router-dom"
import React from 'react'
import { connect } from "react-redux"
import { AppStateType } from "../redux/redux-store"



let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

type MapPropsType = {
    isAuth: boolean
}



export function withAuthRedirect<WCP>(WrapedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType> = (props) =>  {
        
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to="/login" />

        return <WrapedComponent {...restProps as WCP} />
    }

    let RedirectComponentWithProps = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return RedirectComponentWithProps
}

// export const withAuthRedirect = (Component) => {

//     class RedirectComponent extends React.Component {
//         render() {
//             if (!this.props.isAuth) return <Redirect to="/login" />
//             return <Component {...this.props} />
//         }
//     }

//     let RedirectComponentWithProps = connect(mapStateToPropsForRedirect)(RedirectComponent)

//     return RedirectComponentWithProps
// }