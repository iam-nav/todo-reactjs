import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

 export async function deleteTask(id){
    const token = Cookies.get('user')
    axios.defaults.headers.common['Authorization'] = `Bearer${token}`
    await axios({
      method: 'delete',
      url: '/tasks/'+id,
    })
}

export async function completTask(id,event){
  const token = Cookies.get('user')
  axios.defaults.headers.common['Authorization'] = `Bearer${token}`
  axios({
   method: 'patch',
   url: '/tasks/'+id,
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
  url: '/tasks',
  data: {
   description:task
  }
})
}

export async function TaskFetch(){
  const token = Cookies.get('user')
  const url ="/tasks"
  const data = await fetch(url, 
    {method:'GET',
     headers: {'Authorization': `Bearer${token}`}
    })
}

// {deleteTask:deletTask}