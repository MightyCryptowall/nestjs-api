// import { Post } from './post.interface';
import { UpdatePostDto } from './dto/updatePost.dto';
import { CreatePostDto } from './dto/createPost.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import PostsRepository from './posts.repository';
import { InjectRepository } from '@nestjs/typeorm';
import Post from './post.entity';

@Injectable()
export class PostsService {
    private lastPostId = 0;
    private posts = [];

    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>
    ){}

    getAllPost() {
        return this.postsRepository.find();
    };

    // getPostById(id: number): Post {
    //     const post = this.posts.find(post => post.id === id);
    //     if(post) {
    //         return post
    //     }

    //     throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    // }

    // createPost(post: CreatePostDto): Post {
    //     const newPost = {
    //         id: ++this.lastPostId,
    //         ...post
    //     }
    //     this.posts.push(newPost);
    //     return newPost;
    // }

    // replacePost(id: number, post: UpdatePostDto): Post {
    //     const postIndex = this.posts.findIndex(post => post.id === id);
    //     if (postIndex > -1) {
    //         this.posts[postIndex] = post;
    //         return post;
    //     }
    //     throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    // }

    // deletePost(id: number): void {
    //     const postIndex = this.posts.findIndex(post => post.id === id);
    //     if (postIndex > -1){
    //         this.posts.splice(postIndex, 1);
    //     }else{
    //         throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    //     }

       
    // }
}
