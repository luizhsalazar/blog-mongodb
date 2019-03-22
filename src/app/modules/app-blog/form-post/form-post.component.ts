import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../app-blog.service';
import { AuthService, SocialUser } from 'angularx-social-login';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/shared/models/post.model';
import { Location } from '@angular/common';

@Component({
    selector: 'app-form-post',
    templateUrl: './form-post.component.html',
    styleUrls: ['./form-post.component.scss'],
})
export class FormPostComponent implements OnInit {

    public postForm: FormGroup;
    public isLogged: boolean = false;
    public loggedUser: SocialUser;
    public currentBlogId: string;
    
    constructor(
        private fb: FormBuilder,
        private blogService: BlogService,
        private authService: AuthService,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private _location: Location
    ) {}

    ngOnInit(): void {
        this.authService.authState.subscribe(user => {
            this.isLogged = user != null;
            this.loggedUser = user;
        });

        this.activeRoute.params.subscribe(params => {
            this.currentBlogId = params['id'];            
        })

        this.postForm = this.fb.group({
            title: ["", Validators.required],
            subtitle: "",
            rootContent: ["", Validators.required]
        });
    }

    onSubmit() {
        if (this.isLogged && this.postForm.valid) {

            const post : Post = {
                title: this.postForm.value['title'],
                subtitle: this.postForm.value['subtitle'],
                root_content: this.postForm.value['rootContent'],
                date: new Date(Date.now()),
                blog_id: this.currentBlogId
            }

            this.blogService.addPost(this.currentBlogId, post)
                .subscribe((response: Post) => {
                    this.router.navigateByUrl(`blogs/${this.currentBlogId}/posts/${response._id}`);
                });
        }
    }

    backClicked() {
        this._location.back();
    }
}