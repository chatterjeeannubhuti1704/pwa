import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MapService {
 private map_API_URL="http://192.168.0.15:8000/plot/view/?plot_name=plot%201";
  constructor(private http: HttpClient) {}
  getLatLng(){
    return this.http.get(this.map_API_URL);
  }
}
