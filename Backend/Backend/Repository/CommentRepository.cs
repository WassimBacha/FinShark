using Backend.Data;
using Backend.Helpers;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;
        public CommentRepository(ApplicationDBContext context)
        {
           _context = context;
        
    }

        public async Task<Comment> CreateAsync(Comment commentmodel)
        {
            await _context.Comments.AddAsync(commentmodel);
            await _context.SaveChangesAsync();
            return commentmodel;
        }

        public async Task<Comment> DeleteAsync(int id)
        {
            var commentmodel = await _context.Comments.FirstOrDefaultAsync(x => x.id == id);
            if (commentmodel == null)
            {
                return null;
            }
            _context.Comments.Remove(commentmodel);
            await _context.SaveChangesAsync();
            return commentmodel;
        }

        public async Task<List<Comment>> GetAllAsync(CommentQueryObject CommentQueryObject)
        {
            var comments = _context.Comments.Include(a => a.AppUser).AsQueryable();
            if (!string.IsNullOrWhiteSpace(CommentQueryObject.Symbol))
            {
                comments = comments.Where(s=>s.Stock.Symbol == CommentQueryObject.Symbol);
            };
            if(CommentQueryObject.IsDecsending == true)
            {
                comments = comments.OrderByDescending(s => s.CreatedOn);
            }
              return await   comments.ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _context.Comments.Include(a => a.AppUser).FirstOrDefaultAsync(c => c.id == id);
        }

        public async Task<Comment?> UpdateAsync(int id, Comment commentmodel)
        {
            var ExistingComment = await _context.Comments.FindAsync(id);

            if (ExistingComment == null)
            {
                return null;
            }
            ExistingComment.Title = commentmodel.Title;
            ExistingComment.Content = commentmodel.Content;
            
            await _context.SaveChangesAsync();
            return ExistingComment;

        }
    }
}
