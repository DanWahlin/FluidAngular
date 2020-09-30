import { Component, OnInit } from '@angular/core';
import { CollaborativeText } from './services/collaborative-text.dataobject';
import { FluidLoaderService } from './services/fluid-loader.service';
import { CollaborativeTextContainerRuntimeFactory } from "./services/containerCode";

@Component({
  selector: 'app-root',
  template: `
    <div class="text-area" *ngIf="dataObject">
      <app-collaborative-text-area [sharedString]="dataObject.text"></app-collaborative-text-area>
    </div>
  `
})
export class AppComponent implements OnInit {
  dataObject: CollaborativeText;

  constructor(private fluidService: FluidLoaderService) {}

  async ngOnInit() {
    this.dataObject = await this.fluidService.loadDataObject<CollaborativeText>(CollaborativeTextContainerRuntimeFactory);
  }

}
