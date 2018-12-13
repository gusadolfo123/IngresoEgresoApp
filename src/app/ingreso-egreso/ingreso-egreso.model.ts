export class IngresoEgresoModel {
  descripcion: string;
  monto: number;
  tipo: string;

  constructor(obj) {
    const {descripcion, monto, tipo, uid} = obj;
    this.descripcion = (obj && descripcion) || null;
    this.monto = (obj && monto) || null;
    this.tipo = (obj && tipo) || null;
  }
}
