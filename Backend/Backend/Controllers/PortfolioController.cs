using Backend.Extensions;
using Backend.Interfaces;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("backend/portfolio")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager ;
        private readonly IStockRepository _stockRepo;
        private readonly IportfolioRepository _porfolioRepo;
        private readonly IFMPService _fmpService;
        public PortfolioController(UserManager<AppUser> userManager,
            IStockRepository stockRepo, 
            IportfolioRepository porfolioRepo,
            IFMPService fmpService)
        {
            _userManager = userManager;
            _stockRepo = stockRepo;
            _porfolioRepo = porfolioRepo;
            _fmpService = fmpService;

        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio() {
            var username = User.GetUsername();
            var appuser = await _userManager.FindByNameAsync(username);
            var userportfolio = await _porfolioRepo.GetUserPortfolio(appuser);
            return Ok(userportfolio);
            
           
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPortfolio(string symbol)
        {
            var username = User.GetUsername();
            var appuser = await _userManager.FindByNameAsync(username);
            var stock = await _stockRepo.GetBySymbolAsync(symbol);
            if (stock == null)
            {
                stock = await _fmpService.FindStockBySymbolAsync(symbol);
                if (stock == null)
                {
                    return BadRequest("Stock not found");
                }
                else
                {
                    await _stockRepo.CreateAsync(stock);
                }
            }

            if (stock == null) return BadRequest("Stock not found");
            var userportfolio = await _porfolioRepo.GetUserPortfolio(appuser);
            if (userportfolio.Any(e=>e.Symbol.ToLower() == symbol.ToLower())) 
                return BadRequest("Stock already exists in your portfolio");
            var portfoliomodel = new Portfolio
            {
                StockId = stock.Id,
                AppUserId = appuser.Id,

            };
            await _porfolioRepo.CreatePortfolio(portfoliomodel);
            if (portfoliomodel == null) { return StatusCode(500, "could not create"); }
            else { return Created(); }
        }
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> RemovePortfolio(string symbol)
        {
            var username = User.GetUsername();
            var appuser = await _userManager.FindByNameAsync(username);
           
            var userportfolio = await _porfolioRepo.GetUserPortfolio(appuser);
            var filteredportfolio = userportfolio.Where(e => e.Symbol.ToLower() == symbol.ToLower()).ToList();
            if (filteredportfolio.Count == 1) {
                await _porfolioRepo.DeletePortfolioAsync(appuser, symbol);

            }
            else
            {
                return BadRequest("Stock not found ");
            }
            return Ok();
        } 
     }
    }

