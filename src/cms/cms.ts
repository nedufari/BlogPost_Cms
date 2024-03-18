import { CommentsEntity } from "src/Entity/comment.entity"
import { UserEntity } from "src/Entity/user.entity"

export interface IBlogPost{
    id:number
    blogPost:string
    createdAt:Date
    likes:number
    blogger:UserEntity
    comments_made:CommentsEntity[]
    

}

export interface IBlogPostView{
    blogPost:string
    createdAt:Date
    likes:number
    blogger:IBloggerInfo
    comments:ICommentwithReplies

}


interface IBloggerInfo{
    fullname:string
    profilepicture:string
}

interface ICommentwithReplies{
    comment:string
    replies:string[]
}