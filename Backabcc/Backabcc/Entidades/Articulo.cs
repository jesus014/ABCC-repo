using System;
using System.Collections.Generic;

#nullable disable

namespace Backabcc.Entidades
{
    public partial class Articulo
    {
        public int Id { get; set; }
        public int? Sku { get; set; }
        public string Articulo1 { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public int? Departamento { get; set; }
        public int? Clase { get; set; }
        public int? Familia { get; set; }
        public DateTime? FechaAlta { get; set; }
        public int? Stock { get; set; }
        public int? Cantidad { get; set; }
        public int? Descontinuado { get; set; }
        public DateTime? FechaBaja { get; set; }
    }
}
