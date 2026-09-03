import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {useAuth,DEFAULT_USERNAME,DEFAULT_PASSWORD} from '../context/AuthContext';
export default function Login(){
 const [email,setEmail]=useState(DEFAULT_USERNAME),[password,setPassword]=useState(DEFAULT_PASSWORD),[msg,setMsg]=useState('');
 const {login}=useAuth(); const nav=useNavigate();
 function submit(e){e.preventDefault();const r=login(email,password);if(r.ok)nav('/dashboard');else setMsg(r.message)}
 return <section className="card auth"><h1>Welcome to PizzaHub</h1><p>Login to build your pizza and manage your orders.</p><form onSubmit={submit}><label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/><label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/><button type="submit">Login</button></form>{msg&&<p className="error">{msg}</p>}<div className="demo"><b>Demo Login</b><small>Email: {DEFAULT_USERNAME}</small><small>Password: {DEFAULT_PASSWORD}</small></div><p><Link to="/register">Create a new account</Link> · <Link to="/forgot">Forgot password?</Link></p><p className="muted">React-only authentication — no MongoDB or backend required.</p></section>
}
