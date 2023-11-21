import './App.css'
import PayCard from './components/Paycard'
function App() {
  

  return (
    <>
    <div className="header">
      <h1>Payment page</h1>
    </div>
      
    <div className="center">
    <PayCard name={"Nike Black T-shirt"} description="Payment for Nike Black T-Shirt" price={500} imgSrc="src/assets/T-shirt.jpg"/>
    
    </div>
      
    </>
  )
}

export default App
