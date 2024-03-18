import { Module } from "@nestjs/common";
import { CmsService } from "./cms.service";
import { CmsController } from "./cms.controller";

@Module({
    imports:[],
    providers:[CmsService],
    controllers:[CmsController]
})

export class CmsModule{}