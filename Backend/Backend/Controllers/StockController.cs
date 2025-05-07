using Backend.Data;
using Backend.DTOS.Stock;
using Backend.Helpers;
using Backend.Interfaces;
using Backend.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Backend.Controllers
{
    [Route("Backend/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IStockRepository _stockRepo;

        public StockController(ApplicationDBContext context , IStockRepository stockRepo)
        {
            _context = context;
            _stockRepo = stockRepo;
            
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query) {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stocks = await _stockRepo.GetAllAsync(query);
            var StocksDTO = stocks.Select(s=> s.ToStockDTO()).ToList();
            return Ok(StocksDTO);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id) {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stocks = await _stockRepo.GetByIdAsync(id);
            if (stocks == null)
            {
                return NotFound();
            }
            else { 
                return Ok(stocks.ToStockDTO());
            }

            
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDTO StockDTO) {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stockModel = StockDTO.ToStockFromCreateDTO();
            await _stockRepo.CreateAsync(stockModel);
            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDTO());
            
        }
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDTO updateDTO) {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stockModel = await _stockRepo.UpdateAsync(id, updateDTO);
            if (stockModel == null)
            {
                return NotFound();
            }
             
           
            return Ok(stockModel.ToStockDTO());
        }
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id) {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stockModel = await _stockRepo.DeleteAsync(id);
            if (stockModel == null)
            {
                return NotFound();
            }
           
            return NoContent();
        }
    }
}
