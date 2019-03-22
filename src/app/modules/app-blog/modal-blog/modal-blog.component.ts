import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogService } from '../app-blog.service';
import { Blog } from 'src/app/shared/models/blog.model';
import { AuthService, SocialUser } from 'angularx-social-login';

@Component({
    selector: 'app-modal-blog',
    templateUrl: './modal-blog.component.html',
    styleUrls: ['./modal-blog.component.scss'],
})
export class ModalBlogComponent implements OnInit {

    public blogForm: FormGroup;
    public isLogged: boolean = false;
    public loggedUser: SocialUser;

    constructor(
        public dialogRef: MatDialogRef<ModalBlogComponent>,
        private fb: FormBuilder,
        private blogService: BlogService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authService.authState.subscribe(user => {
            this.isLogged = user != null;
            this.loggedUser = user;
        });
        
        this.blogForm = this.fb.group({
            title: ["", Validators.required],
            description: ["", Validators.required],
        });
    }

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        if (this.isLogged && this.blogForm.valid) {
            const blog : Blog = {
                title: this.blogForm.value['title'],
                description: this.blogForm.value['description'],
                owner: {
                    name: this.loggedUser.name,
                    email: this.loggedUser.email,
                    photo_url: this.loggedUser.photoUrl                    
                },
                date: new Date(Date.now())
            }

            this.blogService.addBlog(blog)
                .subscribe(() => {
                    this.close();
                }
            );
        }
    }

}