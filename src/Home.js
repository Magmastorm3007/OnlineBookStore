import React,{useState,useEffect} from "react";
import "./Home.css";
import Product from "./Product";
import ReactPaginate from 'react-paginate';
import { trackPromise } from 'react-promise-tracker';
import { fetchWithDelay } from './fetch';
import axios from "axios";
import BounceLoader from 'react-spinners/BounceLoader'
function Home({list,SetList}) {
    const [loading,setLoading]=useState(true)
  const [books,SetBooks]=useState([
    {title: '',
    description:'',
    image: '',
    author:'',
    price:'',
    isbn:'',
    stars:''
  
  }
])
function handlePageClick({ selected: selectedPage }) {
  setCurrentPage(selectedPage);
}

useEffect(()=>{
 
    fetch('/api/book').then(res=>{
        if(res.ok){
          setLoading(false)

     return res.json()
        }


    }).then(js=>SetBooks(js))
    console.log(list)

    
},[list])

const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 4;
  const offset = currentPage * PER_PAGE;
 const pageCount =books?Math.ceil(books.length / PER_PAGE):1;


  return (
    
 
   <div className="home">
    
  
    {  loading?<div class="text-center"  >
  <div className="spinner-border "   role="status">

  </div>
</div>:
      <div className="home__container">

        <img
          className="home__image"
          src="https://manojchahar.com/wp-content/uploads/2020/10/becca-tapert-Gn.jpg"
          alt=""
        />

<div class="row">
{books.slice(offset, offset + PER_PAGE).filter(book => {
    if (list=== '') {
      return book;
      
    
    } else if (book.title.toLowerCase().includes(list.toLowerCase())) {
      return book;
    }
  })
.map(book=>

<div class="col-3">
 <div className="card" >
          <Product
             isbn={book.isbn}
            id={book.id}
            title={book.title}
            price={parseInt(book.price)}
            rating={parseInt(book.stars)}
            image={book.image}
            author={book.author}

          />
<h1></h1>

        </div>
        </div>
       
        )}
         </div>
         <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />

      </div>
}
    </div>
  );
}

export default Home;
