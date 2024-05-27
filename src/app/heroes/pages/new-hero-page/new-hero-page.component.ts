import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: [
  ]
})
export class NewHeroPageComponent implements OnInit {

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

  constructor(private heroesService: HeroesService,
              private activatedRoutes: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog
  ){}

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoutes.params
      .pipe(
        switchMap( params => this.heroesService.getHeroById(params['id']))
      )
      .subscribe( hero =>
        {
          if( !hero ) return this.router.navigateByUrl('/heroes/list');

          this.heroForm.reset(hero);
          return;

        }
      )
  }


  public get currentHero() : Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  public showSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 2500
    })
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
          this.showSnackBar(`${hero.superhero} actualizado/a`)
        });
      return;
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe( hero => {
        this.showSnackBar(`${hero.superhero} creado/a`)
        this.router.navigate(['/heroes/edit/', hero.id])
      })
  }

  onDeleteHero(): void{
    if(!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log({result});

      if(!result) return;

      this.heroesService.deleteHero(this.currentHero.id).subscribe( created =>
        {
          console.log({created});
          if(created) {
            this.router.navigate(['/heroes']);
            return;
          }
          this.showSnackBar('Error al eliminar héroe');
          return;
        }
      )

    });

  }
}
