using Backend.DTOS.Stock;
using Backend.Models;

namespace Backend.Mappers
{
    public static class StockMappers
    {
        public static StockDTO ToStockDTO(this Stock stockModel)
        {
            return new StockDTO
            {
                Id = stockModel.Id,
                CompanyName = stockModel.CompanyName,
                Industry = stockModel.Industry,
                Symbol = stockModel.Symbol,
                MarketCap = stockModel.MarketCap,
                LastDiv = stockModel.LastDiv,
                Purchase = stockModel.Purchase,
                Comments = stockModel.Comments.Select(x => x.ToCommentDTO()).ToList(),

            };

        }
       
        public static Stock ToStockFromFMP(this FMPStock fmpStock)
        {
            return new Stock
            {
                Symbol = fmpStock.symbol,
                CompanyName = fmpStock.companyName,
                Purchase = (decimal)fmpStock.price,
                LastDiv = (decimal)fmpStock.lastDiv,
                Industry = fmpStock.industry,
                MarketCap = fmpStock.mktCap
            };
        }

        public static Stock ToStockFromCreateDTO(this  CreateStockRequestDTO stockDto)
        {
            return new Stock
            {
                Symbol = stockDto.Symbol,
                MarketCap = stockDto.MarketCap,
                CompanyName = stockDto.CompanyName,
                Purchase = stockDto.Purchase,
                LastDiv = stockDto.LastDiv,
                Industry = stockDto.Industry,


            };
        }
    }
}
