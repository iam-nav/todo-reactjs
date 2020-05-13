import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
async function logoutUser() {
    const token = Cookies.get('user')
    axios.defaults.headers.common['Authorization'] = `Bearer${token}`
const result =   await axios({
     method: 'post',
     url: 'https://navjot-task-app.herokuapp.com/users/logout'
   })
   return result
}

export default logoutUser
