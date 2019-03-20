import { Post } from './post.model';

export class Blog {
    _id: string;
    title: string;
    description: string;
    posts: Post[];
}