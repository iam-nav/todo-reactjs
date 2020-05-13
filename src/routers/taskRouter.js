import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'


// export function fetchTask(){
//     const token = Cookies.get('user')
//   const url ="http://localhost:3001/tasks"
//   const data =  fetch(url, 
//     {method:'GET',
//      headers: {'Authorization': `Bearer${token}`}
//     }).then(result => result.json())
//     .then((result=> this.setState({'tasks':result})))
//     .catch(error=>console.log("error"+error))
// }


 export async function deleteTask(id){
    const token = Cookies.get('user')
    axios.defaults.headers.common['Authorization'] = `Bearer${token}`
    await axios({
      method: 'delete',
      url: 'http://localhost:3001/tasks/'+id,
    })
}

export async function completTask(id,event){
  const token = Cookies.get('user')
  axios.defaults.headers.common['Authorization'] = `Bearer${token}`
  axios({
   method: 'patch',
   url: 'http://localhost:3001/tasks/'+id,
   data: {
    completed:event.target.checked
   }
 })
}

export async function taskSend(task){
const token = Cookies.get('user')
axios.defaults.headers.common['Authorization'] = `Bearer${token}`
await axios({
  method: 'post',
  url: 'http://localhost:3001/tasks',
  data: {
   description:task
  }
})
}

export async function TaskFetch(){
  const token = Cookies.get('user')
  const url ="http://localhost:3001/tasks"
  const data = await fetch(url, 
    {method:'GET',
     headers: {'Authorization': `Bearer${token}`}
    })
}

// {deleteTask:deletTask}