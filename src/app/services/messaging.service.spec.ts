import { TestBed } from '@angular/core/testing';

import { MessagingService } from './messaging.service';
import { ServerResponse } from "src/app/models/types";
import { of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/services/user.service";

describe('MessagingService', () => {
  let service: MessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient, // Provide HttpClient for your component
          useValue: {
            get: () => of({}), // Replace with your own HttpClient mock
            post: () => of({}), // Replace with your own HttpClient mock
          },
        },
      ],
    });
    service = TestBed.inject(MessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve messages from the server when getMessages() is called', function() {
    // Mock the HttpClient
    const httpMock = jasmine.createSpyObj('HttpClient', ['get']);
    const messagingService = new MessagingService(httpMock);

    // Set up the mock response
    const mockResponse: ServerResponse = {
      data: [{ id: '1', author: 1, timestamp: new Date(), content: 'Hello', message: '1' }],
      status: 200
    };
    httpMock.get.and.returnValue(of(mockResponse));

    // Call the method under test
    messagingService.getMessages().subscribe(response => {
      // Assert that the response is correct
      expect(response).toEqual(mockResponse);
      expect(httpMock.get).toHaveBeenCalledWith(`${messagingService.apiUrl}/messages`);
    });
  });

  it('should post a new message to the server when postMessage() is called', function() {
    // Mock the HttpClient
    const httpMock = jasmine.createSpyObj('HttpClient', ['post']);
    const messagingService = new MessagingService(httpMock);

    // Set up the mock response
    const mockResponse: ServerResponse = {
      data: { id: '1', author: 1, timestamp: new Date(), content: 'Hello', message: '1' },
      status: 200
    };
    httpMock.post.and.returnValue(of(mockResponse));

    // Call the method under test
    const message = 'Hello';
    const authorId = 1;
    messagingService.postMessage(message, authorId).subscribe(response => {
      // Assert that the response is correct
      expect(response).toEqual(mockResponse);
      expect(httpMock.post).toHaveBeenCalledWith(`${messagingService.apiUrl}/message`, { content: message, author: authorId });
    });
  });

  it('should handle server errors and return appropriate error messages when getMessages() encounters an error', function() {
    // Mock the HttpClient
    const httpMock = jasmine.createSpyObj('HttpClient', ['get']);
    const messagingService = new MessagingService(httpMock);

    // Set up the mock response
    const mockErrorResponse = { status: 500, statusText: 'Internal Server Error' };
    httpMock.get.and.returnValue(throwError(mockErrorResponse));

    // Call the method under test
    messagingService.getMessages().subscribe({
      next: () => {},
      error: error => {
      // Assert that the error is correct
      expect(error).toEqual(mockErrorResponse);
      expect(httpMock.get).toHaveBeenCalledWith(`${messagingService.apiUrl}/messages`);
    }
  });
  });

  it('should handle invalid input parameters and return appropriate error messages when postMessage() is called with an invalid authorId', function() {
    // Mock the HttpClient
    const httpMock = jasmine.createSpyObj('HttpClient', ['post']);
    const messagingService = new MessagingService(httpMock);

    // Call the method under test with an invalid authorId
    const message = 'Hello';
    const authorId = undefined;
    messagingService.postMessage(message, authorId).subscribe({
    next: () => {},
    error: error => {
      // Assert that the error is correct
      expect(error).toEqual('Invalid authorId');
      expect(httpMock.post).not.toHaveBeenCalled();
    }
    }


    );
  });

  it('should handle missing input parameters and return appropriate error messages when postComment() is called without a messageId', function() {

    // Mock the HttpClient
    const httpMock = jasmine.createSpyObj('HttpClient', ['post']);
    const messagingService = new MessagingService(httpMock);

    // Call the method under test without a messageId
    const authorId = 1;
    const comment = 'Nice message!';
    messagingService.postComment(undefined, authorId, comment)
      .subscribe({
    next: () => {},
    error: error => {
      // Assert that the error is correct
      expect(error).toEqual('Missing messageId');
      expect(httpMock.post).not.toHaveBeenCalled();
    }
    }

    );
  });
});
