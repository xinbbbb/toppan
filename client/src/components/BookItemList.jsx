import react, { useState, useEffect } from 'react'

export default props => {
  
  return (
    props.isActive && props.borrower.map(item =>{
      return <div key={item} className='customer'>{item}</div>
    })
  )
}