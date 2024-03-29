import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { BlogPostEntity } from "./blogpost.entity";
import { RepliesEntity } from "./reply.entity";


export interface IComment{
    id:number,
    comment:string,
    madeAT:Date,
    likes:number
    made_by: UserEntity
    blogPost: BlogPostEntity
    replies:RepliesEntity[]

}


@Entity()
export class CommentsEntity implements IComment{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    comment: string;

    @Column({nullable:true,default:0})
    likes: number;

    @CreateDateColumn()
    madeAT: Date;

    @ManyToOne(()=>UserEntity,user=>user.my_comment)
    made_by:UserEntity

    @ManyToOne(()=>BlogPostEntity,blogpost=>blogpost.blogPost)
    blogPost:BlogPostEntity

    @OneToMany(()=>RepliesEntity,reply=>reply.comment_replied,{cascade:true})
    replies:RepliesEntity[]
}