import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';
import { Headers } from '@angular/http/src/headers';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
};

@Injectable()
export class HeroService {

    constructor(private http: HttpClient,
        private messageService: MessageService) { }

    private heroesUrl = 'api/heroes';

    private handleError<T>(operation = 'opration', result?: T) {
        return (error: any): Observable<T> => {

            console.log(error);

            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    private log(message: string) {
        this.messageService.add('HeroService: ' + message);
    }

    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
            tap(heroes => this.log(`fetched heroes`)),
            catchError(this.handleError('getHeroes', []))
            );
    }

    /** GET hero by id. Will 404 if id not found */
    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;

        return this.http.get<Hero>(url)
            .pipe(
            tap(result => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
            );
    }

    updateHero(hero: Hero): Observable<any> {
        return this.http.put(this.heroesUrl, hero, httpOptions)
            .pipe(
            tap(result => this.log(`updated hero id=${hero.id}`)),
            catchError(this.handleError<any>('updated hero'))
            );
        // return of('ok');

    }

    searchString(searchString: string): Observable<Hero[]> {
        if (!searchString.trim()) {
            return of([]);
        } else {
            return this.http.get<Hero[]>(`api/heroes/?name=${searchString}`).pipe(
                tap(_ => this.log(`found heroes matching "${searchString}"`)),
                catchError(this.handleError<Hero[]>('searchHeroes', []))
            );
        }
    }

}
