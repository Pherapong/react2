import Transaction from "./components/Transaction";
import FormConponent from "./components/FormConponent";
import './App.css'
import { useState,useEffect} from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent"
import {BrowserRouter as Router,Routes,Switch,Route,Link} from "react-router-dom";

function App() {
  const desight = {color:"red",textAlign:"center",fontSize:'1.5rem'}
  
  const initData = [
    {id:1,title:"home",amount:-2000},
    {id:1,title:"income",amount:50000},
  ]
  const [items,setItems] = useState(initData)
  const [reportIncome,setReportIncome] = useState(0)
  const [reportExpense,setReportExpense] = useState(0)
  const onAddnewItem = (newItem) => {
      setItems((prevItem) =>{
        return [newItem,...prevItem]
      })
}
useEffect(()=>{
    const amounts = items.map(items=>items.amount)
    const income = amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0)
    const expense = (amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1
   setReportIncome(income.toFixed(2))
   setReportExpense(expense.toFixed(2))
},[items,reportIncome,reportExpense])
  return (
   <DataContext.Provider value={{income : reportIncome,expense : reportExpense}}>
     <div className="container"> 
        <h1 style={desight}>แอพบัญชีรายรับ - รายจ่าย</h1>
        <Router>
        <div>
          <ul className ="horizontal-menu">
            <li>
              <Link to="/">ข้อมูลบัญชี</Link>
            </li>
            <li>
              <Link to="/insert">บันทึกข้อมูล</Link>
            </li>
          </ul> 
         {/* <Routes>
            <Route path="/" exact>
               <ReportComponent/>
            </Route>
            <Route path="/insert">
               <FormConponent onAddItem = {onAddnewItem}/>
               <Transaction items = {items}/>
           </Route>
          </Routes> */}
        </div>
        </Router>
        <ReportComponent/>
        <FormConponent onAddItem = {onAddnewItem}/>
        <Transaction items = {items}/>
    </div> 
   </DataContext.Provider>  
    ); 
}

export default App;
