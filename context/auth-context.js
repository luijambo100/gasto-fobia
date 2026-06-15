"use client"

import {
createContext,
useContext,
useEffect,
useState
}
from "react"

const AuthContext =
createContext()

export function AuthProvider({
children
}){

const[
usuario,
setUsuario
]=useState(null)

useEffect(()=>{

const saved=
localStorage.getItem(
"usuario"
)

if(saved){

setUsuario(
JSON.parse(saved)
)

}

},[])

function register({

nombre,

email,

password

}){

const users=

JSON.parse(

localStorage.getItem(
"usuarios"
)

||

"[]"

)

const exists=

users.find(

u=>

u.email===email

)

if(exists){

return{

ok:false,

error:
"Correo ya registrado"

}

}

users.push({

nombre,

email,

password

})

localStorage.setItem(

"usuarios",

JSON.stringify(
users
)

)

return{

ok:true

}

}

function login({

email,

password

}){

const users=

JSON.parse(

localStorage.getItem(
"usuarios"
)

||

"[]"

)

const user=

users.find(

u=>

u.email===email

&&

u.password===password

)

if(!user){

return false

}

localStorage.setItem(

"usuario",

JSON.stringify(
user
)

)

setUsuario(
user
)

return true

}

function logout(){

localStorage.removeItem(
"usuario"
)

setUsuario(
null
)

}

return(

<AuthContext.Provider

value={{

usuario,

register,

login,

logout

}}

>

{children}

</AuthContext.Provider>

)

}

export function useAuth(){

return useContext(
AuthContext
)
}