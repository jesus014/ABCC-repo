import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearArticuloComponent } from './components/crear-articulo/crear-articulo.component';
import { EditarArticuloComponent } from './components/editar-articulo/editar-articulo.component';
import { FormularioComponent } from './components/formulario/formulario.component';

const routes: Routes = [
  {path: 'articulo', component:FormularioComponent},
  {path: 'articulo/crear', component:CrearArticuloComponent},
  {path: 'articulo/editar/:id', component:EditarArticuloComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
