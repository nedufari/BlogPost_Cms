import { Module } from "@nestjs/common";
import { CmsService } from "./cms.service";
import { CmsController } from "./cms.controller";
import { TypeOrmInternalModule } from "src/TypeOrm/typeorm.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogPostEntity } from "src/Entity/blogpost.entity";
import { AdminEntity } from "src/Entity/admin.entity";
import { UserEntity } from "src/Entity/user.entity";
import { CommentsEntity } from "src/Entity/comment.entity";
import { RepliesEntity } from "src/Entity/reply.entity";
import { UploadService } from "src/helpers/upload.service";
import { Notifications } from "src/Entity/notification.entity";

@Module({
    imports:[TypeOrmModule.forFeature([BlogPostEntity,AdminEntity,UserEntity,CommentsEntity,RepliesEntity,Notifications])],
    providers:[CmsService,UploadService],
    controllers:[CmsController]
})

export class CmsModule{}