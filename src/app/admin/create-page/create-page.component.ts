import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Post} from "../../shared/models/post";
import * as moment from 'moment';
import {PostsService} from "../../shared/services/posts.service";
import {AccountService} from "../../shared/services/account.service";
import {Author} from "../../shared/models/author";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup
  author: Author

  constructor(
    private postService: PostsService,
    private account: AccountService
  ) {
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required])
    })

    this.account.getAuthor()
      .pipe(
        tap((author) => this.author = author)
      )
      .subscribe();
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.author,
      content: this.form.value.text,
      createdAt: moment(),
    }

    this.postService
      .create(post)
      .subscribe(() => {
        this.form.reset()
      })
  }
}
