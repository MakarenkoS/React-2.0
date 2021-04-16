import { Redirect } from "react-router-dom"
import React from 'react'
import { connect } from "react-redux"



let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
})

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

export const withAuthRedirect = (Component) => {

    let RedirectComponent = (props) =>  {
    
        if (!props.isAuth) return <Redirect to="/login" />
        return <Component {...props} />
    }

    let RedirectComponentWithProps = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return RedirectComponentWithProps
}