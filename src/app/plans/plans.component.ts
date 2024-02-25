import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent implements OnInit {
  @Input() countryFlag: any;
  @Input() countryName!: string;


  ngOnInit(): void {
  }
}
