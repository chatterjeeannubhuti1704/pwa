import { Component } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet'
import * as Leaflet from 'leaflet';
@Component({
  selector: 'app-show-map',
  imports: [LeafletModule],
  templateUrl: './show-map.component.html',
  styleUrl: './show-map.component.scss'
})
export class ShowMapComponent {
//   options: Leaflet.MapOptions = {
//     // layers: getLayers(),
//     // zoom: 12,
//     center: new Leaflet.LatLng(43.530147, 16.488932)
//   };
}

// export const getLayers = (): Leaflet.Layer[] => {
//   return [
//     new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors'
//     } as Leaflet.TileLayerOptions),
//   ] as Leaflet.Layer[];
// };

