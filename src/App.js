import React , {useState , useEffect} from 'react'
import './App.css'
import List from './Components/List'
import Alert from './Components/Alert'


const App = () => {

 const [name , setName] = useState('')
 const [list , setList] = useState([])
 const [isEditing , setIsEditing] = useState(false)
 const [editId , setEditId] = useState(null)
 const [alert , setAlert] = useState({
     show : false ,
     msg : '',
     type : ''})
 
 const handleSubmit = (e) => {
e.preventDefault()

if(!name){
  //alert
 showAlert(true , 'please enter value' , 'danger')
}

else if (name && isEditing){
  //alert
  setList(
    list.map((item)=> {
      if(item.id === editId){
        return {...item , title : name}
      }
      return item
    })
  )
  setName('')
  setEditId(null)
  setIsEditing(false)
  showAlert(true , 'value changed' , 'success')
}
else{
  showAlert(true , 'item added to the list' , 'success')
  const newItem = {id : new Date().getTime().toString() , title: name}
  setList([...list , newItem])
  setName('')
}
}



const showAlert = (show=false , msg='' ,type='') =>{
  setAlert({show , msg  , type})
}

const clearList = () => {
  showAlert(true , 'items cleared' , 'danger')
  setList([])
}

const removeItem = (id) => {
  showAlert(true , 'item removed' , 'danger')
setList(list.filter((item)=> item.id !== id))
}

const editItem = (id) => {
  const specificItem = list.find((item) => item.id === id)
  setIsEditing(true)
  setEditId(id)
  setName(specificItem.title)
}

  return (
  <section className='section-center'>
<form className='grocery-form' onSubmit={handleSubmit}>
{alert.show && <Alert {...alert} removeAlert={showAlert}></Alert>}
<h3>grocery bud</h3>
<div className='form-control'>
  <input type='text' className='grocery' placeholder='e.g eggs'
  value={name} onChange={(e) => setName(e.target.value)}></input>
  <button type='submit' className='submit-btn'>
    {isEditing ? 'edit' : 'submit'}
  </button>
</div>
</form>

{list.length > 0 &&(
  
    <div className='grocery-container'>
      <List items={list} removeItem={removeItem} editItem={editItem}></List>
      <button className='clear-btn' onClick={clearList}>clear items</button>
    </div>
)}
  </section>
    
  )
}

export default App
