import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  public pageTitle = 'Products';

  @Input() public errorMessage: unknown;
  @Input() public showProductCode: boolean;
  @Input() public products: Product[];
  // Used to highlight the selected product in the list
  @Input() selectedProductId: number | null;

  @Output() public checkChanged: EventEmitter<void> = new EventEmitter<void>();
  @Output() public productSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() public initNewProduct: EventEmitter<void> = new EventEmitter<void>();
}
