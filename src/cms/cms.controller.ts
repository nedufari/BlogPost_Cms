import { Body, Controller, Get, Param, Post, Query, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CmsService } from "./cms.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { MakeblogPostDto } from "./cms.dto";
import { IBlogPostView, IBlogPostViewWithComment } from "./cms";


@Controller('blog-post')
export class CmsController{
    constructor(private readonly cmsService:CmsService){}

    @Post('create-blog/:id')
    @UseInterceptors(FilesInterceptor('media',10))
    async createPost(@Param('id')id:number, @Body()dto:MakeblogPostDto, @UploadedFiles()mediafiles:Express.Multer.File[]):Promise<IBlogPostView>{
        return await this.cmsService.createBlog(id,dto,mediafiles)
    }

    @Get('all-blogposts')
    async getBlogPosts(
        @Query('page') page: number,
        @Query('limit') limit: number
    ) {
        const { blogPosts, total } = await this.cmsService.getBlogPosts(page, limit);
        return {
            data: blogPosts,
            total: total,
            page: page,
            limit: limit
        };
    }

    @Get('one-blogpost/:id')
    async getoneBlogPost(@Param('id')id:number):Promise<IBlogPostViewWithComment>{
        return await this.cmsService.getOneBlogPost(id)
    }
}