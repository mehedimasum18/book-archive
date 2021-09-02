document.getElementById("error_massage").style.display = 'none';
document.getElementById("load_spinner").style.display = 'none';

const searchBook = () => {
        document.getElementById('total_books').textContent = '';
    const searchField = document.getElementById("search_field");
    const searchText = searchField.value;
    // clear search field 
    searchField.value = '';  
    // handle empty search request 
    if (searchText === '') {
        
        window.alert("Please write a book name")
        
    }
    else
    {
         // display spinner 
        document.getElementById("load_spinner").style.display = 'block';
       
        // hide error
        document.getElementById("error_massage").style.display = 'none';
      
        // clear search result
        document.getElementById("search_result").textContent = '';
        
        // load book data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBookSearchResult(data))
    }
}
// Display search result 
const displayBookSearchResult = (data) => {
    console.log(data)
    
    document.getElementById('total_books').textContent = '';
    const searchResult = document.getElementById('search_result');
    document.getElementById('search_result').textContent = "";
    const bookList = data.numFound;
    const datas = data.docs;
    // console.log(datas);
    if (datas.length == 0) {
        window.alert("Oopps!! No result found")
        document.getElementById("load_spinner").style.display = 'none';

    } else {    
        document.getElementById("error_massage").style.display = 'none';
        document.getElementById("load_spinner").style.display = 'none';
        document.getElementById('total_books').innerText = `About ${bookList} results found`;
        
        datas.forEach(book => {
          const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : "No picture found"}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="book_name">Book Name: ${book.title}</h3>
                <h4 class="author">Author: ${book.author_name}</h4>
                <h5 class="Publisher">Publisher: ${book.publisher}</h5>
                <h5 class="card-title">First Publish Date: ${book.first_publish_year}</h5>
                <p class="card-text"></p>
            </div>
            <div class="card-footer">
                <button class="btn btn-outline-dark"> Read More </button> 
            </div>
         </div>
     `
        searchResult.appendChild(div);  
    });
    }
   
}