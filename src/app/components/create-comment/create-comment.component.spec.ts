import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommentComponent } from 'src/app/components/create-comment/create-comment.component';
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { UserService } from "src/app/services/user.service";

describe('CreateCommentComponent', () => {
  let component: CreateCommentComponent;
  let fixture: ComponentFixture<CreateCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCommentComponent],
      providers: [
            {
              provide: HttpClient, // Provide HttpClient for your component
              useValue: {
                get: () => of({}), // Replace with your own HttpClient mock
                post: () => of({}), // Replace with your own HttpClient mock
              },
            },
            {
              provide: UserService, // Provide UserService for your component
              useValue: {
                // Replace with UserService methods and mock data
              },
            },
          ],
    });
    fixture = TestBed.createComponent(CreateCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize messageForm property with a FormGroup containing a message FormControl with an empty string as default value and a Validators.required validator', function() {
    const fbMock = jasmine.createSpyObj('FormBuilder', ['group']);
    const formGroupMock = jasmine.createSpyObj('FormGroup', ['get']);
    const formControlMock = jasmine.createSpyObj('FormControl', ['value']);
    const validatorsMock = jasmine.createSpyObj('Validators', ['required']);

    formControlMock.value = '';
    formGroupMock.get.and.returnValue(formControlMock);
    fbMock.group.and.returnValue(formGroupMock);

    const component = new CreateCommentComponent(fbMock);

    expect(fbMock.group).toHaveBeenCalledWith({
      comment: ['', [validatorsMock.required]]
    });
    expect(component.messageForm).toBe(formGroupMock);
  });

  it('should initialize messageForm property with a FormGroup containing a message FormControl with an empty string as default value and no Validators.required validator', function() {
    const fbMock = jasmine.createSpyObj('FormBuilder', ['group']);
    const formGroupMock = jasmine.createSpyObj('FormGroup', ['get']);
    const formControlMock = jasmine.createSpyObj('FormControl', ['value']);

    formControlMock.value = '';
    formGroupMock.get.and.returnValue(formControlMock);
    fbMock.group.and.returnValue(formGroupMock);

    const component = new CreateCommentComponent(fbMock);

    expect(fbMock.group).toHaveBeenCalledWith({
      comment: ['']
    });
    expect(component.messageForm).toBe(formGroupMock);
  });

  it('should initialize messageForm property with a FormGroup containing multiple FormControls', function() {
    const fbMock = jasmine.createSpyObj('FormBuilder', ['group']);
    const formGroupMock = jasmine.createSpyObj('FormGroup', ['get']);
    const formControl1Mock = jasmine.createSpyObj('FormControl', ['value']);
    const formControl2Mock = jasmine.createSpyObj('FormControl', ['value']);

    formControl1Mock.value = '';
    formControl2Mock.value = '';
    formGroupMock.get.and.returnValues(formControl1Mock, formControl2Mock);
    fbMock.group.and.returnValue(formGroupMock);

    const component = new CreateCommentComponent(fbMock);

    expect(fbMock.group).toHaveBeenCalledWith({
      comment1: [''],
      comment2: ['']
    });
    expect(component.messageForm).toBe(formGroupMock);
  });

  it('should initialize messageForm property with a FormGroup containing nested FormGroups', function() {
    const fbMock = jasmine.createSpyObj('FormBuilder', ['group']);
    const formGroupMock = jasmine.createSpyObj('FormGroup', ['get']);
    const nestedFormGroupMock = jasmine.createSpyObj('FormGroup', ['get']);
    const formControlMock = jasmine.createSpyObj('FormControl', ['value']);

    formControlMock.value = '';
    nestedFormGroupMock.get.and.returnValue(formControlMock);
    formGroupMock.get.and.returnValue(nestedFormGroupMock);
    fbMock.group.and.returnValue(formGroupMock);

    const component = new CreateCommentComponent(fbMock);

    expect(fbMock.group).toHaveBeenCalledWith({
      nested: fbMock.group({
        comment: ['']
      })
    });
    expect(component.messageForm).toBe(formGroupMock);
  });

  it('should initialize messageForm property with a FormGroup containing FormArrays', function() {
    const fbMock = jasmine.createSpyObj('FormBuilder', ['group']);
    const formGroupMock = jasmine.createSpyObj('FormGroup', ['get']);
    const formArrayMock = jasmine.createSpyObj('FormArray', ['get']);
    const formControlMock = jasmine.createSpyObj('FormControl', ['value']);

    formControlMock.value = '';
    formArrayMock.get.and.returnValue(formControlMock);
    formGroupMock.get.and.returnValue(formArrayMock);
    fbMock.group.and.returnValue(formGroupMock);

    const component = new CreateCommentComponent(fbMock);

    expect(fbMock.group).toHaveBeenCalledWith({
      comments: fbMock.array([
        ['']
      ])
    });
    expect(component.messageForm).toBe(formGroupMock);
  });

  it('should initialize messageForm property with a FormGroup containing custom validators', function() {
    const fbMock = jasmine.createSpyObj('FormBuilder', ['group']);
    const formGroupMock = jasmine.createSpyObj('FormGroup', ['get']);
    const formControlMock = jasmine.createSpyObj('FormControl', ['value']);
    const customValidatorMock = jasmine.createSpyObj('CustomValidator', ['validate']);

    formControlMock.value = '';
    formGroupMock.get.and.returnValue(formControlMock);
    fbMock.group.and.returnValue(formGroupMock);

    const component = new CreateCommentComponent(fbMock);

    expect(fbMock.group).toHaveBeenCalledWith({
      comment: ['', [customValidatorMock.validate]]
    });
    expect(component.messageForm).toBe(formGroupMock);
  });

  it('should initialize messageForm property with a FormGroup containing async validators', function() {
    const fbMock = jasmine.createSpyObj('FormBuilder', ['group']);
    const formGroupMock = jasmine.createSpyObj('FormGroup', ['get']);
    const formControlMock = jasmine.createSpyObj('FormControl', ['value']);
    const asyncValidatorMock = jasmine.createSpyObj('AsyncValidator', ['validate']);

    formControlMock.value = '';
    formGroupMock.get.and.returnValue(formControlMock);
    fbMock.group.and.returnValue(formGroupMock);

    const component = new CreateCommentComponent(fbMock);

    expect(fbMock.group).toHaveBeenCalledWith({
      comment: ['', [], [asyncValidatorMock.validate]]
    });
    expect(component.messageForm).toBe(formGroupMock);
  });
});
