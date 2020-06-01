import { Component, OnInit } from '@angular/core';

import { Confiture } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Confiture[];

  confiture: Confiture = {
    id: 1, 
    name: 'Pomme', 
    recette: 'Chauffer pomme dans une marmite',
    ingredients: 'du sucre'
  }

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
}
