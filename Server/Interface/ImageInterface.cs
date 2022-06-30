using BlazorApp.Shared.Models;

namespace BlazorApp.Server.Interface
{
    public interface ImageInterface
    {
        public List<Image> GetImages();
        public void AddImage(Image image);
    }
}
