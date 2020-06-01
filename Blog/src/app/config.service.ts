import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service'

export interface post {
  id: Number;
  title: String;
  description: Number;
  recette: String;
  ingredients: String;
  date: Date;
}

export interface user {
  id: Number;
  username: String;
  password: String;
}

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  constructor(private http: HttpClient, private messageService: MessageService) {  }

  url = 'http://localhost:3000';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getArticles() {
    return this.http.get<JSON>(`${this.url}/post`)
    .pipe(
      catchError(this.handleError<JSON>('getArticles'))
    );
  }
  getArticle(idPost: number) {
    return this.http.get<JSON>(`${this.url}/post/${idPost}`)
    .pipe(
      catchError(this.handleError<JSON>('getArticle'))
    );
  }
  login(username: String, password: String) {
    return this.http.post<JSON>(`${this.url}/auth/`, JSON.parse(JSON.stringify(`"username": ${username}, "password": ${password}`))).pipe(
      catchError(this.handleError<JSON>('login'))
    );
  }
  getUser <JSON>(idUser: String) {
    return this.http.get<JSON>(`${this.url}/auth/${idUser}`)
  }

  //Pour les admin
  delArticle(idUser: String, idPost: String) {
    const temp = this.getUser(idUser);
    if(temp == null) {
      return null;
    }
    else {
      return this.http.delete<JSON>(`${this.url}/post/${idPost}`).pipe(
        catchError(this.handleError<JSON>('login'))
      );
    }
  }
  updateArticle(idUser: String, title: String, description : String, ingredients: String, recette: String) {
    const temp = this.getUser(idUser);
    if(temp == null) {
      return null;
    }
    else {
      return this.http.patch<JSON>(`${this.url}/post/`, JSON.parse(JSON.stringify(`"title": ${title}, "description": ${description}, "ingredients": ${ingredients}, "recette": ${recette}`))).pipe(
        catchError(this.handleError<JSON>('login'))
      );
    }
  }
  ajoutArticle(idUser: String, title: String, description : String, ingredients: String, recette: String) {
    const temp = this.getUser(idUser);
    if(temp == null) {
      return null;
    }
    else {
      return this.http.post<JSON>(`${this.url}/post/`, JSON.parse(JSON.stringify(`"title": ${title}, "description": ${description}, "ingredients": ${ingredients}, "recette": ${recette}`))).pipe(
        catchError(this.handleError<JSON>('login'))
      );
    }
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
