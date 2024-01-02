import {AddDiagram} from '@/components/sidebar/AddDiagram';
import { User } from './User';
import { Local } from './Local';
import { Item } from './sidebarItem';
import { FaHome, FaRegFile } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { DividerLine } from './DividerLine';
import { Upgrade } from './Upgrade';
import FlowModel from "@/models/FlowModel";
import { useState } from 'react';






export const Sidebar = ( )=>{
    return(
        
        <div className=" min-h-screen h-full py-6 px-4 flex flex-col gap-6 relative top-0 left-0 w-[325px] bg-gray-800/60 ">
            <User></User>
           <AddDiagram></AddDiagram>
           <DividerLine></DividerLine>

           <div className='flex mt-[-1.5rem] flex-col w-full'>
           <Item
            name='Home'
            icon={<FaHome />}
            link='/boards'
            ></Item>
            <Item
            name='Rascunhos'
            icon={<FaRegFile />}
            link='/'
            ></Item>
            <Item
            name='Recentes'
            icon={<FaClockRotateLeft />}
            link='/'
            ></Item>
            <DividerLine></DividerLine>
            <Upgrade></Upgrade>
            </div>
           <Local></Local>
        </div>  
    )
}