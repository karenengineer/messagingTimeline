import { MessagingService } from "src/app/services/messaging.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from "src/app/services/loader.service";
import { UserService } from "src/app/services/user.service";
import { Component, inject, Input } from '@angular/core';
import { Message } from "src/app/models/interfaces";
import { User } from "src/app/models/types";
import { finalize } from "rxjs";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent {
  @Input() message: Message | undefined;

  messageForm: FormGroup;
  private messageService = inject(MessagingService);
  private userService = inject(UserService);
  loaderService = inject(LoaderService);

  constructor(private fb: FormBuilder) {
    this.messageForm = this.fb.group({
      comment: ['', [Validators.required]]
    });
  }

  postComment(): void {
    if (this.messageForm.valid) {
      this.loaderService.isLoading.next(true)
      const newComment = this.messageForm.get('comment')?.value;
      this.userService.user.subscribe((user: User) => {
        this.messageService.postComment(this.message?.id, user.id, newComment)
          .pipe(finalize(() => this.loaderService.isLoading.next(false)))
          .subscribe(() => {
            this.messageForm.reset();
            this.messageService.triggerToGetMessages.next(true)
          });
      });
    }
  }
}
