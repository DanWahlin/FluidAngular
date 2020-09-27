import { Component, OnInit } from '@angular/core';
import { Notero } from './services/notero.dataobject';
import { FluidLoaderService } from './services/fluid-loader.service';
import { NoteroContainerFactory } from './services/containerCode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  dataObject: Notero;

  constructor(private fluidService: FluidLoaderService) {}

  async ngOnInit() {
    this.dataObject = await this.fluidService.loadDataObject<Notero>(NoteroContainerFactory);
  }

}
