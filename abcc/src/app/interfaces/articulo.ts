export interface ArticuloCreacionDTO{

sku: number;
articulo: string,
marca: string;
modelo: string;
stock:number;
cantidad:number;
descontinuado:number;
departamento:number;
clase: number;
familia:number;
fechaBaja:Date;
fechaAlta:Date;


}


export interface ArticuloDTO{
  id: number;
  sku: number;
  articulos: string,
  marca: string;
  modelo: string;
  departamento:number;
  clase: number;
  familia:number;
  stock:number;
  cantidad:number;
  descontinuado:number;
  nombreDepartamento:string;
  nombreClase: string;
  nombreFamilia:string;
  fechaBaja:Date;
  fechaAlta:Date;
}




