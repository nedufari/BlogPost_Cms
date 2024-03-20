import { BlogPostEntity } from "src/Entity/blogpost.entity";
import { CommentsEntity } from "src/Entity/comment.entity";
import { RepliesEntity } from "src/Entity/reply.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(BlogPostEntity)
export class CmsRepository extends Repository <BlogPostEntity>{}

@EntityRepository(CommentsEntity)
export class CommentRepository extends Repository <CommentsEntity>{}

@EntityRepository(RepliesEntity)
export class RepliesRepository extends Repository <RepliesEntity>{}