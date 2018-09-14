import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedItem : string = "recipe";

  onMenuSelected(e){
    this.selectedItem = e;
    console.log(e);
  }
}
