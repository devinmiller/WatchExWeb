import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Post, IOdata } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  public getPosts(search): Observable<{ posts: Post[], count: number }> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'api-key': '489390520E2EC14E11C02EC9AE26EEA5'
      })
    };

    let valueUrl = `${environment.searchUrl}?api-version=2017-11-11&$count=true&$orderby=Timestamp desc&$top=10&$skip=${Math.max(0, search.page * 10)}&search=${ search.term || '*'}`;

    return this.http.get<IOdata<Post>>(valueUrl, httpOptions).pipe(
      map(response => ({ posts: response.value, count: response["@odata.count"]}))
    );
  }

  public getCollage(search): Observable<{ posts: Post[], count: number }> {
    const httpOptions = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'api-key': '489390520E2EC14E11C02EC9AE26EEA5'
      })
    };

    let valueUrl = `${environment.searchUrl}?api-version=2017-11-11&$count=true&$orderby=Timestamp desc&$top=25&$skip=${Math.max(0, search.page * 25)}&$filter=HasPreview eq true&search=${ search.term || '*'}`;

    return this.http.get<IOdata<Post>>(valueUrl, httpOptions).pipe(
      map(response => ({ posts: response.value, count: response["@odata.count"]}))
    );
  }
}
