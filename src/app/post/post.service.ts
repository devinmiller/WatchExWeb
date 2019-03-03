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
    let valueUrl = `${environment.searchUrl}?take=10&skip=${Math.max(0, search.page * 10)}&filter=${ search.term || ''}`;

    return this.http.get<Post[]>(valueUrl);
  }
}
