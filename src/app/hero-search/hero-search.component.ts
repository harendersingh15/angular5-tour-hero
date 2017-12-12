import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/Observable/of';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { debounce, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { debounceTime } from 'rxjs/operators/debounceTime';
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroService]
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchString = new Subject<string>();


  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.searchString.next(term);
  }

  ngOnInit() {
    this.heroes$ = this.searchString.pipe(debounceTime(300), distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchString(term)));
  }

}
