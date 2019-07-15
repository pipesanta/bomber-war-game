import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { UdeaBombWarService } from './udea-bomb-war.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-udea-bomb-war',
  templateUrl: './udea-bomb-war.component.html',
  styleUrls: ['./udea-bomb-war.component.css']
})
export class UdeaBombWarComponent implements OnInit {



  constructor(private udeaBombWarService: UdeaBombWarService) {

  }

  ngOnInit() {



  }








}
