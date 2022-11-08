import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticulosService } from 'src/app/services/articulos.service';
import { EnvioSkuService } from 'src/app/services/envio-sku.service';
import Swal from 'sweetalert2';
import { ArticuloDTO } from '../../interfaces/articulo';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  contactForm!: FormGroup;
  valor!:number
  parentMessage!:any; // <-- Nuevo atributo
  skuCompleto!:ArticuloDTO;


  constructor(private readonly fb : FormBuilder,
              private readonly articuloService : ArticulosService,
              private readonly router : Router,
              private readonly envioSku:EnvioSkuService) {
      this.contactForm=this.initForm();
  }

  ngOnInit(): void {
    this.contactForm=this.initForm();

  }

  initForm():FormGroup {

    return this.fb.group({
      sku:['',[Validators.required, Validators.minLength(2), Validators.maxLength(6)]],

    })

  }

  onSubmit():void{
        this.valor = this.contactForm.value;
        this.parentMessage= Object.values(this.valor)
        this.parentMessage=Number(this.parentMessage);
        const valor=this.parentMessage;

        try {
          this.articuloService.ObtenerPorId(this.parentMessage).subscribe(articulo => {
            if(articulo!=null) {
              this.skuCompleto=articulo;
              this.envioSku.enviar(articulo);
              this.contactForm.reset();
              this.router.navigate(['/articulo'])

            }
            else{
              Swal.fire ({
                title: 'El sku que busca no se encuentra',
                text: '¿Desea Agregar el sku?',
                icon: 'question',
                showConfirmButton:true,
                showCancelButton: true,
              }).then(resp=>{
                if(resp.value){
                this.router.navigate(['/articulo/crear'])
                this.contactForm.reset();

                }else{


                }
              })

            }

          },error => console.log(error))

        } catch (error) {
          console.log('error de consulta')
        }
  }




}
