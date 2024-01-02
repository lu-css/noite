import type { GetServerSideProps, InferGetStaticPropsType } from 'next'

import DerBoard from "@/components/boards/DerBoard";
import FlowModel from "@/models/FlowModel";
import { useState } from 'react';
import LocalStorage from '@/services/FlowStorage/Localstorage';
import { User } from '@/components/sidebar/User';
import { DividerLine } from '@/components/sidebar/DividerLine';
import {FaHome, FaPlus, FaRegFile } from 'react-icons/fa';
import { Item } from '@/components/sidebar/sidebarItem';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { Upgrade } from '@/components/sidebar/Upgrade';
import { IoIosSave } from 'react-icons/io';
import { PiNoteBlank } from "react-icons/pi";
import { MdKeyboardArrowLeft } from "react-icons/md";



export default function Index() {
  const [flow, setFlow] = useState<FlowModel>();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };


  if (!flow) {
    return (
      <>
      <div className='w-screen h-screen flex row-auto' >
      <div className={`min-h-screen h-full py-6 px-4 flex flex-col gap-6 relative top-0 left-0 w-[325px] bg-gray-800/60 ${isSidebarVisible ? '' : 'hidden'}`}>
      <User></User>
      <a className='flex gap-3 items-center' href='../boards/'><MdKeyboardArrowLeft></MdKeyboardArrowLeft>Voltar</a>
      <div className="flex flex-col gap-4">
      <button className='flex justify-center w-full rounded-md hover:bg-blue-600/90 transition-all cursor-pointer bg-blue-500/90 gap-4 items-center py-4'
          onClick={() => {
            setFlow(new FlowModel("", "", [], []))
          }}> <PiNoteBlank className='text-2xl' />
          Criar Diagrama Vazio</button>

          <input
          className="file-input file-input-bordered w-full max-w-xs h-[56px]"
          type='file'
          accept='.json'
          placeholder='Submit a file'
          onChange={async (e) => {
            const f = e.target.files?.[0];

            if (!f) { return }

            const bytes = await f.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const content = JSON.parse(buffer.toString());

            setFlow(FlowModel.fromJson(content));
          }}
        />
      </div>
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
        </div>
        </div>
      </>
    )
  }
  

  const storage = new LocalStorage(flow.id);

  function updateNode(flow: FlowModel) {
    storage.saveFlow(flow.id, flow);
  }

  async function saveNodes() {
    const flow = await storage.getFlow();

    if (!flow) {
      return
    }

    const jsonContent = JSON.stringify(flow.asJson())
    const file = new File([jsonContent], 'myFile.json', { type: "text/plain:charset=UTF-8" });
    const url = window.URL.createObjectURL(file);

    var a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="w-screen h-screen flex row-auto" >
      <div>
        
        <div>
        <div className={`min-h-screen h-full py-6 px-4 flex flex-col gap-6 relative top-0 left-0 w-[325px] bg-gray-800/60 ${isSidebarVisible ? '' : 'hidden'}`}>
            <User></User>
            <a className='flex gap-3 items-center' href='../boards/local'><MdKeyboardArrowLeft></MdKeyboardArrowLeft>Voltar</a>
            <div className="flex flex-col gap-4">
            <a className='flex justify-center w-full rounded-md hover:bg-blue-600/90 transition-all cursor-pointer bg-blue-500/90 gap-4 items-center py-4' onClick={() => setFlow(undefined)}><FaPlus className='text-xl'></FaPlus> Novo Diagrama</a>
           <a className="flex  justify-center w-full rounded-md hover:bg-violet-600/60 transition-all cursor-pointer bg-violet-500/70 gap-4 items-center py-4 " onClick={() => saveNodes()}><IoIosSave className='text-2xl' /> Salvar Arquivo </a> 
            </div>
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
        </div>  
        <button onClick={toggleSidebar} className="fixed top-2 w-[80px] h-[40px] flex items-center justify-center z-10 right-10 p-2 bg-gray-600/70 text-white rounded-full focus:outline-none">
        {isSidebarVisible ? 'Esconder' : 'Mostrar'}
      </button>
        
        </div>

      </div>
      <div className="w-full h-full">
        <DerBoard flow={flow} updateFlow={updateNode} />
      </div>
    </div >
  )
}

