import { MessagingService } from "src/app/services/messaging.service";
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoaderService } from "src/app/services/loader.service";
import { User, ServerResponse } from "src/app/models/types";
import { UserService } from "src/app/services/user.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { Message } from "src/app/models/interfaces";
import { Router } from "@angular/router";
import { finalize } from "rxjs";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [BsModalService]
})

export class TimelineComponent implements OnInit {

  router = inject(Router);
  userService = inject(UserService);
  messageService = inject(MessagingService);
  modalService = inject(BsModalService);
  loaderService = inject(LoaderService);
  private fb = inject(FormBuilder);

  messages: Message[] = [];
  form: FormGroup;
  user: User | undefined;

  @ViewChild('messageTemplate') messageTemplate: any;
  noMessages = false;

  constructor() {
    this.form = this.fb.group({
      message: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.user = { name: localStorage.getItem('username') };
    this.getMessages();
    this.getUser(this.user?.name);
    this.messageService.triggerToGetMessages.subscribe(() => {
      this.getMessages();
    })
  }

  getMessages(): void {
    this.loaderService.isLoading.next(true)
    this.messageService.getMessages()
      .pipe(finalize(() => this.loaderService.isLoading.next(false)))
      .subscribe((res: ServerResponse) => {
        if (res.status === 200) {
          this.messages = res.data;
          this.noMessages = false;
        } else {
          this.messages = [];
          this.noMessages = true;
        }
      });
  }

  createMessage(): void {
    if (this.form.valid) {
      const newMessage = this.form.get('message');
      this.loaderService.isLoading.next(true)
      this.messageService
        .postMessage(newMessage?.value, this.user?.id)
        .pipe(finalize(() => {
          this.loaderService.isLoading.next(false)
          this.modalService.hide()}))
        .subscribe((res: ServerResponse) => {
          if (res.status === 200) {
            this.getMessages();
            this.form.reset();
          }
        });
    }
  }

  getUser(username: string | null | undefined): void {
    this.loaderService.isLoading.next(true);
    this.userService.getUser(username)
      .pipe(finalize(() => this.loaderService.isLoading.next(false)))
      .subscribe((res) => {
        if (res.status === 200) {
          this.user = {
            name: res.result.name,
            id: res.result.id,
          }

        }
      })
  }

  closeModal(): void {
    this.modalService.hide();
  }

  openMessageModal() {
    this.modalService.show(this.messageTemplate)
  }
}


