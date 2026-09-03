import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const products = [
  {id:1,name:'Pepperoni Feast',desc:'Loaded with pepperoni, mozzarella & tomato sauce',price:899,cat:'Popular',img:'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=85',rating:4.8,time:'25-30 min'},
  {id:2,name:'Margherita Classic',desc:'Fresh mozzarella, basil and rich tomato sauce',price:699,cat:'Pizza',img:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85',rating:4.7,time:'20-25 min'},
  {id:3,name:'Chicken Tikka',desc:'Spicy tikka chicken, onions, peppers & cheese',price:949,cat:'Chicken',img:'https://images.unsplash.com/photo-1593560708920-61dd98c8c3b2?auto=format&fit=crop&w=900&q=85',rating:4.9,time:'25-30 min'},
  {id:4,name:'Cheese Burst',desc:'Creamy cheese-filled crust with extra mozzarella',price:999,cat:'Popular',img:'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85',rating:4.8,time:'25-35 min'},
  {id:5,name:'Veggie Supreme',desc:'Mushrooms, olives, capsicum, corn & onions',price:799,cat:'Vegetarian',img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85',rating:4.6,time:'20-25 min'},
  {id:6,name:'BBQ Chicken',desc:'BBQ chicken, onions, smoky sauce & mozzarella',price:929,cat:'Chicken',img:'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=900&q=85',rating:4.8,time:'25-30 min'},
  {id:7,name:'Fajita Pizza',desc:'Chicken fajita, jalapeño, onions and peppers',price:899,cat:'Chicken',img:'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=85',rating:4.7,time:'25-30 min'},
  {id:8,name:'Four Cheese',desc:'Mozzarella, cheddar, parmesan and creamy cheese',price:899,cat:'Pizza',img:'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85',rating:4.6,time:'20-25 min'},
  {id:9,name:'Garlic Bread',desc:'Warm, buttery garlic bread with herbs',price:349,cat:'Sides',img:'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=900&q=85',rating:4.7,time:'15-20 min'},
  {id:10,name:'Loaded Fries',desc:'Crispy fries with cheese, chicken & sauces',price:449,cat:'Sides',img:'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=85',rating:4.5,time:'15-20 min'},
  {id:11,name:'Chocolate Lava',desc:'Warm chocolate cake with a molten center',price:399,cat:'Dessert',img:'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85',rating:4.9,time:'15-20 min'},
  {id:12,name:'Cold Drink',desc:'Chilled refreshing drink to complete your meal',price:199,cat:'Drinks',img:'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85',rating:4.4,time:'10-15 min'},
];

const categories = [
  ['All','🍽️'],['Popular','🔥'],['Pizza','🍕'],['Chicken','🍗'],['Vegetarian','🥗'],['Sides','🍟'],['Dessert','🍫'],['Drinks','🥤']
];

export default function Dashboard(){
  const {user}=useAuth();
  const [category,setCategory]=useState('All');
  const [search,setSearch]=useState('');
  const [cart,setCart]=useState([]);
  const [showCart,setShowCart]=useState(false);
  const [checkout,setCheckout]=useState(false);
  const [address,setAddress]=useState('');
  const [phone,setPhone]=useState('');
  const [message,setMessage]=useState('');
  const [orders,setOrders]=useState(()=>JSON.parse(localStorage.getItem('pizza_orders')||'[]'));

  const filtered=useMemo(()=>products.filter(p=>(category==='All'||p.cat===category)&&`${p.name} ${p.desc}`.toLowerCase().includes(search.toLowerCase())),[category,search]);
  const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const delivery=subtotal?99:0;
  const total=subtotal+delivery;
  const count=cart.reduce((s,i)=>s+i.qty,0);

  function add(product){setCart(c=>{const found=c.find(i=>i.id===product.id);return found?c.map(i=>i.id===product.id?{...i,qty:i.qty+1}:i):[...c,{...product,qty:1}]});setMessage(`${product.name} added to cart`);setTimeout(()=>setMessage(''),1800)}
  function change(id,delta){setCart(c=>c.map(i=>i.id===id?{...i,qty:i.qty+delta}:i).filter(i=>i.qty>0))}
  function placeOrder(e){e.preventDefault();if(!address.trim()||!phone.trim())return;const order={id:Date.now(),customer:user.name,items:cart,total,status:'Order Received',address,phone,createdAt:new Date().toLocaleString()};const next=[order,...orders];setOrders(next);localStorage.setItem('pizza_orders',JSON.stringify(next));setCart([]);setCheckout(false);setShowCart(false);setAddress('');setPhone('');setMessage('🎉 Order placed successfully!');setTimeout(()=>setMessage(''),3000)}

  return <div className="shop">
    <section className="hero-shop">
      <div className="hero-copy"><span className="pill">⚡ FAST DELIVERY • FRESH EVERY TIME</span><h1>Craving something<br/><span>delicious?</span></h1><p>Order your favourite pizza, sides and desserts from PizzaHub. Freshly prepared and delivered to your door.</p><div className="hero-actions"><button onClick={()=>document.getElementById('menu')?.scrollIntoView({behavior:'smooth'})}>Order Now <span>→</span></button><div className="trust"><b>⭐ 4.8</b><span>10k+ happy customers</span></div></div></div>
      <div className="hero-image"><img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=90" alt="Fresh pizza"/><div className="floating-card"><b>🔥 Best Seller</b><span>Pepperoni Feast</span><strong>Rs. 899</strong></div></div>
    </section>

    <div className="promo-row"><div><b>🚴 Free delivery</b><span>On orders above Rs. 1,500</span></div><div><b>🎁 20% OFF</b><span>Use code: PIZZA20</span></div><div><b>💳 Easy payment</b><span>Cash or online</span></div></div>

    <section className="menu-section" id="menu">
      <div className="section-heading"><div><p className="eyebrow">EXPLORE OUR MENU</p><h2>What are you craving?</h2></div><div className="search-box">🔍<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search pizza, sides..."/></div></div>
      <div className="categories">{categories.map(([name,icon])=><button key={name} className={category===name?'cat-active':''} onClick={()=>setCategory(name)}><span>{icon}</span>{name}</button>)}</div>
      <div className="product-grid">{filtered.map(p=><article className="food-card" key={p.id}><div className="food-img"><img src={p.img} alt={p.name}/><span className="rating">★ {p.rating}</span></div><div className="food-body"><div className="food-title"><h3>{p.name}</h3><b>Rs. {p.price}</b></div><p>{p.desc}</p><div className="food-meta"><span>⏱ {p.time}</span><button onClick={()=>add(p)}>+ Add</button></div></div></article>)}</div>
      {!filtered.length&&<div className="empty"><div>🍕</div><h3>No items found</h3><p>Try another search or category.</p></div>}
    </section>

    <section className="why"><div><p className="eyebrow">WHY PIZZAHUB?</p><h2>Good food. Great mood.</h2><p>Everything you need for a simple, fast and delicious food-ordering experience.</p></div><div className="why-grid"><div>🍕<b>Freshly made</b><span>Prepared after you order.</span></div><div>⚡<b>Fast delivery</b><span>Hot food at your doorstep.</span></div><div>💯<b>Quality first</b><span>Premium ingredients every day.</span></div></div></section>

    {orders.length>0&&<section className="recent-orders"><div className="section-heading"><div><p className="eyebrow">YOUR ACTIVITY</p><h2>Recent orders</h2></div></div><div className="order-list">{orders.slice(0,3).map(o=><div className="order-card" key={o.id}><div><b>Order #{String(o.id).slice(-6)}</b><span>{o.items.map(i=>`${i.name} ×${i.qty}`).join(', ')}</span><small>{o.createdAt}</small></div><strong>Rs. {o.total}<em>{o.status}</em></strong></div>)}</div></section>}

    {message&&<div className="toast">{message}</div>}
    <button className="floating-cart" onClick={()=>setShowCart(true)}>🛒 <span>Cart</span>{count>0&&<b>{count}</b>}</button>

    {showCart&&<div className="overlay" onClick={()=>setShowCart(false)}><aside className="cart-panel" onClick={e=>e.stopPropagation()}><div className="panel-head"><div><p className="eyebrow">YOUR ORDER</p><h2>Shopping cart</h2></div><button className="close" onClick={()=>setShowCart(false)}>×</button></div>{cart.length===0?<div className="cart-empty"><div>🛒</div><h3>Your cart is empty</h3><p>Add something delicious from the menu.</p></div>:<><div className="cart-items">{cart.map(i=><div className="cart-item" key={i.id}><img src={i.img} alt=""/><div><b>{i.name}</b><span>Rs. {i.price}</span><div className="qty"><button onClick={()=>change(i.id,-1)}>−</button><b>{i.qty}</b><button onClick={()=>change(i.id,1)}>+</button></div></div><strong>Rs. {i.price*i.qty}</strong></div>)}</div><div className="totals"><p><span>Subtotal</span><b>Rs. {subtotal}</b></p><p><span>Delivery fee</span><b>Rs. {delivery}</b></p><hr/><p className="grand"><span>Total</span><b>Rs. {total}</b></p></div><button className="checkout-btn" onClick={()=>setCheckout(true)}>Proceed to Checkout →</button></>}</aside></div>}

    {checkout&&<div className="overlay"><div className="checkout-modal"><div className="panel-head"><div><p className="eyebrow">FINAL STEP</p><h2>Delivery details</h2></div><button className="close" onClick={()=>setCheckout(false)}>×</button></div><form onSubmit={placeOrder}><label>Delivery address<input value={address} onChange={e=>setAddress(e.target.value)} placeholder="House, street, area" required/></label><label>Phone number<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="03XX XXXXXXX" required/></label><div className="pay-info"><span>💵 Payment</span><b>Cash on Delivery</b></div><div className="checkout-total"><span>Payable total</span><b>Rs. {total}</b></div><button className="checkout-btn">Place Order 🎉</button></form></div></div>}
  </div>
}
