import Link from "next/link"
import { SiLocal } from "react-icons/si";

export const Local = () =>{
    return(
        <div className="flex w-full absolute bottom-3 self-center left-4 max-w-[328px] justify-center items-center rounded-md hover:bg-gray-600/90 transition-all cursor-pointer bg-gray-500/90">
            <Link className='  py-4 gap-4 flex items-center' href="/boards/local">Ir para Local <SiLocal /> </Link>
        </div>
    )
}