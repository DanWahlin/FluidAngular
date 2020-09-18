import { Component, OnInit } from '@angular/core';
import { DiceRollerService } from './services/diceRoller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  diceChar: string;
  diceCharColor: string;

  constructor(private diceRollerService: DiceRollerService) {}

  async ngOnInit() {
    await this.diceRollerService.loadFluidObject();
    this.diceRollerService.diceRoller.on('diceRolled', this.updateDiceChar);
    this.roll();
  }

  updateDiceChar = () => {
    // Unicode 0x2680-0x2685 are the sides of a dice (⚀⚁⚂⚃⚄⚅)
    this.diceChar = String.fromCodePoint(0x267F + this.diceRollerService.diceRoller.value);
    this.diceCharColor = `hsl(${this.diceRollerService.diceRoller.value * 60}, 70%, 50%)`;
};

  roll() {
    this.diceRollerService.diceRoller.roll();
  }
}
