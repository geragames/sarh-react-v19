import { useState } from "react";
import { IconType } from "react-icons";
import { LuChevronDown } from "react-icons/lu";

import SubMenuItem from "./sub-item";


interface ISidebarItem {
  name: string;
  path: string;
  icon?: IconType;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}


const SidebarItem = ({ item }: { item: ISidebarItem }) => {

  const { name, icon: Icon, items, path } = item;
  const [expanded, setExpanded] = useState(false);

  if (item.items) {
    return (
      <>
        <div className={expanded ? 'flex items-center p-3 font-normal rounded-lg hover:bg-sidebar-background cursor-pointer hover:text-sidebar-active justify-between' : ""} 
        onClick={() => setExpanded(!expanded)} >
          <div className="flex items-center px-2 py-1 gap-2 rounded-[3px] font-normal hover:font-semibold cursor-pointer hover:outline outline-offset-2 outline-indigo-500" >
            {Icon && <Icon style={{ color: 'gray', fontSize: '24px' }}  size={20} />}
            <p className="text-x1 font-light">{name} </p>
            {items && items.length > 0 && <LuChevronDown size={18} />}
          </div>
         
        </div>
        {
          expanded && items && items.length > 0 && (
            <div className="flex flex-col py-2 gap-3 font-light mb-10">
              {items.map((item) => (
                <SidebarItem key={path} item={item} />
              ))

              }

            </div>
          )
        }

      </>
    )

  } else {
    return (
      <> 
        <SubMenuItem item={item} />
      </>
    )
  }


  /* 
    const handleClick = () => {
      if (items) {
        setExpanded(!expanded);
      }
  
    } */


  /* return (
    <>
      <div className={`flex items-center p-3 rounded hover:bg-sidebar-background 
       cursor-pointer hover:text-sidebar-active justify-between`}
        onClick={handleClick}
      >
        <div className="flex items-center space-x-2">
          <Icon size={20} />
          <p className="text-sm font-semibold">{name} </p>
        </div>
        {items && items.length > 0 && <LuChevronDown size={18} />}
      </div>{
        expanded && items && items.length > 0 && (
          <div className="flex flex-col space-y-1 ml-10">
            { items.map((item) =>(
              <SubMenuItem key={path} item={item}  />
            )) 

            }

          </div>
        )
      }

    </>
  ) */
}


export default SidebarItem
