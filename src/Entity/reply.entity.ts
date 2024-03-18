import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommentsEntity } from "./comment.entity";
import { UserEntity } from "./user.entity";

export interface IReplies{
    id:number,
    reply:string
    repliedAt:Date
    comment_replied :CommentsEntity,
    replied_by : UserEntity
}


@Entity()
export class RepliesEntity implements IReplies{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:true})
    reply: string;

    @CreateDateColumn()
    repliedAt: Date;

    @ManyToOne(()=>UserEntity, user=>user.comment_replies)
    replied_by: UserEntity;

    @ManyToOne(()=>CommentsEntity, comment=>comment.replies)
    comment_replied: CommentsEntity;
    
}