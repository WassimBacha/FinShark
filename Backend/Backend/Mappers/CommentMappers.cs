using Backend.DTOS.Comment;
using Backend.Models;

namespace Backend.Mappers
{
    public static class CommentMappers
    {
        public static CommentDTO ToCommentDTO(this Comment commentModel)
        {
            return new CommentDTO
            {
                id = commentModel.id,
                Title = commentModel.Title,
                Content = commentModel.Content,
                CreatedOn = commentModel.CreatedOn,
                CreatedBy = commentModel.AppUser.UserName,
                StockId = commentModel.StockId,

                
            };
        }

        public static Comment ToCommentFromCreate(this CreateCommentDTO commentDTO , int StockId)
        {
            return new Comment
            {
               
                Title = commentDTO.Title,
                Content = commentDTO.Content,
                
                StockId = StockId,


            };
        }
        public static Comment ToCommentFromUpdate(this UpdateCommentRequestDTO commentDTO )
        {
            return new Comment
            {

                Title = commentDTO.Title,
                Content = commentDTO.Content,
               




            };
        }
    }
}
