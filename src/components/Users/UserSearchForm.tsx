import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FilterType } from '../../redux/usersReducer';
import { getUsersFilter } from '../../redux/usersSelectors';
import { useSelector } from 'react-redux';


const userSearchFromValidate = (values: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FriendFormType = "true" | "false" | "null"

type FormType = {
    term: string
    friend: FriendFormType
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter)

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmiting: boolean) => void }) => {
        
        const filter: FilterType =  {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        } 

        props.onFilterChanged(filter)
        setSubmitting(false)
        // setTimeout(() => {
        //     alert(JSON.stringify(values));
        //     setSubmitting(false);
        // }, 400);
    }
    return <div>
        <Formik
            enableReinitialize = {true}
            initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType}}
            validate={userSearchFromValidate}
            onSubmit={submit}

        >

            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find User
                    </button>
                </Form>
            )}

        </Formik>
    </div>
})