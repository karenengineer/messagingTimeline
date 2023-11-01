import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the first letter of the username in uppercase', function() {
    const navbarComponent = new NavbarComponent();
    navbarComponent.username = 'john';
    navbarComponent.ngOnInit();
    expect(navbarComponent.usernameFirstLetter).toBe('J');
  });

  it('should log out the user and navigate to the home page when logout() is called', function() {
    const navbarComponent = new NavbarComponent();
    spyOn(localStorage, 'removeItem');
    spyOn(navbarComponent.router, 'navigate');
    navbarComponent.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('username');
    expect(navbarComponent.router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should handle null or undefined username', function() {
    const navbarComponent = new NavbarComponent();
    navbarComponent.username = null;
    navbarComponent.ngOnInit();
    expect(navbarComponent.usernameFirstLetter).toBeNull();
  });

  it('should handle empty string username', function() {
    const navbarComponent = new NavbarComponent();
    navbarComponent.username = '';
    navbarComponent.ngOnInit();
    expect(navbarComponent.usernameFirstLetter).toBeNull();
  });

  it('should handle whitespace string username', function() {
    const navbarComponent = new NavbarComponent();
    navbarComponent.username = '   ';
    navbarComponent.ngOnInit();
    expect(navbarComponent.usernameFirstLetter).toBeNull();
  });
});
