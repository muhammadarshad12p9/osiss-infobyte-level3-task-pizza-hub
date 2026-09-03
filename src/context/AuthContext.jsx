import {createContext,useContext,useState} from 'react';

export const DEFAULT_USERNAME = 'Arshid123@gmail.com';
export const DEFAULT_PASSWORD = 'Arshid123@123';
const USERS_KEY = 'pizza_users';
const SESSION_KEY = 'pizza_demo_user';
const C = createContext();

function getUsers(){
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
  catch { return []; }
}
function saveUsers(users){ localStorage.setItem(USERS_KEY, JSON.stringify(users)); }

export function AuthProvider({children}){
  const [user,setUser] = useState(()=>{
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
    catch { return null; }
  });

  function register(name,email,password){
    const cleanEmail=email.trim().toLowerCase();
    const users=getUsers();
    if(users.some(u=>u.email.toLowerCase()===cleanEmail)) return {ok:false,message:'An account with this email already exists.'};
    const newUser={name:name.trim(),email:cleanEmail,password,role:'customer'};
    saveUsers([...users,newUser]);
    return {ok:true,message:'Registration successful. You can now login.'};
  }

  function login(email,password){
    const cleanEmail=email.trim().toLowerCase();
    const users=getUsers();
    const demo={name:'Arshid',email:DEFAULT_USERNAME,password:DEFAULT_PASSWORD,role:'admin'};
    const found=users.find(u=>u.email.toLowerCase()===cleanEmail && u.password===password) ||
      (cleanEmail===demo.email.toLowerCase() && password===demo.password ? demo : null);
    if(!found) return {ok:false,message:'Invalid email or password.'};
    const session={name:found.name,email:found.email,role:found.role};
    localStorage.setItem(SESSION_KEY,JSON.stringify(session));
    setUser(session);
    return {ok:true};
  }

  function logout(){localStorage.removeItem(SESSION_KEY);setUser(null);}
  return <C.Provider value={{user,login,register,logout}}>{children}</C.Provider>;
}
export const useAuth=()=>useContext(C);
