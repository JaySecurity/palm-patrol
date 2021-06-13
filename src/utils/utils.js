import axios from 'axios'

export const verifyToken(token){
  try {
    let res = await axios.post('/api/users/verify', token)
    
  } catch (e) {
    
  }
}