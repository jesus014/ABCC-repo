import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import{HttpClientModule} from '@angular/common/http';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { CrearArticuloComponent } from './components/crear-articulo/crear-articulo.component';
import { FormularioEditableComponent } from './components/formulario-editable/formulario-editable.component';
import { EditarArticuloComponent } from './components/editar-articulo/editar-articulo.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    BuscadorComponent,
    CrearArticuloComponent,
    FormularioEditableComponent,
    EditarArticuloComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
