using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.Data;

namespace Mission11.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        //display book records from database
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? bookTypes = null) //by default, display 5 books per page
        {
            //number of books in the database
            var query = _bookContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(p => bookTypes.Contains(p.Classification));
            }

            var totalNumBooks = query.Count();

            //list of books to display depending on page number and page size
            var bookList = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize) //get the first five
                .ToList();

            //create an object to hold books and total number of books to return
            var thingsToPass = new
            {
                Books = bookList,
                TotalBooks = totalNumBooks
            };

            //return the thing to pass
            return Ok(thingsToPass);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(p => p.Classification)
                .Distinct()
                .ToList();
            return Ok(bookTypes);
        }
    }
}
