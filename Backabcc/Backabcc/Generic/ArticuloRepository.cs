using Backabcc.Entidades;
using Backabcc.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backabcc.Generic
{
    public class ArticuloRepository
    {
        private readonly string _connectionString;
        public ArticuloRepository(IConfiguration configuration)
        {
         _connectionString = configuration.GetConnectionString("defaultConnection");
        }
        public async Task<List<Departamento>> GetAllDepartamento()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("seleccionar_departamentos", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    var response = new List<Departamento>();
                    await sql.OpenAsync();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response.Add(MapToDepartamento(reader));
                        }
                    }

                    return response;
                }
            }
        }

        private Departamento MapToDepartamento(SqlDataReader reader)
        {
            return new Departamento()
            {
                Id = (int)reader["Id"],
                NumeroDepartamento = reader["NumeroDepartamento"].ToString(),
                NombreDepartamento = reader["NombreDepartamento"].ToString(),

            };
        }

        public async Task<List<Clase>> GetAllClase()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("seleccionar_clase", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    var response = new List<Clase>();
                    await sql.OpenAsync();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response.Add(MapToClase(reader));
                        }
                    }

                    return response;
                }
            }
        }
        private Clase MapToClase(SqlDataReader reader)
        {
            return new Clase()
            {
                Id = (int)reader["Id"],
                NumeroClase = reader["NumeroClase"].ToString(),
                NombreClase = reader["NombreClase"].ToString(),

            };
        }


        public async Task<List<Familium>> GetAllFamilia()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("seleccionar_familia", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    var response = new List<Familium>();
                    await sql.OpenAsync();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response.Add(MapToFamilia(reader));
                        }
                    }

                    return response;
                }
            }
        }
        private Familium MapToFamilia(SqlDataReader reader)
        {
            return new Familium()
            {
                Id = (int)reader["Id"],
                NumeroFamilia = reader["NumeroFamilia"].ToString(),
                NombreFamilia = reader["NombreFamilia"].ToString(),

            };
        }






        public async Task<ArticuloDTO> GetById(int Id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("seleccionar_articulo", sql))
                {
                    
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@sku", Id));
                    await sql.OpenAsync();
                    ArticuloDTO response = null;
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response = MapToArticulo(reader);
                        }
                    }

                    return response;

                }
            }
        }
        private ArticuloDTO MapToArticulo(SqlDataReader reader)
        {
            return new ArticuloDTO()
            {
                Id = (int)reader["Id"],
                Sku = (int)reader["sku"],
                Articulos = reader["Articulos"].ToString(),
                Marca = reader["Marca"].ToString(),
                Modelo=reader["modelo"].ToString(),
                Departamento=(int)reader["Departamento"],
                Clase = (int)reader["Clase"],
                Familia = (int)reader["Familia"],
                FechaAlta=(DateTime)reader["FechaAlta"],
                Stock = (int)reader["Stock"],
                Cantidad = (int)reader["Cantidad"],
                Descontinuado = (int)reader["Descontinuado"],
                FechaBaja = (DateTime)reader["FechaBaja"],
                nombreClase=reader["nombreClase"].ToString(),
                nombreDepartamento=reader["nombreDepartamento"].ToString(),
                nombreFamilia=reader["nombreFamilia"].ToString()

            };

        }

        public async Task Insert([FromForm] ArticuloCreacionDTO value)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("insertar_articulos", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@sku", value.Sku));
                    cmd.Parameters.Add(new SqlParameter("@articulo", value.Articulo1));
                    cmd.Parameters.Add(new SqlParameter("@marca", value.Marca));
                    cmd.Parameters.Add(new SqlParameter("@modelo", value.Modelo));
                    cmd.Parameters.Add(new SqlParameter("@departamento", value.Departamento));
                    cmd.Parameters.Add(new SqlParameter("@clase", value.Clase));
                    cmd.Parameters.Add(new SqlParameter("@familia", value.Familia));
                    cmd.Parameters.Add(new SqlParameter("@fechaAlta", value.FechaAlta));
                    cmd.Parameters.Add(new SqlParameter("@stock", value.Stock));
                    cmd.Parameters.Add(new SqlParameter("@cantidad", value.Cantidad));
                    cmd.Parameters.Add(new SqlParameter("@descontinuado", value.Descontinuado));
                    cmd.Parameters.Add(new SqlParameter("@fechaBaja", value.FechaBaja));
                    await sql.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return;
                }
            }
        }

        public async Task Update(int Id,[FromForm] ArticuloCreacionDTO value)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("actualizar_articulo", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", Id));
                    cmd.Parameters.Add(new SqlParameter("@sku", value.Sku));
                    cmd.Parameters.Add(new SqlParameter("@articulo", value.Articulo1));
                    cmd.Parameters.Add(new SqlParameter("@marca", value.Marca));
                    cmd.Parameters.Add(new SqlParameter("@modelo", value.Modelo));
                    cmd.Parameters.Add(new SqlParameter("@departamento", value.Departamento));
                    cmd.Parameters.Add(new SqlParameter("@clase", value.Clase));
                    cmd.Parameters.Add(new SqlParameter("@familia", value.Familia));
                    cmd.Parameters.Add(new SqlParameter("@fechaAlta", value.FechaAlta));
                    cmd.Parameters.Add(new SqlParameter("@stock", value.Stock));
                    cmd.Parameters.Add(new SqlParameter("@cantidad", value.Cantidad));
                    cmd.Parameters.Add(new SqlParameter("@descontinuado", value.Descontinuado));
                    cmd.Parameters.Add(new SqlParameter("@fechaBaja", value.FechaBaja));
                    await sql.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return;
                }
            }
        }





        public async Task DeleteById(int Id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("eliminar_articulo", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@Id", Id));
                    await sql.OpenAsync();
                    await cmd.ExecuteNonQueryAsync();
                    return;
                }
            }
        }
    }
}
