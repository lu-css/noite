import {AddDiagram} from '@/components/sidebar/AddDiagram';
import { User } from './User';
import { Local } from './Local';
export const Sidebar = ( )=>{
    return(
        
        <div className=" min-h-screen py-6 px-4 flex flex-col gap-6 relative top-0 left-0 w-full max-w-[264px] bg-gray-800/60 ">
            <User></User>
           <AddDiagram></AddDiagram>
           <Local></Local>
        </div>
        
    )
}