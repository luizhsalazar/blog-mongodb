import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}