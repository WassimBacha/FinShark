using Backend.DTOS.Comment;
using Backend.Extensions;
using Backend.Helpers;
using Backend.Interfaces;
using Backend.Mappers;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("Backend/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly IStockRepository _StockRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IFMPService _fmpService;
        public CommentController(ICommentRepository commentRepo,
            IStockRepository stockRepo,
            UserManager<AppUser> userManager,
            IFMPService fmpService)
        {
            _commentRepo = commentRepo;
            _StockRepo = stockRepo;
            _userManager = userManager;
            _fmpService = fmpService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery]CommentQueryObject CommentQueryObject)
        {
            if(!ModelState.IsValid) {
                return BadRequest(ModelState);
            }
            var comments = await _commentRepo.GetAllAsync(CommentQueryObject);
            var CommentDTO = comments.Select(s => s.ToCommentDTO());
            return Ok(CommentDTO);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var comments = await _commentRepo.GetByIdAsync(id);
            if (comments == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(comments.ToCommentDTO());
            }
        }
        [HttpPost("{Symbol:alpha}")]
        public async Task<IActionResult> Create([FromRoute] string Symbol, CreateCommentDTO commentDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var Stock = await _StockRepo.GetBySymbolAsync(Symbol);
            if (Stock == null)
            {
                Stock = await _fmpService.FindStockBySymbolAsync(Symbol); 
                if (Stock == null) {
                    return BadRequest("Stock not found");
                }else
                {
                    await _StockRepo.CreateAsync(Stock);
                }
            }
            var username = User.GetUsername();
            var appuser = await _userManager.FindByNameAsync(username);
            var commentmodel = commentDTO.ToCommentFromCreate(Stock.Id);
            commentmodel.AppUserId = appuser.Id;
            await _commentRepo.CreateAsync(commentmodel);
            return CreatedAtAction(nameof(GetById), new { id = commentmodel.id }, commentmodel.ToCommentDTO());

        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var commentModel = await _commentRepo.DeleteAsync(id);
            if (commentModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDTO updateDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var comment = await _commentRepo.UpdateAsync(id, updateDTO.ToCommentFromUpdate());
            if (comment == null)
            {
                NotFound("Comment not found");
            }
            return Ok(comment.ToCommentDTO());
        }

    }
}
