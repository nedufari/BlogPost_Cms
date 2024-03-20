import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/Entity/admin.entity';
import { BlogPostEntity } from 'src/Entity/blogpost.entity';
import { UserEntity } from 'src/Entity/user.entity';
import { AdminRepository } from 'src/Users/admin/admin.repository';
import { UserRepository } from 'src/Users/user/user.reposiroty';
import {
  CmsRepository,
  CommentRepository,
  RepliesRepository,
} from './cms.repository';
import { MakeblogPostDto } from './cms.dto';
import { CommentsEntity } from 'src/Entity/comment.entity';
import { RepliesEntity } from 'src/Entity/reply.entity';
import { UploadService } from 'src/helpers/upload.service';
import { IBlogPostView, IBlogPostViewWithComment } from './cms';
import { Notifications } from 'src/Entity/notification.entity';
import { NotificationType } from 'src/Enum/general.enum';
import { NotificationRepository } from 'src/common/common.repository';

@Injectable()
export class CmsService {
  constructor(
    @InjectRepository(AdminEntity) private readonly adminrepo: AdminRepository,
    @InjectRepository(UserEntity) private readonly userrepo: UserRepository,
    @InjectRepository(BlogPostEntity) private readonly blogrepo: CmsRepository,
    @InjectRepository(CommentsEntity)
    private readonly commentrepo: CommentRepository,
    @InjectRepository(RepliesEntity)
    private readonly repliesrepo: RepliesRepository,
    @InjectRepository(Notifications)
    private readonly noticicationrepo: NotificationRepository,
    private readonly fileuploadservice: UploadService,
  ) {}

  //create blog post

  async createBlog(
    id: number,
    dto: MakeblogPostDto,
    mediafiles: Express.Multer.File[],
  ): Promise<IBlogPostView> {
    const blogger = await this.userrepo.findOne({ where: { id: id } });
    if (!blogger)
      throw new NotFoundException('this user isnt found in our system');

    const medialfileUrls: string[] = [];

    for (const file of mediafiles) {
      const medialurl = await this.fileuploadservice.uploadFile(file);
      medialfileUrls.push(
        `http:localhost:3000/api/v1/blogpost/blog-post/uploadfile/public/${medialurl}`,
      );
    }

    const newblog = await this.blogrepo.create({
    blogPost : dto.blog,
    media : medialfileUrls,
    createdAt : new Date(),
    blogger : blogger,

    })
    await this.blogrepo.save(newblog);


     //save the notification
     const notification = new Notifications();
     notification.account = blogger.fullname;
     notification.subject = 'New BlogPost Created!';
     notification.notification_type = NotificationType.BLOGPOST_CREATED;
     notification.message = `new blog created successfully `;
     await this.noticicationrepo.save(notification);

     
    //response
    const blogPostResponse: IBlogPostView = {
      blogPost: newblog.blogPost,
      media: newblog.media,
      likes: newblog.likes,
      createdAt: newblog.createdAt,
      blogger: {
        fullname: newblog.blogger.fullname,
        profilepicture: newblog.blogger.profilePicture,
      },
    };
    return blogPostResponse;
  }
  // edit blogpost

  //get all blogpost ( add paginations )

  async getBlogPosts(page: number = 1, limit: number = 10): Promise<{ blogPosts: IBlogPostViewWithComment[], total: number }> {
    const skip = (page - 1) * limit;

    // Fetch blog posts with pagination
    const [blogPosts, total] = await this.blogrepo.findAndCount({
        relations: ['blogger', 'comments_made', 'comments_made.made_by', 'comments_made.replies', 'comments_made.replies.replied_by'], // Assuming relations are correctly defined
        order: { createdAt: 'DESC' },
        take: limit,
        skip: skip
    });

    // Format response
    const formattedBlogPosts: IBlogPostViewWithComment[] = blogPosts.map(blog => ({
        blogPost: blog.blogPost,
        media: blog.media,
        likes: blog.likes,
        createdAt: blog.createdAt,
        blogger: {
            fullname: blog.blogger.fullname,
            profilepicture: blog.blogger.profilePicture
        },
        comments: blog.comments_made.map(comment => ({
            comment: comment.comment,
            madeAT: comment.madeAT,
            made_by: {
                fullname: comment.made_by.fullname,
                profilepicture: comment.made_by.profilePicture
            },
            replies: comment.replies.map(reply => ({
                reply: reply.reply,
                repliedAt: reply.repliedAt,
                replied_by: {
                    fullname: reply.replied_by.fullname,
                    profilepicture: reply.replied_by.profilePicture
                }
            }))
        }))
    }));

    return { blogPosts: formattedBlogPosts, total };
}



  //getone blogpost

  async getOneBlogPost(id:number):Promise<IBlogPostViewWithComment>{
    const blog = await this.blogrepo.findOne({ where: { id: id } });
    if (!blog)
      throw new NotFoundException('this blogpost does not exist in the system');

      //response 

      const response : IBlogPostViewWithComment ={
        blogPost: blog.blogPost,
        media: blog.media,
        likes: blog.likes,
        createdAt: blog.createdAt,
        blogger: {
            fullname: blog.blogger.fullname,
            profilepicture: blog.blogger.profilePicture
        },
        comments: blog.comments_made.map(comment => ({
            comment: comment.comment,
            madeAT: comment.madeAT,
            made_by: {
                fullname: comment.made_by.fullname,
                profilepicture: comment.made_by.profilePicture
            },
            replies: comment.replies.map(reply => ({
                reply: reply.reply,
                repliedAt: reply.repliedAt,
                replied_by: {
                    fullname: reply.replied_by.fullname,
                    profilepicture: reply.replied_by.profilePicture
                }
            }))
        }))

      }
      return response

  }



  //deleteblogpost
  //comment on blogpost

  // reply a comment on blog post
}
