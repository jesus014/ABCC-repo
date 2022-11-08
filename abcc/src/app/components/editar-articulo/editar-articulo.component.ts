import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticulosService } from 'src/app/services/articulos.service';
import { guardarMensaje } from 'src/app/shared/utilidades/animaciones';

@Component({
  selector: 'app-editar-articulo',
  templateUrl: './editar-articulo.component.html',
  styleUrls: ['./editar-articulo.component.css']
})
export class EditarArticuloComponent implements OnInit {

  id!: any;
  modelos:any;
  modelo:any;
  valor!:any;
  constructor(private readonly articulosService:ArticulosService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id=params['id'];
       this.valor = this.id;
      this.articulosService.ObtenerPorId(params[this.valor]).subscribe(data=>{
        this.modelo=data;
      })
    })
  }

  guardarcambios(articulo:any){
    this.articulosService.EditarPorId(this.valor,articulo).subscribe(()=>{
      guardarMensaje();
      this.router.navigate([''])
    })

  }
}
