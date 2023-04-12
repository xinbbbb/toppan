import react, { useState } from 'react'
import './book.css'
import arrow from '../assets/arrow.svg'
import BookItemList from './BookItemList'

export default props => {
  
  const [activeBook, setActiveBook] = useState(-1)

  function handleBookClick(index) {
    activeBook === index ? setActiveBook(-1) : setActiveBook(index)
  }
  const bookList = props.bookList

  const generateBookContent = () => { 
    return bookList?.map((item, index) => {
      return (
        <div className='bookContainer' key={`book-item-${index + 1}`}>
  
          <div id={`book-item-${index + 1}`} 
            className={`inner-book ${activeBook === index ? 'book-toggle' : ''}`} 
            onClick={() => handleBookClick(index)}
          >         
            <span className='inner-title' data-title={item.name}>{index + 1} {item.name}</span>
            <span className='inner-author' data-title={item.author}>by {item.author}</span>
            <img className='arrow' src={arrow} alt="" />
          </div>
  
          <BookItemList isActive={activeBook === index} borrower={item.borrower}/>
        </div>
      )
    })
  }

  return (<div id="container">
    {
      bookList?.length > 0 ? 
      generateBookContent()
      :
      <div id='error-message'>No data found</div>
    }
  </div>)
}