import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import classes from './MyPosts.module.css'
import Post from './Post/Post';
import { requireFiled, maxLengthCreator } from '../../../utils/validators/validator';
import { Textarea } from '../../common/FormsControls/FormControls';
import { PostDataType } from '../../../types/types';


const maxLength10 = maxLengthCreator(10);


export type MapPropsType = {
    postsData: Array<PostDataType>   
}

export type DispatchPropsType = {
    addPost: (text: string) => void 
}

type PostFormValuesType = {
    postText: string
}

type PostFormOwnProps = {

}

const MyPosts:React.FC<MapPropsType & DispatchPropsType> = React.memo((props) => {

    let postsElements = props.postsData.map
        ((p) => <Post message={p.message} likesCount={p.likesCount} id={p.id} key={p.id}/>)

    let onFromSubmit = (formData: PostFormValuesType) => {
        props.addPost(formData.postText)
    }

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


const PostsForm:React.FC<InjectedFormProps<PostFormValuesType, PostFormOwnProps> & PostFormOwnProps> = (props) => {
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

const PostsReduxForm = reduxForm<PostFormValuesType, PostFormOwnProps>({
    form: "postsForm"
})(PostsForm)

export default MyPosts;