import { IBlogPost } from "src/cms/cms";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { CommentsEntity } from "./comment.entity";

@Entity()
export class BlogPostEntity implements IBlogPost{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    blogPost: string;

    @Column({nullable:false,default:0})
    likes: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(()=>UserEntity,user=>user.my_blogs)
    blogger: UserEntity;

    @OneToMany(()=>CommentsEntity, comments=>comments.blogPost)
    comments_made: CommentsEntity[];

}