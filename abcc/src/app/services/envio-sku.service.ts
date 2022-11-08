import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ArticuloDTO } from '../interfaces/articulo';

@Injectable({
  providedIn: 'root'
})
export class EnvioSkuService {

  constructor() { }
  private mensajero = new ReplaySubject<ArticuloDTO>(5)
  private mensajeroEntidad = new ReplaySubject<ArticuloDTO>(5)
  private enviarId= new ReplaySubject<number>(5)
  private recibirId= new ReplaySubject<number>(5)
  public get recibir() {
    return this.mensajero.asObservable()
  }

  public enviar(articulo: any): void {
    this.mensajero.next(articulo);
  }
  public get recibirData() {
    return this.mensajero.asObservable()
  }

  public enviarData(articulo: any): void {
    this.mensajero.next(articulo);
  }

  public enviarIds(Id:number):void{
    this.enviarId.next(Id)
  }
  public get recibirIds(){
    return this.recibirId.asObservable()
  }




}

