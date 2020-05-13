import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

 export async function deleteTask(id){
    const token = Cookies.get('user')
    axios.defaults.headers.common['Authorization'] = `Bearer${token}`
    await axios({
      method: 'delete',
      url: 'https://navjot-task-app.herokuapp.com/tasks/'+id,
    })
}

export async function completTask(id,event){
  const token = Cookies.get('user')
  axios.defaults.headers.common['Authorization'] = `Bearer${token}`
  axios({
   method: 'patch',
   url: 'https://navjot-task-app.herokuapp.com/tasks/'+id,
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
  url: 'https://navjot-task-app.herokuapp.com/tasks',
  data: {
   description:task
  }
})
}

export async function TaskFetch(){
  const token = Cookies.get('user')
  const url ="https://navjot-task-app.herokuapp.com/tasks"
  const data = await fetch(url, 
    {method:'GET',
     headers: {'Authorization': `Bearer${token}`}
    })
}

// {deleteTask:deletTask}