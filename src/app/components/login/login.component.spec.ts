import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { of, throwError } from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the username form with an empty string', () => {
    const component = new LoginComponent();
    expect(component.usernameForm.get('username')?.value).toEqual('');
  });

  it('should redirect to dashboard when user enters a valid username', function() {
    const component = new LoginComponent();
    spyOn(component.router, 'navigate');
    spyOn(component.userService, 'postUser').and.returnValue(of({ data: { name: 'username' } }));
    component.usernameForm.get('username')?.setValue('username');
    component.saveUsername();
    expect(component.router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should not redirect to dashboard when local storage does not exist', function() {
    const component = new LoginComponent();
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(component.router, 'navigate');
    component.ngOnInit();
    expect(component.router.navigate).not.toHaveBeenCalled();
  });

  it('should submit the form successfully when user enters a username with leading/trailing white space characters', function() {
    const component = new LoginComponent();
    spyOn(component.router, 'navigate');
    spyOn(component.userService, 'postUser').and.returnValue(of({ data: { name: 'username' } }));
    component.usernameForm.get('username')?.setValue('  username  ');
    component.saveUsername();
    expect(component.router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should submit the form successfully when user enters a username with special characters', function() {
    const component = new LoginComponent();
    spyOn(component.router, 'navigate');
    spyOn(component.userService, 'postUser').and.returnValue(of({ data: { name: 'username' } }));
    component.usernameForm.get('username')?.setValue('user@name');
    component.saveUsername();
    expect(component.router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
