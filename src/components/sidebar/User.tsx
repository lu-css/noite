import Image from "next/image"
import imagem from './hq720.jpg';
import { FaRegBell } from "react-icons/fa";


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
            <span className="text-white text-sm font-semibold cursor-pointer hover:text-white/80 transition-all">Itadori</span>
            </div>
            <a href="">
                <FaRegBell></FaRegBell>
            </a>
        </div>
    )
}