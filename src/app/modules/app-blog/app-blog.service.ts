import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from 'src/app/shared/models/blog.model';

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private url = 'http://localhost:4000/blogs';
    
    constructor(private http: HttpClient) { }
    
    getBlogs() {
        return this.http.get(`${this.url}`);
    }
    
    getBlog(blogId: string) {
        return this.http.get(`${this.url}/${blogId}`);
    }
    
    getBlogPosts(blogId: string) {
        return this.http.get(`${this.url}/${blogId}/posts`);
    }
    
    getPost(blogId: string, postId: string) {
        return this.http.get(`${this.url}/${blogId}/posts/${postId}`);
    }

    addBlog(blog: Blog) {
        return this.http.post(`${this.url}`, blog);
    }

    deleteBlog(blogId: string) {
        return this.http.delete(`${this.url}/${blogId}`);
    }
}