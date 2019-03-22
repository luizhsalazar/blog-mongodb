import { Section } from './section.model';

export class Post {
    _id?: string;
    title: string;
    subtitle: string;
    root_content: string;
    date: Date;
    blog_id: string;
    sections: Section[];
}