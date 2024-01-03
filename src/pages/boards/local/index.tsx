import type { GetServerSideProps, InferGetStaticPropsType } from 'next'

import DerBoard from "@/components/boards/DerBoard";
import FlowModel from "@/models/FlowModel";
import { SetStateAction, useState } from 'react';
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
  const [flowName, setFlowName] = useState("");
  const defaultFlowName = "MeuDiagrama";

  

  if (!flow) {
    setFlow(new FlowModel("", "", [], []))
    
    return (
      
      <>
      <button className='flex justify-center w-full rounded-md hover:bg-blue-600/90 transition-all cursor-pointer bg-blue-500/90 gap-4 items-center py-4'
    onClick={() => {
      setFlow(new FlowModel("", "", [], []))
    }}></button>
      {/*<div className='w-screen h-screen flex row-auto' >
      <div className={'min-h-screen h-full py-6 px-4 flex flex-col gap-6 relative top-0 left-0 w-[325px] bg-gray-800/60'}>
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
  }
        </div>*/}
        </>
    )
      }

      const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setFlowName(event.target.value);
      };
    
      const handleCreateEmptyDiagram = () => {
        setFlow(new FlowModel(flowName, "", [], []));
      };

      const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
      };
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
    const fileName = flowName || defaultFlowName;
    const file = new File([jsonContent], `${fileName}.json`, { type: "application/json;charset=UTF-8" });
    const url = window.URL.createObjectURL(file);

    var a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div className=" h-screen flex " >
      <div className='max-h-screen w-full absolute flex'>
        
       
        <div className={`min-h-screen h-full z-10 py-6 px-4 flex flex-col gap-6 absolute top-0 left-0 w-[360px] bg-[#131921] ${isSidebarVisible ? '' : 'hidden'}`}>
            <User></User>
            <a className='flex gap-3 items-center' href='../boards/'><MdKeyboardArrowLeft></MdKeyboardArrowLeft>Voltar</a>
            <div className="flex flex-col gap-4">
              <div className='flex flex-col gap-3 font-medium'>
                <span>Nome do Diagrama</span>
                
              <input type='text' 
           value={flowName}
          onChange={handleInputChange} 
          className='flex justify-center gap-4 items-center py-4 bg-transparent outline-none px-6 ring-2 ring-gray-600/10 hover:ring-gray-600/20 focus:ring-gray-600/40 transition-all rounded-md w-full' 
          placeholder='Exemplo: MeuDiagrama'
          maxLength={35}
          >
          </input>
          
              </div>
              <DividerLine></DividerLine>
            <button className='flex justify-center w-full rounded-md hover:bg-blue-600/90 transition-all cursor-pointer bg-blue-500/90 gap-4 items-center py-4'
          onClick={() => {
            setFlow(new FlowModel("", "", [], [])), {handleCreateEmptyDiagram}
          }}> 
          
          <div className='w-[190px] flex justify-start gap-3'><PiNoteBlank className='text-2xl' />Criar Diagrama Vazio</div>
          
          </button>

          
           <a className="flex  justify-center w-full rounded-md hover:bg-violet-600/60 transition-all cursor-pointer bg-violet-500/70 gap-4 items-center py-4 " onClick={() => saveNodes()}>
            
           <div className='w-[190px] flex justify-start gap-3'><IoIosSave className='text-2xl' /> Salvar Diagrama</div>
        
        </a>

           <input
          className="file-input file-input-bordered w-full  h-[56px]"
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

            </div>
        </div>  
       
        
       

      </div> <button onClick={toggleSidebar} className="fixed top-4 w-32 h-[40px] flex items-center justify-center z-10 right-10 p-2 bg-gray-600/60 transition-all hover:bg-gray-600/70 text-white rounded-md focus:outline-none">
        {isSidebarVisible ? 'Esconder' : 'Mostrar'}
      </button>
      
      <div className="w-full h-full">
     
        <DerBoard flow={flow} updateFlow={updateNode} />
      </div>
      
    </div >
    
  )
}

