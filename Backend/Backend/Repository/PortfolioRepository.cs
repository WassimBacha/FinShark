using Backend.Data;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class PortfolioRepository : IportfolioRepository
    {
        private readonly ApplicationDBContext _context;
        public PortfolioRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Portfolio> CreatePortfolio(Portfolio portfolio)
        {
            await _context.Portfolio.AddAsync(portfolio);
            await _context.SaveChangesAsync();
            return portfolio;
        }

        public async Task<Portfolio> DeletePortfolioAsync(AppUser user, string symbol)
        {
            var portfoliomodel = await _context.Portfolio.FirstOrDefaultAsync(x=>x.AppUserId == user.Id && x.stock.Symbol == symbol);
            if (portfoliomodel == null)
            {
                return null;
            }
            _context.Portfolio.Remove(portfoliomodel);
            await _context.SaveChangesAsync();
            return portfoliomodel;
        }

        public async Task<List<Stock>> GetUserPortfolio(AppUser user)
        {
            return await _context.Portfolio.Where(x => x.AppUserId == user.Id)
                .Select(stock => new Stock
                {
                    Id = stock.StockId,
                    Symbol = stock.stock.Symbol,
                    CompanyName = stock.stock.CompanyName,
                    Purchase = stock.stock.Purchase,
                    MarketCap = stock.stock.MarketCap,
                    LastDiv = stock.stock.LastDiv,
                    Industry = stock.stock.Industry
                }).ToListAsync();
                
        }
    }
}
