import { CommentsEntity } from "src/Entity/comment.entity"
import { UserEntity } from "src/Entity/user.entity"

export interface IBlogPost{
    id:number
    blogPost:string
    media:string[]
    createdAt:Date
    likes:number
    blogger:UserEntity
    comments_made:CommentsEntity[]
    

}

export interface IBlogPostView{
    blogPost:string
    media:string[]
    createdAt:Date
    likes:number
    blogger:IBloggerInfo
   

}
export interface IBlogPostViewWithComment {
    blogPost: string;
    media: string[];
    createdAt: Date;
    likes: number;
    blogger: IBloggerInfo;
    comments: ICommentWithReplies[];
}

interface IBloggerInfo {
    fullname: string;
    profilepicture: string;
}

interface ICommentWithReplies {
    comment: string;
    madeAT: Date;
    made_by: IBloggerInfo;
    replies: IReply[];
}

interface IReply {
    reply: string;
    repliedAt: Date;
    replied_by: IBloggerInfo;
}
