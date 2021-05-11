export type PostDataType = {
    id: number
    message: string
    likesCount: number
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string   
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type UsersType = {
    name: string
    id: number
    uniqueUrlName: boolean
    status: string
    photos: PhotosType
    followed: boolean
    photoUrl: string
}

export type FriendsDataType = {
    id: number
    name: string
    image: string
}

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
    sender: string
}

