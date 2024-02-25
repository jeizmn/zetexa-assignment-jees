import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  destinationQuery: string = '';
  parentSelectedDestination: boolean = false;
  countrySelectors: string[] = ['Country', 'Region'];
  selectorOption: string = 'Country';
  planActionButton: boolean = true;
  planDetails: boolean = true;
  selectedCountryFlag: any = '';
  buttonName: string = 'Find me a plan';

  constructor() { }

  ngOnInit(): void {
  }

  // Method to handle changes in selected destination
  handleSelectedDestinationChange(selectedDestination: boolean): void {
    this.parentSelectedDestination = selectedDestination;
  }

  // Method to handle changes in action button's disabled state
  handleActionButtonChange(actionButtonIsDisable: boolean): void {
    this.planActionButton = actionButtonIsDisable;
  }

  // Method to handle changes in selected country flag
  handleSelectedFlagChange(EmittedCountryFlag: any): void {
    this.selectedCountryFlag = EmittedCountryFlag;
  }

  // Method to handle selected destination query
  handleDestinationQuerySelected(destinationQuery: string): void {
    this.destinationQuery = destinationQuery;
  }

  // Method to handle country selection
  selectCountry(countrySelect: string): void {
    this.selectorOption = countrySelect;
  }

  // Method to handle button click
  buttonClick(): void {
    this.planDetails = false;
    if (!this.planDetails) {
      this.buttonName = 'See other plans';
    }
  }
}