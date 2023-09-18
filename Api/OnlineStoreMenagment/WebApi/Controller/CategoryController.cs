using Domain.Entites;
using Domain.Interfaces.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public ActionResult<List<Category>> GetAll()
        {
            return _categoryService.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<Category> GetCategoryById(string id)
        {
            var category = _categoryService.GetById(id);
            return category is null ? NotFound(String.Format("Category with id {0} could not be found", id)) : Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<Category>> AddCategory([FromBody] Category dto)
        {
            var category = await _categoryService.Add(dto);
            return category is null ? BadRequest("There has been problem while saving Category") : Ok(category);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveCateogory(string id)
        {
            var ok = await _categoryService.Remove(id);
            return ok == true ? Ok() : BadRequest("There has been problem while removing Category");
        }
    }
}
