import { Inject, Component, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MapService } from '../map.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-show-map',
  imports: [HttpClientModule],
  providers: [MapService, HttpClient],
  templateUrl: './show-map.component.html',
  styleUrl: './show-map.component.scss'
})


export class ShowMapComponent implements AfterViewInit {
  private map: any;
  L: any;
  latLngs: any;
  updatedPosition: any;
  index: number = 0;
  polygon: any;
  marker: any;
  drawControl: any;
  drawnFeatures: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private mapService: MapService, private http: HttpClient
  ) {
    this.latLngs = [[]];
  }
  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.L = await import('leaflet').then(module => module.default || module);
        await import('leaflet-draw');
        console.log(this.L);
        if (!this.L.map) {
          throw new Error('Leaflet map function not found.');
        }
        if (this.L) {

          this.getLatLng();
        }
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    }



  }
  private getLatLng(): void {
    this.mapService.getLatLng().subscribe({
      next: (res: any) => {
        this.latLngs = res.data;
        console.log('Success:', res);
        this.initMap();
        this.addPolygon();
        this.addDrawControls();
      },
      error: (err: any) => {
        console.error('Error:', err);
      }
    });
  }
  private initMap(): void {

    this.map = this.L.map('map').setView([24.10750407607746, 88.20004999637605],13 );
    this.L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',{
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(this.map);
  }
  private addPolygon(): void {
    if (this.latLngs && this.map) {
      this.polygon = this.L.polygon(this.latLngs, { color: 'green' }).addTo(this.map);
      this.map.fitBounds(this.polygon.getBounds());// zoom the map to the polygon
    }
  }
  private addDrawControls(): void {
    // Feature Group to store drawn items
    const drawnItems = new this.L.FeatureGroup();
    this.map.addLayer(drawnItems);
    drawnItems.addLayer(this.polygon);
    // Add draw control
    const drawControl = new this.L.Control.Draw({
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
    this.map.on(this.L.Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;
      drawnItems.addLayer(layer);
      console.log('Coordinates:', layer.getLatLngs());
    });

    this.map.on(this.L.Draw.Event.EDITED, (event: any) => {
      const layers = event.layers;
      layers.eachLayer((layer: any) => {
        console.log('Updated coordinates:', layer.getLatLngs());
      });
    });

  }

}


