import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from 'src/app/components/message/message.component';

describe('CommentComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent]
    });
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message correctly in template', function() {
    const component = new MessageComponent();
    component.message = {
      id: '1',
      author: {
        name: 'John',
      },
      timestamp: new Date(),
      content: 'Hello world',
      comments: []
    };
  });


});
