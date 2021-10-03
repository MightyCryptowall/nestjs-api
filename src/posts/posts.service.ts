import { Post } from './post.interface';
import { UpdatePostDto } from './dto/updatePost.dto';
import { CreatePostDto } from './dto/createPost.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
    private lastPostId = 0;
    private posts: Post[] = [];

    getAllPost(): Post[] {
        return this.posts;
    };

    getPostById(id: number): Post {
        const post = this.posts.find(post => post.id === id);
        if(post) {
            return post
        }

        throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }

    createPost(post: CreatePostDto): Post {
        const newPost = {
            id: ++this.lastPostId,
            ...post
        }
        this.posts.push(newPost);
        return newPost;
    }

    replacePost(id: number, post: UpdatePostDto): Post {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex > -1) {
            this.posts[postIndex] = post;
            return post;
        }
        throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }

    deletePost(id: number): void {
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex > -1){
            this.posts.splice(postIndex, 1);
        }else{
            throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
        }

       
    }
}
