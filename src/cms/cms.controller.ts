import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { CmsService } from "./cms.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { MakeblogPostDto } from "./cms.dto";
import { IBlogPostView, IBlogPostViewWithComment } from "./cms";
import { CommentDto, LikeDto, ReplyDto } from "src/common/common.dto";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { RoleGuard } from "src/auth/guard/role.guard";
import { Roles } from "src/auth/decorators/role.decorator";
import { Role } from "src/Enum/general.enum";


@UseGuards(JwtGuard)


@Controller('blog-post')
export class CmsController{
    constructor(private readonly cmsService:CmsService){}


    //blog-posts 
    @UseGuards(RoleGuard)
    @Roles(Role.USER)
    @Post('create-blog/:id')
    @UseInterceptors(FilesInterceptor('media',10))
    async createPost(@Param('id')id:number, @Body()dto:MakeblogPostDto, @UploadedFiles()mediafiles:Express.Multer.File[]):Promise<IBlogPostView>{
        try {
            return await this.cmsService.createBlog(id,dto,mediafiles)
        } catch (error) {
            throw error
            
        }
    }
    @UseGuards(RoleGuard)
    @Roles(Role.USER)
    @Patch('edit-blog/:postid/:userid')
    @UseInterceptors(FilesInterceptor('media',10))
    async editPost(@Param('id')postid:number, @Param('id')userid:number, @Body()dto:MakeblogPostDto, @UploadedFiles()mediafiles:Express.Multer.File[]):Promise<IBlogPostView>{
        try {
            return await this.cmsService.EditBlog(postid,dto,userid,mediafiles)
        } catch (error) {
            throw error
            
        }
    }


    @UseGuards(RoleGuard)
    @Roles(Role.USER,Role.ADMIN)
    @Delete('delete-blogpost/:postid/:userid')
    async DeleteBlogpost(@Param('postid')postid:number, @Param('userid')userid:number):Promise<{msg:string}>{
        try {
            return await this.cmsService.deleteBlogPost(postid,userid)
        } catch (error) {
            throw error
            
        }
    }

    @UseGuards(RoleGuard)
    @Roles(Role.USER,Role.ADMIN)
    @Get('all-blogposts')
    async getBlogPosts(
        @Query('page') page: number,
        @Query('limit') limit: number
    ) {
        try {
            const { blogPosts, total } = await this.cmsService.getBlogPosts(page, limit);
            return {
                data: blogPosts,
                total: total,
                page: page,
                limit: limit
            };
        } catch (error) {
            throw error
            
        }
    }

    @UseGuards(RoleGuard)
    @Roles(Role.USER,Role.ADMIN)
    @Get('one-blogpost/:id')
    async getoneBlogPost(@Param('id')id:number):Promise<IBlogPostViewWithComment>{
        try {
            return await this.cmsService.getOneBlogPost(id)
        } catch (error) {
            throw error
            
        }
    }


    @UseGuards(RoleGuard)
    @Roles(Role.USER)
    @Patch('like-a-post/:postid/:userid')
    async LikePost(@Param('postid')postid:number, @Param('userid')userid:number,@Body()dto:LikeDto):Promise<{msg:string}>{
        try {
            return await this.cmsService.LikeAPost(postid,userid,dto)
            
        } catch (error) {
            throw error
            
        }
        
    }


    // comment 
    @UseGuards(RoleGuard)
    @Roles(Role.USER)
    @Post('make-comment/:postid/:userid')
    async Makecomment(@Param('postid')postid:number, @Param('userid')userid:number,@Body()dto:CommentDto):Promise<{msg:string}>{
       try {
         return await this.cmsService.MakeAComment(postid,userid,dto)
       } catch (error) {
        throw error
        
       }
    }

    @Patch('edit-comment/:commentid/:userid')
    async editComment(@Param('id')commentid:number, @Param('id')userid:number, @Body()dto:CommentDto):Promise<{msg:string}>{
        try {
            return await this.cmsService.EditAComment(commentid,userid,dto)
        } catch (error) {
            throw error
            
        }
    }

    @UseGuards(RoleGuard)
    @Roles(Role.USER,Role.ADMIN)
    @Delete('delete-comment/:commentid/:userid')
    async DeleteComment(@Param('commentid')commentid:number, @Param('userid')userid:number):Promise<{msg:string}>{
        try {
            return await this.cmsService.deleteCommentPost(commentid,userid)
        } catch (error) {
            throw error
            
        }
    }


    @UseGuards(RoleGuard)
    @Roles(Role.USER)
    @Patch('like-a-comment/:commentid/:userid')
    async LikeComment(@Param('commentid')postid:number, @Param('userid')userid:number,@Body()dto:LikeDto):Promise<{msg:string}>{
        try {
            return await this.cmsService.LikeAComment(postid,userid,dto)
            
        } catch (error) {
            throw error
            
        }
        
    }

    



    //reply 
    @UseGuards(RoleGuard)
    @Roles(Role.USER)
    @Post('make-reply/:replyid/:userid')
    async ReplyAComment(@Param('replyid')replyid:number, @Param('userid')userid:number,@Body()dto:ReplyDto):Promise<{msg:string}>{
        try {
            return await this.cmsService.ReplyAComment(replyid,userid,dto)
        } catch (error) {
            throw error 
            
        }
    }

    @UseGuards(RoleGuard)
    @Roles(Role.USER)
    @Patch('edit-reply/:replyid/:userid')
    async editReply(@Param('replyid')replyid:number, @Param('iuserd')userid:number, @Body()dto:ReplyDto):Promise<{msg:string}>{
        try {
            return await this.cmsService.EditAReply(replyid,userid,dto)
        } catch (error) {
            throw error
            
        }
    }


    @UseGuards(RoleGuard)
    @Roles(Role.USER,Role.ADMIN)
    @Delete('delete-reply/:replyid/:userid')
    async DeleteReply(@Param('replyid')replyid:number, @Param('userid')userid:number):Promise<{msg:string}>{
        try {
            return await this.cmsService.deleteReply(replyid,userid)
        } catch (error) {
            throw error
            
        }
    }


    @UseGuards(RoleGuard)
    @Roles(Role.USER)
    @Patch('like-a-reply/:replyid/:userid')
    async LikeAReply(@Param('userid')userid:number, @Param('replyid')replyid:number,@Body()dto:LikeDto):Promise<{msg:string}>{
        try {
            return await this.cmsService.LikeAReply(replyid,userid,dto)
            
        } catch (error) {
            throw error
            
        }
        
    }
}