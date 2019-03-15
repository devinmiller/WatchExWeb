import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Post } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  public getPosts(search): Observable<Post[]> {
    let valueUrl = `${environment.searchUrl}?take=20&skip=${Math.max(0, search.page * 20)}&filter=${ search.term || ''}`;

    return this.http.get<Post[]>(valueUrl).pipe(
      map(response => response.map(post => Object.assign(new Post(), post)))
    );
  }
}
