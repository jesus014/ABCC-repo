using Backabcc.Entidades;
using Backabcc.Generic;
using Backabcc.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Threading.Tasks;

namespace Backabcc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticuloController : ControllerBase
    {
        public readonly ArticuloRepository _articuloRepository;

        public ArticuloController(ArticuloRepository repository)
        {
            this._articuloRepository = repository;
        }

        [HttpGet("/api/departamento")]
        public async Task<ActionResult<IEnumerable>> GetDepartamento()
        {
            return await _articuloRepository.GetAllDepartamento();
        }

        [HttpGet("/api/clase")]
        public async Task<ActionResult<IEnumerable>> GetClase()
        {
            return await _articuloRepository.GetAllClase();
        }

        [HttpGet("/api/familia")]
        public async Task<ActionResult<IEnumerable>> GetFamilia()
        {
            return await _articuloRepository.GetAllFamilia();
        }


        [HttpGet("{id}")]
        public async Task<ArticuloDTO> Get(int id)
        {
            var response = await _articuloRepository.GetById(id);

            if (response == null) { return null; }

            return response;
        }

        [HttpPost]
        public async Task Post([FromForm] ArticuloCreacionDTO value)
        {
            await _articuloRepository.Insert(value);
        }
        [HttpPut("{id}")]
        public async Task put(int id,[FromForm] ArticuloCreacionDTO value)
        {
            await _articuloRepository.Update(id, value);
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _articuloRepository.DeleteById(id);
        }
    }
}
