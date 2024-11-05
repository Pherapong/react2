import Transaction from "./components/Transaction";
import FormConponent from "./components/FormConponent";
import './App.css'
import { useState,useEffect,useReducer} from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";
function App() {
  const desight = {color:"red",textAlign:"center",fontSize:'1.5rem'}

  // const initState = [
  //       {id:1,title:"รายได้",amount:150000},
  //       {id:2,title:"ค่าเช่า",amount:-5000},
  // ]
  
  const [items,setItems] = useState([])

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
   setReportIncome(income)
   setReportExpense(expense)
},[items,reportIncome,reportExpense])

    //reducer state
    const [showReport,setShowReport] = useState(false)
    const reducer = (state,action)=>{
        switch(action.type){
          case "SHOW" :
            return setShowReport(true)
          case "HIDE" :
            return setShowReport(false)
        }
    }
  const [result,dispatch] = useReducer(reducer,showReport)
  return (
   <DataContext.Provider value={
    {
      income : reportIncome,
      expense : reportExpense
    }
   }>
     <div className="container"> 
        <h1 style={desight}>แอพบัญชีรายรับ - รายจ่าย</h1>
        {showReport && <ReportComponent/>}
        <FormConponent onAddItem = {onAddnewItem}/>
        <Transaction items = {items}/>
      <h1>{result}</h1>
      <button onClick={()=>dispatch({type:"SHOW"})}>แสดง</button>
      <button onClick={()=>dispatch({type:"HIDE"})}>ซ่อน</button>
    </div> 
   </DataContext.Provider>  
    ); 
}

export default App;
