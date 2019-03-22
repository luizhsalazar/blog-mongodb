import { Post } from './post.model';
import { User } from './user.model';

export class Blog {
    _id?: string;
    title: string;
    description: string;
    owner: User;
    posts?: Post[];
    date: Date;
}