import { useState } from 'react'
import './App.css'
import Country from './components/Country'
import BookList from './components/BookList'
import { tmp } from './components/getTop3ReadBook.js'

function App() {

  const [bookList, setBookList] = useState(tmp)
  const [isLoading, setIsLoading] = useState(false)

  async function handleTrigger(e) {
    setIsLoading(true)
    //fetch book
    try {
      const response = await fetch(`/api/getTop3ReadBook?country=${e}`)
      const result = await response.json();
      
      if(response.ok) {
        setBookList(result.data)
      } else {
        throw new Error(JSON.stringify(result))
      }
      setIsLoading(false)

    } catch (error) {
      alert(error)
    }
  } 
 
  return (
    <div className="App">
      <Country trigger={handleTrigger} isLoading={isLoading}/>
      <BookList bookList={bookList} />      
    </div>
  )
}

export default App
