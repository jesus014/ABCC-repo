import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticuloCreacionDTO, ArticuloDTO } from '../interfaces/articulo';
import { claseDTO } from '../interfaces/clase';
import { departamentoDTO } from '../interfaces/departamento';
import { familiaDTO } from '../interfaces/familia';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private http:HttpClient) { }

  private apiURL:string = environment.apiURL + 'Articulo';
  private apiURLDepartamento:string = environment.apiURL + 'departamento';
  private apiURLClase:string = environment.apiURL + 'clase';
  private apiURLFamilia:string = environment.apiURL + 'familia';



  public ObtenerTodosClases(){
    return this.http.get<claseDTO[]>(this.apiURLClase);
  }

  public ObtenerTodosDepartamento(){
    return this.http.get<departamentoDTO[]>(this.apiURLDepartamento);
  }

  public ObtenerTodosFamilia(){
    return this.http.get<familiaDTO[]>(this.apiURLFamilia);
  }

  public crear(articulo:ArticuloCreacionDTO){
    const formData=this.construirFormData(articulo);
    return this.http.post(this.apiURL,formData);

  }
  private construirFormData(articulo:any):FormData{
      const formData= new FormData();
      formData.append('sku',articulo.sku);
      formData.append('articulo1',articulo.articulos);
      formData.append('cantidad',articulo.cantidad);
      formData.append('marca',articulo.marca);
      formData.append('stock',articulo.stock);
      formData.append('modelo',articulo.modelo)
      formData.append('fechaBaja',articulo.fechaBaja);
      formData.append('fechaAlta',articulo.fechaAlta);
      if(articulo.descontinuado=true){
        const valor=1;
      formData.append('descontinuado',valor.toLocaleString())
      }else if(articulo.descontinuado=false){
        const valor=0;
        formData.append('descontinuado',valor.toLocaleString())
      }
      if(articulo.clase){
        const valor= Number(articulo.clase);
        formData.append('clase',valor.toLocaleString())
      }

      if(articulo.departamento){
        const valor= Number(articulo.departamento);
        formData.append('departamento',valor.toLocaleString())
      }

      if(articulo.familia){
        const valor= Number(articulo.familia);
        formData.append('familia',valor.toLocaleString())
      }



      return formData;

  }

  public borrar(id:number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  public ObtenerPorId(id:number):Observable<ArticuloDTO> {
   return this.http.get<ArticuloDTO>(`${this.apiURL}/${id}`)
  }

  public EditarPorId(id:number, articulo:any){
    const formData=this.construirFormData(articulo);
    return this.http.put(`${this.apiURL}/${id}`,formData);
  }




}
