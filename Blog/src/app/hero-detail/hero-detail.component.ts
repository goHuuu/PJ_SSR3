import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DOCUMENT} from '@angular/common';


import { Confiture }         from '../hero';
import { HeroService }  from '../hero.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ],
  encapsulation: ViewEncapsulation.None,
})
export class HeroDetailComponent implements OnInit {
  hero: Confiture;
  editName: string;
  editRecette: string;
  editIngredients: string;

  constructor(
    private route: ActivatedRoute,
    
    private heroService: HeroService,
    private location: Location,
     @Inject(DOCUMENT) private _document
  ) {}

  ngOnInit(): void {
    this._document.body.classList.add('bodybg-color');
    this.getHero();
     }


  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  
  

  goBack(): void {
    this.location.back();
  }

  save() {
    this.hero.name = this.editName;
  }

  save1() {
    this.hero.recette = this.editRecette;

  }

  save2() {
    this.hero.ingredients = this.editIngredients;
  }


}