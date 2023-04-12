import { useState } from 'react'

const style = {
  backgroundColor: "#F6ECEC",
  border: "1px solid #D46767",
  height: "47px",
  width: "173px",
  borderRadius: "4px",
  fontSize: "18px",
  position: 'absolute',
  top: '25px',
  left: '25px',
}
export default props => {
  const [country, setCountry] = useState(undefined)
  async function handleClick() {
    
    // fetchCountry()
    try {
      const response = await fetch('/api/getRandomCountry')
      if(response.ok) {

        const { country } = await response.json();
        setCountry(country.country_code)
        props.trigger(country.country_code)

      } else {
        throw new Error(JSON.stringify({ code: response.status, message: response.statusText }))
      }
    } catch (error) {
      alert(error)
    }
  }

  return (<button id="action-btn" disabled={props.isLoading} style={style} onClick={handleClick}>Get country: {country}</button>)
}