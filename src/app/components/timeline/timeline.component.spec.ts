import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineComponent } from 'src/app/components/timeline/timeline.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component'
import { of, throwError } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { UserService } from './../../services/user.service';
import { MessagingService } from "src/app/services/messaging.service";
import { BsModalService } from "ngx-bootstrap/modal";

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;
  let messagingService: MessagingService;
  let messageServiceSpy: jasmine.SpyObj<MessagingService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimelineComponent, NavbarComponent],
      providers: [
        TimelineComponent, { provide: MessagingService, useValue: messageServiceSpy },
        {
          provide: HttpClient,
          useValue: {
            get: () => of({}),
            post: () => of({}),
          },
        },
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: BsModalService,
          useValue: {},
        },
      ],
    });
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = fixture.componentInstance;
    messagingService = TestBed.inject(MessagingService);
    messageServiceSpy = TestBed.inject(MessagingService) as jasmine.SpyObj<MessagingService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component with an empty message list', function () {
    expect(component.messages).toEqual([]);
  });

  it('should retrieve user from local storage and assign it to component', function () {
    (window as any).localStorage = {
      getItem: jasmine.createSpy('getItem').and.returnValue('John'),
    };

    expect(component.user).toEqual({ name: 'John' });
  });

  it('should update the message list after creating a new message', function () {
    const messageServiceMock: MessagingService = {
      apiUrl: 'http://localhost:3001',
      http: null as any,
      postMessage: jasmine.createSpy('postMessage').and.returnValue(of({ status: 200 })),
      getMessages: jasmine.createSpy('getMessages').and.returnValue(of({ status: 200, data: [{ id: '1', author: { name: 'John' }, timestamp: new Date(), content: 'Hello', comments: [] }] })),
      postComment: jasmine.createSpy('postComment').and.returnValue(of({ status: 200 })),
    };

    component.messageService = messageServiceMock;
    component.user = { name: 'John', id: 1 };
    component.form.get('message')?.setValue('Hello');
    component.createMessage();
    expect(messageServiceMock.getMessages).toHaveBeenCalled();
    expect(component.messages).toEqual([{ id: '1', author: { name: 'John' }, timestamp: jasmine.any(Date), content: 'Hello', comments: [] }]);
  });

  it('should reset the form after creating a new message', function () {
    const form = component.form;

    form.setValue({ message: 'Test message' });
    component.createMessage();

    expect(messagingService.postMessage).toHaveBeenCalled();

    expect(form.value.message).toBe('');
  });

  it('should not assign a user to the component if the user is not logged in', function () {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    expect(component.user).toBeUndefined();
  });

  it('should handle error status when retrieving messages from the server', function () {
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['postMessage', 'postComment', 'getMessages']);
    messageServiceSpy.getMessages.and.returnValue(throwError({ status: 500 }));

    component.getMessages();

    setTimeout(() => {
      expect(component.messages).toEqual([]);
    }, 0);
  });

  it('should handle error status when creating a new message on the server', function () {
    component.messageService = {
      apiUrl: 'http://localhost:3001',
      http: null as any,
      getMessages: null as any,
      postComment: null as any,
      postMessage: jasmine.createSpy('postMessage').and.returnValue(of({ status: 500 })),
    };
    component.user = { name: 'John', id: 1 };
    component.form.get('message')?.setValue('Hello');
    component.createMessage();
    expect(component.messages).toEqual([]);
  });

  it('should handle the case when the message modal template is not found', function () {
    const modalService = TestBed.inject(BsModalService);

    spyOn(modalService, 'show').and.callFake(() => {
      throw new Error('Message modal template not found');
    });

    component.openMessageModal();
    expect(modalService.show).toHaveBeenCalled();
  });

});
