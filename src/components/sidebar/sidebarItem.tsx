

type sidebarItemProps ={
    name: string,
    icon: React.ReactNode
    link:string
}

export const Item = (props: sidebarItemProps)=>{
    return(
        <a href={props.link} className="cursor-pointer flex px-3 rounded-md py-4 items-center gap-4 hover:bg-white/5 transition-all">
            {props.icon}
            {props.name}
        </a>
    )
}