import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DiceRoller } from './services/dataObject';
import { FluidLoaderService } from './services/fluid-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  diceChar: string;
  diceCharColor: string;
  dataObject: DiceRoller;
  sub: Subscription;

  constructor(private fluidService: FluidLoaderService, 
              private changeDetector: ChangeDetectorRef) {}

  async ngOnInit() {
    this.dataObject = await this.fluidService.loadFluidObject<DiceRoller>();
    this.sub = this.dataObject.diceRolled$.subscribe(this.updateDiceChar);
  }

  updateDiceChar = (val: number) => {
    // Unicode 0x2680-0x2685 are the sides of a dice (⚀⚁⚂⚃⚄⚅)
    this.diceChar = String.fromCodePoint(0x267F + val);
    this.diceCharColor = `hsl(${val * 60}, 70%, 50%)`;
    // diceRolled event is occuring outside of Angular so detecting changes
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
