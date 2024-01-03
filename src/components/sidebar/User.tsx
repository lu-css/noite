import Image from "next/image"

import imagem from './63dedb46d2b61077e83fdc363d0c9f82.jpg';
import { FaRegBell } from "react-icons/fa";
import { FaCog } from "react-icons/fa";



export const User = ()=>{
    return(
        <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
            <Image
            width={40}
            height={40}
            src={imagem}
            alt=""
            className="rounded-full object-cover  h-[40px]"
            ></Image>
            <span className="text-white text-sm font-semibold cursor-pointer hover:text-white/80 transition-all">Tomioka</span>
            </div>
            <div className="flex gap-4">
            <a className="text-white hover:text-white/80 transition-all" href="">

           <FaRegBell></FaRegBell>

            </a>
            <a className="text-white hover:text-white/80 transition-all" href="">
                <FaCog></FaCog>
            </a>
            
            </div>
        </div>
    )
}