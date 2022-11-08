import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { claseDTO } from 'src/app/interfaces/clase';
import { departamentoDTO } from 'src/app/interfaces/departamento';
import { familiaDTO } from 'src/app/interfaces/familia';
import { ArticulosService } from 'src/app/services/articulos.service';
import { EnvioSkuService } from 'src/app/services/envio-sku.service';

@Component({
  selector: 'app-formulario-editable',
  templateUrl: './formulario-editable.component.html',
  styleUrls: ['./formulario-editable.component.css']
})
export class FormularioEditableComponent implements OnInit {

  contactForm!: FormGroup;
  valorDepartamento!:any;
  valorClase!:any;
  valorFamilia!:any;
  seleccionadoDepartamento:any;
  seleccionadoClase:any;
  seleccionadoFamilia:any;
  valores:any;
  stockNumber!:number;
  cantidadNumber!:number;
  @Input() modelos?:any;
  @Output() OnSubmit:EventEmitter<any>= new EventEmitter<any>();

  constructor(private readonly fb:FormBuilder,
              private readonly articulosService:ArticulosService,
              private readonly envioSku:EnvioSkuService) {
                this.contactForm=this.initForm();
              }

  ngOnInit(): void {
    this.contactForm = this.initForm();
    this.contactForm.reset();

    this.articulosService.ObtenerTodosDepartamento().subscribe(resp => {
      this.valorDepartamento=resp;
      });

      this.articulosService.ObtenerTodosClases().subscribe(resp => {
      this.valorClase=resp
      });

      this.articulosService.ObtenerTodosFamilia().subscribe(resp => {
        this.valorFamilia=resp
      });
      this.envioSku.recibirData.subscribe(data => {
        this.valores=data;
      })
      if(this.valores!==undefined){
        this.contactForm.patchValue(this.valores);
        this.envioSku.enviarIds(this.valores.Id);
      }
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


  onSubmit():void{
    this.OnSubmit.emit(this.contactForm.value);
    this.contactForm.reset()
  }





}
