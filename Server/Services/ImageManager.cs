using BlazorApp.Shared.Models;
using BlazorApp.Server.Interface;
using BlazorApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BlazorApp.Server.Services
{
    public class ImageManager : ImageInterface
    {
        private readonly ImageDatabaseContext _dbContext;
        public ImageManager(ImageDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Image> GetImages()
        {
            try
            {
                return _dbContext.image.ToList();
            }
            catch
            {
                throw;
            }
        }

        public void AddImage(Image image)
        {
            try
            {
                _dbContext.image.Add(image);
                _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

    }
}
