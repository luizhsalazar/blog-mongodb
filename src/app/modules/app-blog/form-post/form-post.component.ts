import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
    public formBuilt: boolean = false;

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
            rootContent: ["", Validators.required],
            sections: this.fb.array([
                this.createSection()
            ])
        });
    }

    createSection(): FormGroup {
        return this.fb.group({
            title: ["", Validators.required],
            subtitle: "",
            content: ["", Validators.required],
            subSections: this.fb.array([
                this.createSubSection()
            ])
        });
    }

    createSubSection(): FormGroup {
        const formSubSection = this.fb.group({
            title: ["", Validators.required],
            subtitle: "",
            content: ["", Validators.required]            
        });        

        this.formBuilt = true;
        return formSubSection;
    }

    addSection() {
        const control = <FormArray>this.postForm.controls['sections'];
        control.push(this.createSection());
    }

    addSubSection(sectionId: number) {
        const control = (<FormArray>this.postForm.controls['sections'])
                            .at(sectionId).get('subSections') as FormArray;
        control.push(this.createSubSection());
    }

    removeSection(index: number) {
        const control = <FormArray>this.postForm.controls['sections'];
        control.removeAt(index);
    }

    removeSubSection(subSectionId: number) {
        const controlSections = <FormArray>this.postForm.controls.sections;
        const subSections = controlSections.controls.map(c => <FormArray>c.get('subSections'));
        subSections.forEach(s => s.removeAt(subSectionId));
    }

    onSubmit() {

        if (this.isLogged && this.postForm.valid) {

            let post : Post = {
                title: this.postForm.value['title'],
                subtitle: this.postForm.value['subtitle'],
                root_content: this.postForm.value['rootContent'],
                date: new Date(Date.now()),
                blog_id: this.currentBlogId,
                sections: []
            };

            if (this.postForm.controls['sections'].value.length > 0) {
                this.postForm.controls['sections'].value.forEach(section => {
                    post.sections.push(section);
                });
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