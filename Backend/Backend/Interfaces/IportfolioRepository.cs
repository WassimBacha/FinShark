using Backend.Models;

namespace Backend.Interfaces
{
    public interface IportfolioRepository
    {
        Task<List<Stock>> GetUserPortfolio(AppUser user);
        Task<Portfolio> CreatePortfolio(Portfolio portfolio);
        Task<Portfolio> DeletePortfolioAsync(AppUser user ,string symbol);
    }
}
