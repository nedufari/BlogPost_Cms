import { BlogPostEntity } from "src/Entity/blogpost.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(BlogPostEntity)
export class CmsRepository extends Repository <BlogPostEntity>{}