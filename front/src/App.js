import React, {useState, useEffect} from "react";
import './App.css';
import Axios from "axios";
import Item from './components/item';

function App() {
    const [items, setItems] = useState();
    const [sumItems, setSumItems] = useState();

    useEffect(() => {
        Axios.get("http://localhost:3001/items").then((response) => {
            setItems(response.data);
        })
    }, []);
    
    useEffect(() => {
        Axios.get("http://localhost:3001/sum").then((response) => {
            setSumItems(response.data);
        })
    }, []);

    console.log(typeof(sumItems));

    return (
        <div className="App">
            <h1>Carrinho</h1>
            <table>
                <tr>
                    <th>NOMES</th>
                    <th>PRECOS</th>
                </tr>
                {typeof items !== "undefined" && items.map((value) => {
                    return <Item
                    name = {value.nome}
                    price = {value.preco}
                    ></Item>
                })}
                {typeof sumItems !== "undefined" && sumItems.map((value) => {
                    return <div className="Sum">
                        <p>valor total: {value.total}</p>
                    </div>
                })}
            </table>
        </div>
    );


}

export default App;
