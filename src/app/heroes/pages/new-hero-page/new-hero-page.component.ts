import { Component } from '@angular/core';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: [
  ]
})
export class NewHeroPageComponent {

  public publisers = [
    {id: 'DC Comics', description: 'DC - Comics'},
    {id: 'Marvel Comics', description: 'Marvel - Comics'}
  ]
}
