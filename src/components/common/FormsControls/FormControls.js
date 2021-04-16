import React from 'react';
import classes from './FormControls.module.css';

const FormControl = ({ input, meta, child, ...props }) => {
    let isError  = meta.touched && meta.error;

    return <div className={classes.formControl + " " + (isError && classes.error)} >
        <div>
            {props.children}
        </div>
        
        {isError && <span className={classes.errorText}> {meta.error}</span>}
    </div>
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /> </FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}> <input {...input} {...restProps} />  </FormControl>
}

// export const Textarea = ({ input, meta, ...props }) => {
//     let isError  = meta.touched && meta.error;

//     return <div className={classes.formControl + " " + (isError && classes.error)} >
//         <textarea  {...input} {...props} />
//         {isError && <span className={classes.errorText}> {meta.error}</span>}
//     </div>
// }

// export const Input = ({ input, meta, ...props }) => {
//     let isError  = meta.touched && meta.error;

//     return <div className={classes.formControl + " " + (isError && classes.error)} >
//         <input  {...input} {...props} />
//         {isError && <span className={classes.errorText}> {meta.error}</span>}
//     </div>
// }