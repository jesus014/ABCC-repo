import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticuloDTO } from 'src/app/interfaces/articulo';
import { claseDTO } from 'src/app/interfaces/clase';
import { departamentoDTO } from 'src/app/interfaces/departamento';
import { familiaDTO } from 'src/app/interfaces/familia';
import { EnvioSkuService } from 'src/app/services/envio-sku.service';
import Swal from 'sweetalert2';
import { ArticulosService } from '../../services/articulos.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit, OnChanges {

  contactForm!: FormGroup;
  departamento!:departamentoDTO[];
  clase!:claseDTO[];
  familia!:familiaDTO[];
  seleccionadoDepartamento:any;
  seleccionadoClase:any;
  seleccionadoFamilia:any;
  valores!:any;
  valorNuevo:boolean=false;
  valorCheck!:any;
  nuevoValor!:any;
  selecionado!:any;
  inputChecked!: boolean


  @Input() childMessage!: number; // <---- Nuevo atributo
  @Input() entity!:ArticuloDTO;
  @Input() modelo!:any;
  @Input() sku!:any;



  constructor(private readonly fb:FormBuilder,
             private readonly articulosService:ArticulosService,
             private readonly envioSku:EnvioSkuService,
             private readonly router: Router) {

    this.contactForm=this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {

    //this.valores = changes['sku'].currentValue;
}

  ngOnInit(): void {

    this.contactForm = this.initForm();
    this.contactForm.disable();

    this.articulosService.ObtenerTodosDepartamento().subscribe(resp => {
    this.departamento=resp;
    });

    this.articulosService.ObtenerTodosClases().subscribe(resp => {
    this.clase=resp
    });

    this.articulosService.ObtenerTodosFamilia().subscribe(resp => {
      this.familia=resp
    });

    this.envioSku.recibir.subscribe(data => {
      this.valores=data;
    })

    if(this.valores !== undefined){
      const format= 'yyyy-MM-dd';
      const locale='en-US';

      const valor:any={

        sku:this.valores.sku,
        articulos:this.valores.articulos,
        marca:this.valores.marca,
        modelo:this.valores.modelo,
        stock:this.valores.stock,
        cantidad:this.valores.cantidad,
        fechaAlta:formatDate(this.valores.fechaAlta,format,locale),
        fechaBaja:formatDate(this.valores.fechaBaja,format,locale),
        departamento:!this.valores.departamento,
        familia:this.valores.familia,
        clase:this.valores.clase,
        descontinuado:this.valores.descontinuado,
        nombreDepartamento:this.valores.nombreDepartamento,
        nombreClase:this.valores.nombreClase,
        nombreFamilia:this.valores.nombreFamilia,
        id:this.valores.id,

      };
      this.valorCheck=valor.descontinuado;
      if(this.valorCheck=0){
        this.inputChecked = false;
      }

      this.contactForm.patchValue(valor);
      //this.contactForm.enable();
    }



  }


  initForm():FormGroup {

    return this.fb.group({
      sku:['',[Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
      articulos:['',[Validators.required, Validators.minLength(3)]],
      marca:['',[Validators.required, Validators.minLength(3)]],
      modelo:['',[Validators.required, Validators.minLength(3)]],
      stock:['',[Validators.required, Validators.minLength(3)]],
      cantidad:['',[Validators.required]],
      fechaAlta:['',[Validators.required]],
      fechaBaja:['',[Validators.required]],
      departamento:[''],
      clase:[''],
      familia:[''],
      descontinuado:[''],
      nombreDepartamento:[''],
      nombreClase:[''],
      nombreFamilia:[''],
      id:'',
    })

  }

    //se imprimen los datos del formulario
    onSubmit():void{

      Swal.fire ({

        title: 'esta seguro',
        text: '¿esta seguro de eliminar?',
        icon: 'question',
        showConfirmButton:true,
        showCancelButton: true,
      }).then(resp=>{
        if(resp.value){
          this.articulosService.borrar(this.valores.id).subscribe(() => {
            this.router.navigate([''])
          }, error => console.log(error));
        }
      })

    }



    EnviarInformacion(){
      Swal.fire ({

        title: 'Deseas Actualizar',
        text: '¿esta seguro de la actualizacion?',
        icon: 'question',
        showConfirmButton:true,
        showCancelButton: true,
      }).then(resp=>{
        if(resp.value){
          this.router.navigate(['articulo','editar',this.valores.id]);
        }
      })


    }


}
