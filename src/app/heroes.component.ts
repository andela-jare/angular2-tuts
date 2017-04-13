import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  template: `
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor='let hero of heroes' (click)='onSelected(hero)' [class.selected]='hero === selectedHero'>
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <div *ngIf='selectedHero'>
      {{ selectedHero.name | uppercase }} is my hero
      <button (click)='viewDetail()'>View Details</button>
    </div>
    `,
  styleUrls: ['./app.component.css']
})

export class HeroesComponent implements OnInit{
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) {

  }

  onSelected(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnInit() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  viewDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
