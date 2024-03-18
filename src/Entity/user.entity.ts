import { Gender, Role } from "src/Enum/general.enum";
import { IAdmin } from "src/Users/admin/admin";
import { IUser } from "src/Users/user/user";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentsEntity } from "./comment.entity";
import { RepliesEntity } from "./reply.entity";
import { BlogPostEntity } from "./blogpost.entity";


@Entity()
export class UserEntity implements IUser{
    @PrimaryGeneratedColumn()
    id:number 

    @Column({nullable:false})
    fullname: string;

    @Column({nullable:false,unique:true})
    email: string;

    @Column({nullable:false})
    password: string;

    @Column({nullable:true})
    profilePicture: string;

    @Column({nullable:false})
    dob: string;

    @Column({nullable:false})
    age: number;

    @CreateDateColumn({nullable:false})
    createdAt: Date;

    @Column({nullable:false, type:'enum', enum:Role, default:Role.USER})
    role: Role;

    @Column({nullable:false,type:'enum', enum:Gender, default:Gender.Rather_not_say})
    gender: Gender;

    @Column({nullable:false,default:false})
    isLoggedIn: boolean;

    @Column({nullable:false,default:false})
    isLoggedOut: boolean;

    @Column({nullable:false,default:false})
    isRegistered: boolean;

    @Column({nullable:false,default:false})
    isVerified: boolean;

    @Column({nullable:true})
    reset_link_exptime: Date;

    @Column({nullable:true})
    password_reset_link: string;

    @Column({nullable:false, default:0})
    loginCount: number;

    @Column({nullable:false, default:false})
    isLocked: boolean;

    @Column({nullable:true})
    locked_until: Date;


    @OneToMany(()=>BlogPostEntity, blog=>blog.blogger)
    my_blogs:BlogPostEntity[]

    @OneToMany(()=>CommentsEntity, comment=>comment.made_by)
    my_comment:CommentsEntity[]


    @OneToMany(()=>RepliesEntity, reply=>reply.replied_by)
    comment_replies:RepliesEntity[]



    
}