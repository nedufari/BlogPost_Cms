import { Controller } from "@nestjs/common";
import { CmsService } from "./cms.service";


@Controller('blog-post')
export class CmsController{
    constructor(private readonly cmsService:CmsService){}

    
}