interface DataObj {
  uid: string;
  email: string;
  nombre: string;
}

export class UserModel {
  public nombre: string;
  public email: string;
  public uid: string;

  constructor(obj: DataObj) {
    const {nombre, email, uid} = obj;
    this.nombre = (obj && nombre) || null;
    this.email = (obj && email) || null;
    this.uid = (obj && uid) || null;
  }
}
