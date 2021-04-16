import React from 'react';
import { Field, reduxForm } from 'redux-form';
import classes from './MyPosts.module.css'
import Post from './Post/Post';
import { requireFiled, maxLengthCreator } from './../../../utils/validators/validator';
import { Textarea } from '../../common/FormsControls/FormControls';


const maxLength10 = maxLengthCreator(10);


//**************class component *******************/
// class MyPosts extends React.Component {

//     componentDidMount() {
//     // console.log('comp did mount');
//     // setTimeout(()=>{
//     //     this.setState({a: '10'})}, 3000)
//     }

//     shouldComponentUpdate(nextProps, nextState) {

//         return nextProps != this.props || nextState != this.state
        
//     }

//     render() {
//         console.log('render MyPosts')
//         let postsElements = this.props.postsData.map
//             ((p) => <Post message={p.message} likesCount={p.likesCount} />)

//         let onFromSubmit = (formData) => {
//             this.props.addPost(formData.postText)
//         }

//         return (
//             <div className={classes.postsBlock}>
//                 <h3>My Posts</h3>

//                 <PostsReduxForm onSubmit={onFromSubmit} />
//                 <div className={classes.posts}>
//                     {postsElements}
//                 </div>
//             </div>
//         )
//     }
// }
// *****************class component end **********************

const MyPosts = React.memo((props) => {

    let postsElements = props.postsData.map
        ((p) => <Post message={p.message} likesCount={p.likesCount} id={p.id} key={p.id}/>)

    let onFromSubmit = (formData) => {
        props.addPost(formData.postText)
    }
    console.log('rendr MyPosts');
    return (

        <div className={classes.postsBlock}>
            <h3>My Posts</h3>

            <PostsReduxForm onSubmit = {onFromSubmit} />
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    )
})


const PostsForm = (props) => {
    return <div>
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"postText"} placeholder={"Type text here"}
                    validate={[requireFiled, maxLength10]} />
            </div>
            <div>
                <button > Add Post</button>
            </div>
        </form>
    </div>
}

const PostsReduxForm = reduxForm({
    form: "postsForm"
})(PostsForm)

export default MyPosts;