import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notero } from '../services/notero.dataobject';
import { INote, IUser } from '../shared/interfaces';

@Component({
  selector: 'app-notero',
  template: `
    <div *ngIf="model">
      <app-pad
        [model]="model"
        [user]="user"
        [users]="users"
        [highlightMine]="highlightMine"></app-pad>
      <app-board
        [model]="model"
        [notes]="notes"
        [user]="user"
        [highlightMine]="highlightMine"></app-board>
    </div>
  `
})
export class NoteroComponent implements OnInit, OnDestroy {

  @Input() model: Notero;
  @Input() state: any;
  @Input() highlightMine: boolean;
  user: IUser;
  users: IUser[];
  notes: INote[];
  sub: Subscription;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit()  {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sub && changes.model && changes.model.currentValue) {
      this.model = changes.model.currentValue;
      this.notes = this.model.getNotesFromBoard();
      this.sub = this.model.change$.subscribe((change: any) => this.changed(change));
    }
  }

  changed(change: any) {
    switch (change) {
      case 'valueChanged':
        this.notes = this.model.getNotesFromBoard();
        break;
      case 'addMember':
      case 'removeMember':
        this.user = this.model.getUser();
        this.users = this.model.getUsers();
        break;
    }
    // Event is occuring outside of Angular so detecting changes
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
