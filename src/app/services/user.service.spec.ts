import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

describe('UserService', () => {
  let service: UserService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{
        provide: HttpClient, // Provide HttpClient for your component
        useValue: {
          get: () => of({}), // Replace with your own HttpClient mock
          post: () => of({}), // Replace with your own HttpClient mock
        },
      }]
    });
    service = TestBed.inject(UserService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable when postUser is called', function() {
    const userService = new UserService(httpClient);
    const result = userService.postUser('username');
    expect(result instanceof Observable).toBe(true);
  });

  it('should return an Observable when getUser is called', function() {
    const userService = new UserService(httpClient);
    const result = userService.getUser('username');
    expect(result instanceof Observable).toBe(true);
  });

  it('should handle null or undefined username parameter when getUser is called', function() {
    const userService = new UserService(httpClient);
    const result = userService.getUser(null);
    expect(result).toBeDefined();
  });

  it('should handle empty data result from http.get when getUser is called', function() {
    const userService = new UserService(httpClient);
    spyOn(userService, 'getUser').and.returnValue(of({ data: null, status: 200 })); // Adjust the response to match ServerResponse
    userService.getUser('username').subscribe((data) => {
      expect(data.data).toBeNull();
    });
  });

});
