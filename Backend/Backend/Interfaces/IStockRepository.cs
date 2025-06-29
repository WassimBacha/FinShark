﻿using Backend.Models;
using Backend.DTOS.Stock;
using Backend.Helpers;

namespace Backend.Interfaces
{
    public interface IStockRepository
    {
        Task<List<Stock>> GetAllAsync(QueryObject query);
        Task<Stock?> GetByIdAsync(int id);
        Task<Stock?> GetBySymbolAsync(string symbol);
        Task<Stock> CreateAsync(Stock StockModel);
        Task<Stock?> UpdateAsync(int id , UpdateStockRequestDTO StockDTO);
        Task <Stock?> DeleteAsync(int id);
        Task<bool> StockExists(int id);
    
        
    }
}
