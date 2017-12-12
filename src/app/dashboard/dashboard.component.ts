import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [HeroService]
})
export class DashboardComponent implements OnInit {

  constructor(private hersoService: HeroService, private messageService: MessageService) { }

  heroes: Hero[] = [];

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.hersoService
      .getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 4), (error) => this.messageService.add(error));
  }

}
