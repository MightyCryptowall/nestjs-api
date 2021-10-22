import { UpdatePostDto } from './dto/updatePost.dto';
import { CreatePostDto } from './dto/createPost.dto';
import { PostsService } from './posts.service';
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import PostEntity from './post.entity';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { ExceptionsLoggerFilter } from 'src/utils/exceptionsLogger.filter';
import RequestWithUser from 'src/authentication/requestWithUser.interface';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ){}

    @Get()
    getAllPosts() {
        return this.postsService.getAllPost();
    }

    @Get(":id")
    @UseFilters(ExceptionsLoggerFilter) // bind ExceptionsLoggerFilter directly to each handler
    async getPostById(@Param("id") id: string): Promise<PostEntity> {
        return this.postsService.getPostById(Number(id));
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser): Promise<PostEntity> {
        return this.postsService.createPost(post, req.user);
    }

    @Put(":id")
    async updatePost(@Param("id") id: string, @Body() post: UpdatePostDto): Promise<PostEntity>{
        return this.postsService.updatePost(id, post);
    }

    @Delete(":id")
    async deletePost(@Param("id") id: string): Promise<void> {
        return this.postsService.deletePost(id);
    }
}
