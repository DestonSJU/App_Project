import logo from './logo.svg';
import './App.css';
import Card from './Card'
import SearchBar from "./SearchBar";

//functional component
function App( ) {
//defining CSS styling in a variable
  const styles = {
    div1: {
      backgroundColor: 'grey',
      color: 'lightyellow',
      border: '3px dotted lightblue'
    },
    header1: {
      color: 'black'
    }
  }
//the data: an array of objects
  const products = [
    {
      id: 1,
      name: 'Crest extra fluoride',
      price: 2.99,
    },
    {
      id: 2,
      name: 'Arm & Hammer',
      price: 2.50,
    },
    {
      id: 3,
      name: 'Colgate Fresh',
      price: 3.50,
    }
  ]
  return (
//applying styling
      <div style={styles.div1}>
        <h1 style={styles.header1}>Welcome to Amazon.com</h1>
        <SearchBar />
        <div>
          {products.map((product) => (
              <Card key={product.id} name={product.name}
                    price={product.price}/>
          ))}
        </div>
      </div>
  )
}
export default App
