﻿using Backend.DTOS.Comment;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.DTOS.Stock
{
    public class StockDTO
    {
        public int Id { get; set; }
        public string Symbol { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;

        
        public decimal Purchase { get; set; }

        
        public decimal LastDiv { get; set; }

        public string Industry { get; set; } = string.Empty;
        public long MarketCap { get; set; }
        public List<CommentDTO> Comments { get; set; }
    }
}
