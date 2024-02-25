import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryApiService {

  constructor(private http: HttpClient) { }

  searchCountries(query: string): Observable<any[]> {
    return this.http.get<any[]>('https://restcountries.com/v3.1/all').pipe(
      map((response: any[]) => {
        // Map the response to extract the id, name, and flag of each country
        return response.map(country => ({
          id: country.cca2, // Assuming 'cca2' is the id of the country
          name: country.name.common, // Assuming 'name.common' is the name of the country
          flag: country.flags.svg // Assuming 'flags.svg' is the flag of the country
        }));
      })
    );
  }
}
