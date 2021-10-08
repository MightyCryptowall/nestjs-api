import { UpdatePostDto } from './dto/updatePost.dto';
import { CreatePostDto } from './dto/createPost.dto';
import { PostsService } from './posts.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import PostEntity from './post.entity';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ){}

    @Get()
    getAllPosts() {
        return this.postsService.getAllPost();
    }

    // @Get(":id")
    // getPostById(@Param("id") id: string) {
    //     return this.postsService.getPostById(Number(id));
    // }

    @Post()
    async createPost(@Body() post: CreatePostDto): Promise<PostEntity> {
        return this.postsService.createPost(post);
    }

    // @Put(":id")
    // async replacePost(@Param("id") id: string, @Body() post: UpdatePostDto){
    //     return this.postsService.replacePost(Number(id), post);
    // }

    // @Delete(":id")
    // async deletePost(@Param("id") id: string) {
    //     return this.postsService.deletePost(Number(id));
    // }
}
