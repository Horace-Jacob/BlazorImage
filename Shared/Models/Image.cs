using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlazorApp.Shared.Models
{
    public class Image
    {
        public int ImageId { get; set; }
        public string? Base64String { get; set; }
        public string? FileSize { get; set; }
        public string? FileName { get; set; }

        public string? ContentType { get; set; }
    }
}
