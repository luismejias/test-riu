import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Subscription } from 'rxjs';
import { Heroe } from '../../models/heroe.model';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-heroes-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, DatePipe],
  templateUrl: './heroes-table.component.html',
  styleUrl: './heroes-table.component.scss',
})
export class HeroesTableComponent {
  @Input() dataSource = new MatTableDataSource<Heroe>([]);
  @Output() handleDataEdit = new EventEmitter();
  @Output() handleDataDelete = new EventEmitter();
  displayedColumns: string[] = [
    'id',
    'name',
    'biography',
    'image',
    'appearance',
    'house',
    'edit',
    'delete',
  ];
  isLoadingResults: boolean = true;
  isRateLimitReached: boolean = false;
  resultsLength: number = 0;
  originalDataSource = new MatTableDataSource<Heroe>([]);
  subscription = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onEditClick(heroe: Heroe) {
    this.handleDataEdit.emit(heroe);
  }

  onDeleteClick(id: string) {
    this.handleDataDelete.emit(id);
  }
}
