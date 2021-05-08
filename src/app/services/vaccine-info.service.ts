import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VaccineInfoService {
  today = new Date();
  todayDate = `${String(this.today.getDate()).padStart(2, '0')}-${String(
    this.today.getMonth() + 1
  ).padStart(2, '0')}-${this.today.getFullYear()}`;
  api_uri = 'https://cdn-api.co-vin.in/api/v2';
  healtifyUri = 'https://www.healthifyme.com/api/v1/cowin';
  constructor(private http: HttpClient) {}

  getPinCode(pincode: any) {
    return this.http.get(
      `${this.api_uri}/appointment/sessions/public/calendarByPin`,
      {
        params: new HttpParams()
          .set('pincode', pincode)
          .set('date', this.todayDate),
      }
    );
  }

  getStateDistrictResult(district_id: any) {
    return this.http.get(
      `${this.api_uri}/appointment/sessions/public/calendarByDistrict`,
      {
        params: new HttpParams()
          .set('district_id', district_id)
          .set('date', this.todayDate),
      }
    );
  }

  getStateList() {
    return this.http.get(`${this.api_uri}/admin/location/states`);
  }

  getDistrictList(stateId: any) {
    return this.http.get(`${this.api_uri}/admin/location/districts/${stateId}`);
  }
}
