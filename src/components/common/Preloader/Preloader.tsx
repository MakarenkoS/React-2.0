import Loader from './../../../assets/svg/Loader.svg';
import React from 'react';

type PropsType = {}

let Preloader:React.FC<PropsType> = (props) =>{
    return <div>
        <img src={Loader}></img>
    </div>
}

export default Preloader;