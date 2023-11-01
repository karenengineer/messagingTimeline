import { MessageRequest } from "src/app/models/interfaces";
import { ServerResponse } from "src/app/models/types";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class MessagingService {
  apiUrl = 'http://localhost:3001';
  public triggerToGetMessages: Subject<boolean> = new Subject<boolean>()
  constructor(public http: HttpClient) { }

  getMessages(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.apiUrl}/messages`);
  }

  postMessage(message: string, authorId: number | undefined): Observable<ServerResponse> {
    if ( authorId === undefined) {
      return throwError('Invalid authorId');
    }
    const newMessage: Partial<MessageRequest> = { content: message, author: authorId };
    return this.http.post<ServerResponse>(`${this.apiUrl}/message`, newMessage);
  }

  postComment(messageId: string | undefined, authorId: number | undefined, comment: string): Observable<ServerResponse> {
    if (messageId === undefined) {
      return throwError('Missing messageId');
    }
    if (authorId === undefined) {
      return throwError('Invalid authorId');
    }
    const newComment: Partial<MessageRequest> = { content: comment, message: messageId, author: authorId};
    return this.http.post<ServerResponse>(`${this.apiUrl}/messages/${messageId}/comments`, newComment);
  }

}
