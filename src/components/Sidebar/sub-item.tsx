import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface ISubItem {
  name: string;
  path: string;
  icon?: IconType; // Use the correct type for your icon
}


const SubMenuItem = ({ item }: { item: ISubItem }) => {
  const { icon: Icon, name, path } = item;


  return (
    <Link to={path || '#'} className={`flex items-center px-2 py-1.5 space-x-2 rounded-[3px] font-light hover:font-semibold cursor-pointer hover:outline outline-offset-2 outline-indigo-500  focus:outline`} >
      {Icon && <Icon style={{ color: 'gray', fontSize: '24px' }}  size={18} />}
      <p className="px-2 text-2x1 font-sans">{name}</p>
    </Link>
  );
}

export default SubMenuItem;