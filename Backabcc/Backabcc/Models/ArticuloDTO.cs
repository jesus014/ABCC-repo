using System;

namespace Backabcc.Models
{
    public class ArticuloDTO
    {
        public int Id { get; set; }
        public int? Sku { get; set; }
        public string Articulos { get; set; }
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
        public string nombreDepartamento { get; set; }
        public string nombreClase { get; set; }
        public string nombreFamilia { get; set; }



    }
}
