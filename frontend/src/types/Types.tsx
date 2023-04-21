export type PostType = {
    post_id: number,
    title: string,
    content: string,
    createdAt: string
}

export type UserType = {
    user_id: number | null,
    username: string | null
}

export type NewPostType = {
    title: string,
    content: string
}