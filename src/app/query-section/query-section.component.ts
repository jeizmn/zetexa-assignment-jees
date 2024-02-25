import { Component, OnInit } from '@angular/core';
import { CountryApiService } from '../service/country-api.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-query-section',
  templateUrl: './query-section.component.html',
  styleUrl: './query-section.component.css'
})
export class QuerySectionComponent implements OnInit {
  destinationQuery: string = '';
  suggestedDestinations: string[] = [];
  selectedDuration: string = '';
  durationOptions: string[] = ['7-15 days', '30-45 days', '45-60 days', '60-90 days'];
  selectedDestination: boolean = false;
  isDisable: boolean = true;
  countries: any[] = [];
  selectedCountryFlag: any = '';
  allDestinations: any[] = [];
  actionButtonIsDisable: boolean = true;



  // Output event emitters
  @Output() selectedDestinationChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() actionButtonIsDisableChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectedFlagChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() destinationQuerySelected: EventEmitter<string> = new EventEmitter<string>();




  constructor(private countryApiService: CountryApiService) { }

  ngOnInit(): void {
    this.countryApiService.searchCountries(this.destinationQuery).subscribe(response => {
      this.countries = response;
      this.allDestinations = this.countries.map(country => country.name);
    });
    console.log(this.countries);

  }

  showSuggestions(): void {
    if (this.destinationQuery) {
      this.suggestedDestinations = this.allDestinations.filter(destination =>
        destination.toLowerCase().includes(this.destinationQuery.toLowerCase())
      );

    } else {
      this.suggestedDestinations = [];
    }
  }

  selectDestination(destination: string): void {
    this.destinationQuery = destination;
    // Clear suggestions after selecting a destination
    this.suggestedDestinations = [];
    this.selectedDestination = true;
    this.isDisable = false;

    // Search for the country flag using the destinationQuery
    const selectedCountry = this.countries.find(country => country.name.toLowerCase() === this.destinationQuery.toLowerCase());
    if (selectedCountry) {
      this.selectedCountryFlag = selectedCountry.flag;
    } else {
      // Handle case when country is not found
      this.selectedCountryFlag = null; // or any other default value
    }
    console.log(this.selectedCountryFlag);

    // Emit the selectedDestination boolean value to the parent component
    this.selectedDestinationChange.emit(this.selectedDestination);

    // Emit the selectedFlag to the parent  component
    this.selectedFlagChange.emit(this.selectedCountryFlag);

    // Emit the selectedDestination boolean value to the parent component
    this.destinationQuerySelected.emit(this.destinationQuery)

  }

  selectDuration(duration: string): void {
    this.selectedDuration = duration;
    this.actionButtonIsDisable = false;
    this.actionButtonIsDisableChange.emit(this.actionButtonIsDisable)
  }
}
