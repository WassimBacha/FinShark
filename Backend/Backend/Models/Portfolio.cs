using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models //a join table between Stock and User Models 
{
    [Table("Portfolios")]
    public class Portfolio
    {
        public string AppUserId { get; set; }
        public int StockId { get; set; }
        public AppUser AppUser { get; set; }
        public Stock stock { get; set; }
    }
}
