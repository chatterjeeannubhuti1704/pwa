import { Inject, Component, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';
@Component({
  selector: 'app-show-map',
  imports: [],
  templateUrl: './show-map.component.html',
  styleUrl: './show-map.component.scss'
})


export class ShowMapComponent implements AfterViewInit {
  private map: any;
  lng: number;
  lat: number;
  latLngs: any;
  updatedPosition: any;
  index: number=0;
  polygon: any;
  marker: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 
    this.lat=24.10771;
    this.lng= 88.1991;
    this.latLngs=[[this.lat,this.lng],[24.10770, 88.1990],[24.10768, 88.1989],[24.10765, 88.1987],[this.lat,this.lng]]
  }

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const L = await import('leaflet').then(module => module.default || module);
       
        if (!L.map) {
          throw new Error('Leaflet map function not found.');
        }
        this.initMap(L);
        this.addMarker(L);
        this.addMarkerOuter(L);
        this.addPolygon(L);
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    }
  }

  private initMap(L:any): void {
    this.map = L.map('map').setView([24.10771, 88.1991], 13);

    // https://mt1.google.com/vt/lyrs=s&x=&y=&z=
    // {s}.tile.openstreetmap.org/{z}/{x}/{y}

    L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      subdomains : ['mt0','mt1','mt2','mt3']
      // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  private addMarker(L:any):void{
   
    this.latLngs.forEach((coordinates:[number, number],index:number) => {
      this.marker = L.marker(coordinates,{ draggable: true }).addTo(this.map);
      this.marker.on('dragend', (event:any)=>{
            this.updatedPosition= event.target.getLatLng();
            // this.updatePolygonbyAddingPoint(this.updatedPosition,L);
            this.latLngs[index] = [this.updatedPosition.lat, this.updatedPosition.lng];
           this.updatePolygon(L);
          });
    });
    
    
  }
  private addMarkerOuter(L:any):void{
    this.marker = L.marker([24.10761, 88.1981],{ draggable: true }).addTo(this.map);
      this.marker.on('dragend', (event:any)=>{
            this.updatedPosition= event.target.getLatLng();
            this.updatePolygonbyAddingPoint(this.updatedPosition,L);
           
          });
  }

  private addPolygon(L:any):void{

    this.polygon = L.polygon(this.latLngs, {color: 'red'}).addTo(this.map);
    this.map.fitBounds(this.polygon.getBounds());// zoom the map to the polygon
  }

  private updatePolygonbyAddingPoint(postion:any,L:any):void{
    var newPosition = [postion.lat, postion.lng];
    this.latLngs.push(newPosition);
    this.latLngs[0]=[postion.lat, postion.lng];
    this.polygon.setLatLngs(this.latLngs);
    this.addMarker(L);
  }

  private updatePolygon(L:any):void{
    this.polygon.setLatLngs(this.latLngs);
  }
}


