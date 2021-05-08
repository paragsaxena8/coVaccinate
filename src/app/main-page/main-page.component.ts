import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VaccineInfoService } from 'src/app/services/vaccine-info.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styles: [],
})
export class MainPageComponent implements OnInit {
  pinCode: any;
  searchResult: any = '';
  active = 'top';
  result = false;
  state_list: any;
  stateInfo: any;
  distictInfo: any;
  vaccinationSpots: any;
  imagePath = '../../../assets/img/syringe.png';
  filterArray = [
    { name: '18-44', value: '18' },
    { name: '45+', value: '45' },
    { name: 'COVAXIN', value: 'COVAXIN' },
    { name: 'COVISHIELD', value: 'COVISHIELD' },
    { name: 'PAID', value: 'PAID' },
    { name: 'FREE', value: 'FREE' },
  ];
  district_list: any;
  constructor(
    private vcs: VaccineInfoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.stateList();
  }

  stateList() {
    this.vcs.getStateList().subscribe(
      (stateList: any) => {
        this.state_list = stateList.states;
      },
      () => {
        this.toastr.error('Error While Fetching the Data!!');
      }
    );
  }

  filterSearch(value: any) {
    this.searchResult = value;
  }

  districtList() {
    console.log(this.stateInfo.state_id);

    if (this.stateInfo.state_id) {
      this.vcs.getDistrictList(this.stateInfo.state_id).subscribe(
        (districtList: any) => {
          this.district_list = districtList.districts;
        },
        () => {
          this.toastr.error('Error While Fetching the Data!!');
        }
      );
    }
  }

  searchByStateDistrict() {
    this.spinner.show();
    this.searchResult = '';
    this.vcs.getStateDistrictResult(this.distictInfo.district_id).subscribe(
      (response: any) => {
        console.log('result: ', response);
        this.spinner.hide();
        if (response.centers) {
          this.vaccinationSpots = response.centers;
        }
      },
      () => {
        this.spinner.hide();
        this.toastr.error('Error While Fetching the Data!!');
      }
    );
  }

  searchByPinCode(form: NgForm) {
    this.spinner.show();
    console.log(form);
    this.searchResult = '';
    this.vcs.getPinCode(this.pinCode).subscribe(
      (response: any) => {
        if (response.centers) {
          this.spinner.hide();
          this.vaccinationSpots = response.centers;
        }
      },
      () => {
        this.spinner.hide();
        this.toastr.error('Error While Fetching the Data!!');
      }
    );
  }
}
