import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticulosService } from 'src/app/services/articulos.service';
import { EnvioSkuService } from 'src/app/services/envio-sku.service';
import { guardarMensaje } from 'src/app/shared/utilidades/animaciones';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css']
})
export class CrearArticuloComponent implements OnInit {

  constructor(private readonly envioSku:EnvioSkuService,
              private readonly articulosService:ArticulosService,
              private  router:Router,
              private readonly fb:FormBuilder,) { }

  contactForm!: FormGroup;
  valorDepartamento!:any;
  valorClase!:any;
  valorFamilia!:any;
  seleccionadoDepartamento:any;
  seleccionadoClase:any;
  seleccionadoFamilia:any;
  valores:any;
  skuNumber!:number;
  stockNumber!:number;
  cantidadNumber!:number;

 ngOnInit(): void {
  this.contactForm = this.initForm();
  this.articulosService.ObtenerTodosDepartamento().subscribe(resp => {
    this.valorDepartamento=resp;
    });

    this.articulosService.ObtenerTodosClases().subscribe(resp => {
    this.valorClase=resp
    });

    this.articulosService.ObtenerTodosFamilia().subscribe(resp => {
      this.valorFamilia=resp
    });

  }

  guardarcambios(articulo:any){
  this.articulosService.crear(articulo).subscribe(()=>{
    this.router.navigate([''])
  })
  }

  initForm():FormGroup {

    return this.fb.group({
      sku:['',[Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
      articulos:['',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      marca:['',[Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      modelo:['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      stock:['',[Validators.required, Validators.minLength(1), Validators.maxLength(9)]],
      cantidad:['',[Validators.required, Validators.maxLength(9)]],
      fechaAlta:['',[Validators.required]],
      fechaBaja:['',[Validators.required]],
      departamento:'',
      clase:'',
      familia:'',
      descontinuado:[''],
      id:''
    })




  }


  onSubmit(){
    const articuloEnviar=this.contactForm.value;
    this.articulosService.crear(articuloEnviar).subscribe(()=>{
      guardarMensaje();
      this.router.navigate([''])

    })
  }
}
