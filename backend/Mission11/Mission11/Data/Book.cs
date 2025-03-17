using System.ComponentModel.DataAnnotations;

namespace Mission11.Data
{
    //model based off database table Books. Everything is required
    public class Book
    {
        [Key]
        [Required]
        public int BookId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Publisher { get; set; }
        [Required]
        public string ISBN { get; set; }
        [Required]
        public string Classification { get; set; }
        [Required]
        public int PageCount { get; set; }
        [Required]
        public double Price { get; set; }
    }
}
