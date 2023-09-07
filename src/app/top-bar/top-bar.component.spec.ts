import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarComponent } from './top-bar.component';
import { RouterLinkWithHref, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopBarComponent],
      imports: [RouterModule.forRoot([]), RouterTestingModule]
    });
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the home page when logo is clicked', () => {
    const compiled = fixture.nativeElement;
    const logoLink = fixture.debugElement.query(By.directive(RouterLinkWithHref));

    expect(logoLink).toBeTruthy();
  
    const href = logoLink.nativeElement.getAttribute('href');
    expect(href).toBe('/');
  });
});
