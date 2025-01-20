import { Inject, Component, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { circleMarker } from 'leaflet';
// import 'leaflet-draw'; 
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
  drawControl: any;
  drawnFeatures: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 
    this.lat=24.107562834510265;
    this.lng= 88.19982469081879;
    this.latLngs=[[this.lat,this.lng],[24.10750407607746, 88.20004999637605],[24.106931179944503,  88.19985151290895],[24.106945869620947, 88.19945454597475],[this.lat,this.lng]]
  }
  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const L = await import('leaflet').then(module => module.default || module);
        await import('leaflet-draw');
        if (!L.map) {
          throw new Error('Leaflet map function not found.');
        }
        this.initMap(L);
        // this.addMarker(L);
        // this.addMarkerOuter(L);
        this.addPolygon(L);
        this.addDrawControls(L);
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    }
  }

  private initMap(L:any): void {
    this.map = L.map('map').setView([24.10750407607746, 88.20004999637605], 13);

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
            this.latLngs[index] = [this.updatedPosition.lat, this.updatedPosition.lng];
            console.log(this.latLngs);
           this.updatePolygon(L);
          });
    });
    
    
  }
  // private addMarkerOuter(L:any):void{
  //   this.marker = L.marker([24.10761, 88.1981],{ draggable: true }).addTo(this.map);
  //     this.marker.on('dragend', (event:any)=>{
  //           this.updatedPosition= event.target.getLatLng();
  //           this.updatePolygonbyAddingPoint(this.updatedPosition,L);
           
  //         });
  // }

  private addPolygon(L:any):void{

    this.polygon = L.polygon(this.latLngs, {color: 'green'}).addTo(this.map);
    this.map.fitBounds(this.polygon.getBounds());// zoom the map to the polygon
  }

  // private updatePolygonbyAddingPoint(postion:any,L:any):void{
  //   var newPosition = [postion.lat, postion.lng];
  //   // this.latLngs.push(newPosition);
  //   // this.latLngs[0]=[postion.lat, postion.lng];
  //   this.latLngs.splice(this.latLngs.length - 1, 0, newPosition);
  //   this.polygon.setLatLngs(this.latLngs);
  //   console.log(this.latLngs);
  //   this.addMarker(L);

  // }

  private updatePolygon(L:any):void{
    this.polygon.setLatLngs(this.latLngs);
  }
  
  private addDrawControls(L: any): void {
    // Feature Group to store drawn items
    const drawnItems = new L.FeatureGroup();
    this.map.addLayer(drawnItems);
    drawnItems.addLayer(this.polygon);
    // Add draw control
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        remove: false
      },
      draw: {
        polygon: false,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false
      }
    });
    this.map.addControl(drawControl);

    // Handle created event (when a new shape is drawn)
    this.map.on(L.Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;
      drawnItems.addLayer(layer);
       console.log('Coordinates:', layer.getLatLngs());
    });

    this.map.on(L.Draw.Event.EDITED, (event: any) => {
      const layers = event.layers;
      layers.eachLayer((layer: any) => {
        console.log('Updated coordinates:', layer.getLatLngs());
      });
    });

  }

}


