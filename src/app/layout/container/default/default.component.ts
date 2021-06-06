import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  public noVisible: boolean = false
  public showLoadBar: boolean = false;

  constructor() { }

  ngOnInit(): void {}

}
