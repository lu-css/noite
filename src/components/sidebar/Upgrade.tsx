import { GrUpgrade } from "react-icons/gr";



export const Upgrade = () =>{
    return(
        <div className="rounded-lg border mt-[1.5rem] border-gray-600 flex justify-center items-center">
            <div className="flex flex-col items-center justify-center gap-4 p-6">
            <GrUpgrade className="text-gray-500 text-2xl"></GrUpgrade>
            <span className="max-w-[200px] text-gray-200 text-[11px] text-center">Pronto para ir além deste plano gratuito? <br></br> Faça upgrade para recursos premium.</span>
            <a className="flex text-[11px] w-full py-3 justify-center items-center rounded-lg hover:bg-blue-600/90 transition-all cursor-pointer bg-blue-500/90">Ver Planos</a>
            </div>
        </div>
    )
}