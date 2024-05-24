import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: [
  ]
})
export class NewHeroPageComponent {

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.MarvelComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  public publishers = [
    {id: 'DC Comics', description: 'DC - Comics'},
    {id: 'Marvel Comics', description: 'Marvel - Comics'}
  ]

  constructor(private heroesService: HeroesService){}


  public get currentHero() : Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }




  onSubmit():void{
    // console.log({
    //   formIsValid: this.heroForm.valid,
    //   value: this.heroForm.value,
    //   rawValue: this.heroForm.getRawValue()
    // });

    if(this.heroForm.invalid) return;

    if(this.currentHero.id){
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          // TODO Mostrar snackbar
        });
      return;
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe( hero => {
        // TODO Mostrar snackbar y navegar a /heroes/edit/heroID
      })
  }
}
