import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { UdeaBombWarService } from './udea-bomb-war.service';
import { map, filter, debounceTime, tap, takeUntil } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { MAP_JSON_DATA } from './resources/udeaJsonMap';
import { Map, ASSETS_PATH } from './entities/Map';

@Component({
  selector: 'app-udea-bomb-war',
  templateUrl: './udea-bomb-war.component.html',
  styleUrls: ['./udea-bomb-war.component.css']
})
export class UdeaBombWarComponent implements OnInit {


  debuggin = false;
  dimensions;

  private ngUnsubscribe = new Subject();
  tilesSize = 100;
  scale = 1;

  // AUDIO RESOURCES
  audio = {
    music : null
  }

  // MAP
  map: Map;


  constructor(private udeaBombWarService: UdeaBombWarService) {

  }

  ngOnInit() {

    this.listenResizeEvent();
    this.listenKeyBoard();

    


    // this.playAudio(ASSETS_PATH + 'audio/soundtrack.mp3');

    this.initMap();



  }

  /**
* listen the window size changes
*/
  listenResizeEvent() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(50),
        map((size: any) => {

          const tileSizeModified = (this.tilesSize * this.scale);
          const height = size.currentTarget.innerHeight || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
          const width = size.currentTarget.innerWidth || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

          return {
            height, width,
            horizontalTiles: Math.ceil((screen.width - tileSizeModified) / tileSizeModified),
            verticalTiles: Math.ceil((screen.height - tileSizeModified) / tileSizeModified),
          }

        }),
        takeUntil(this.ngUnsubscribe)
      ).subscribe(size => {
        this.dimensions = size;
      });
  }

  listenKeyBoard() {
    fromEvent(window, 'keydown')
      .pipe(
        map((e: any) => e),
        tap(e => {
          console.log({ e })
        }),
        takeUntil(this.ngUnsubscribe)
      ).subscribe();
  }

  playAudio(songPath) {
    if (this.audio.music != null) {
      this.audio.music.pause();
      this.audio.music.src = "";
    }
    this.audio.music = new Audio(songPath);
    console.log(this.audio);
    this.audio.music.play();
  }

  initMap(){
    this. map = new Map(MAP_JSON_DATA, 0);
    console.log(this.map);

  }








}
