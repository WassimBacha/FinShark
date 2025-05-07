using Backend.DTOS.Comment;
using Backend.DTOS.Stock;
using Backend.Helpers;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllAsync(CommentQueryObject CommentQueryObject);
        Task<Comment?> GetByIdAsync(int id);

        Task<Comment> CreateAsync(Comment commentmodel);

        Task<Comment?> UpdateAsync(int id, Comment commentmodel);
        Task<Comment> DeleteAsync(int id);


    }
}
