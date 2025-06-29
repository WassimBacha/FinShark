﻿namespace Backend.DTOS.Comment
{
    public class CommentDTO
    {
        public int id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;

        public string CreatedBy { get; set; } = string.Empty;
        public int? StockId { get; set; }
       
    }
}
