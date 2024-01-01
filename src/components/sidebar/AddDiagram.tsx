import { FaPlus } from "react-icons/fa";

export const AddDiagram = () =>{
    return(
        <div className="flex justify-center items-center rounded-md hover:bg-blue-600/90 transition-all cursor-pointer bg-blue-500/90">
            <a href="" className="flex gap-4 items-center py-4 ">Novo Diagrama<FaPlus></FaPlus> </a>
        </div>
    )
}