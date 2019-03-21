import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogService } from '../app-blog.service';
import { Blog } from 'src/app/shared/models/blog.model';

@Component({
    selector: 'app-modal-blog',
    templateUrl: './modal-blog.component.html',
    styleUrls: ['./modal-blog.component.scss'],
})
export class ModalBlogComponent implements OnInit {

    public blogForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ModalBlogComponent>,
        private fb: FormBuilder,
        private blogService: BlogService
    ) {}

    ngOnInit(): void {
        this.blogForm = this.fb.group({
            title: ["", Validators.required],
            description: ["", Validators.required],
        });
    }

    close(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        if (this.blogForm.valid) {
            const blog : Blog = {
                title: this.blogForm.value['title'],
                description: this.blogForm.value['description'],
            }

            this.blogService.addBlog(blog)
                .subscribe(() => {
                    this.close();
                }
            );
        }
    }

}