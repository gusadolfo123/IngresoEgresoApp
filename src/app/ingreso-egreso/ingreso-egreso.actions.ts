import {Action} from '@ngrx/store';
import {IngresoEgresoModel} from './ingreso-egreso.model';

export enum IngresoEgresoActionTypes {
  Set_Item = '[IngresoEgreso] Set_Item',
  Unset_Items = '[IngresoEgreso] Unset_Items',
}

export class SetItemsAction implements Action {
  readonly type = IngresoEgresoActionTypes.Set_Item;
  constructor(public item: IngresoEgresoModel) {}
}

export class UnsetItemsAction implements Action {
  readonly type = IngresoEgresoActionTypes.Unset_Items;
}

export type Actions = SetItemsAction | UnsetItemsAction;
