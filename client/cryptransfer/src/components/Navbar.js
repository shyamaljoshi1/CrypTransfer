import React, { useState } from 'react'
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import logo from '../images/logo.png';

const NavbarMenu = ({title,classProps}) => {
  return (
    <li className={`mx-4 cursor-pointer ${classProps}`}>
      {title}
    </li>
  );
}

const Navbar = () => {
  const [Toggle,setToggle] = useState(false);

  return (
    <nav className="w-full navbar p-4 md:justify-center">
      <div className="md:flex-[0.5] flex-initial navbar__logo">
        <img src={logo} alt="logo" className="w-32" />
      </div>
      <ul className=" navbar__list md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market","Exchange","Tutorials","Wallets"].map((item,index)=>(
          <NavbarMenu key={item+index} title={item} />
        ))}
        <li className="bg-[#0084ff] px-7 py-2 mx-4 rounded-full hover:bg-[#2998ff] cursor-pointer">Login</li>
      </ul>

      <div className="flex relative">
          {Toggle ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=>setToggle(false)}/> 
            : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=>setToggle(true)}/>}
          {Toggle &&(
            <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end  blue-glassmorphism text-white animate-slide-in">
              <li className="text-xl w-full my-2">
                <AiOutlineClose onClick={()=> setToggle(false)}/>
              </li>
              {["Market","Exchange","Tutorials","Wallets"].map((item,index)=>(
              <NavbarMenu key={item+index} title={item} classProps="my-2 text-lg"/>
              ))}
              <li className="bg-[#0084ff] px-7 py-2 mx-2 my-2 rounded-full hover:bg-[#2998ff] cursor-pointer">Login</li>
            </ul>
          )}
      </div>
    </nav>
  )
}

export default Navbar;  