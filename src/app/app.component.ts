import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.toggleSidebar();
  }

  title = "coVaccinate";

  toggleMobile() {
    let bodyEle: HTMLBodyElement | any = document.querySelector("body");
    bodyEle.classList.toggle("nav-open");
  }

  toggleSidebar() {
    let sidebar: HTMLDivElement | any = document.querySelector(".sidebar");
    let mainPanel: HTMLDivElement | any = document.querySelector(".main-panel");
    sidebar.classList.toggle("sidebar-mini");
    mainPanel.classList.toggle("w-100");
  }
}
