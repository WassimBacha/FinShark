using Backend.Data;
using Backend.DTOS.Stock;
using Backend.Helpers;
using Backend.Interfaces;
using Backend.Mappers;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDBContext _context;
        public StockRepository(ApplicationDBContext context)
        {
            _context = context; 
        }

        public async Task<Stock> CreateAsync(Stock StockModel)
        {
            await _context.Stocks.AddAsync(StockModel);
            await _context.SaveChangesAsync();
            return StockModel;
        }

        public async Task<Stock?> DeleteAsync(int id)
        {
            var StockModel = await _context.Stocks.FirstOrDefaultAsync(x=>x.Id == id);
            if (StockModel == null)
            {
                return null;
            }
            _context.Stocks.Remove(StockModel);
            await _context.SaveChangesAsync();
            return StockModel;
        }

        public async Task<List<Stock>> GetAllAsync(QueryObject query)
        {

             var stocks = _context.Stocks.Include(c => c.Comments).ThenInclude(c => c.AppUser).AsQueryable();
            if (!string.IsNullOrWhiteSpace(query.CompanyName))
            {
                stocks = stocks.Where(x => x.CompanyName.Contains(query.CompanyName));

            }
            if (!string.IsNullOrWhiteSpace(query.Symbol))
            {
                stocks = stocks.Where(x => x.Symbol.Contains(query.Symbol));
            }
            
            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                    stocks = query.isDecsending ? stocks.OrderByDescending(x => x.Symbol) : stocks.OrderBy(x => x.Symbol);

                }
                
               
               
            }
            var SkipNumber = (query.PageNumber - 1) * query.PageSize;
            return await stocks.Skip(SkipNumber).Take(query.PageSize).ToListAsync();

        }

        public async Task<Stock?> GetByIdAsync(int id)
        {
            return await _context.Stocks.Include(c => c.Comments).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Stock?> GetBySymbolAsync(string symbol)
        {
            return await _context.Stocks.FirstOrDefaultAsync(x => x.Symbol == symbol);
        }

        public Task<bool> StockExists(int id)
        {
            return _context.Stocks.AnyAsync(s=>s.Id == id); 
        }

        public async Task<Stock?> UpdateAsync(int id, UpdateStockRequestDTO StockDTO)
        {
            var existingStock = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);
            if (existingStock == null)
            {
                return null;
            }
            existingStock.Symbol = StockDTO.Symbol;
            existingStock.CompanyName = StockDTO.CompanyName;
            existingStock.Purchase = StockDTO.Purchase;
            existingStock.MarketCap = StockDTO.MarketCap;
            existingStock.LastDiv = StockDTO.LastDiv;
            existingStock.Industry = StockDTO.Industry;
            await _context.SaveChangesAsync();

            return existingStock;
        }
    }
}
