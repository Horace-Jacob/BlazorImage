using BlazorApp.Server.Interface;
using BlazorApp.Shared.Models;
using Microsoft.AspNetCore.Http;
using BlazorApp.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlazorApp.Server.Controllers
{
    [Route("images")]
    [ApiController]
    public class ImageController : Controller
    {
        private readonly ImageInterface _IImage;
        private readonly ImageDatabaseContext _dbContext;

        public ImageController(ImageInterface iImage, ImageDatabaseContext dbContext)
        {
            _IImage = iImage;
            _dbContext = dbContext;
        }

        
        [HttpGet]
        public async Task<ActionResult<List<Image>>> GetSpecials()
        {
            return _IImage.GetImages().ToList();
        }

        [HttpPost]
        public void AddImage(Image image)
        {
            _IImage.AddImage(image);

        }
    }
}
