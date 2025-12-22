// import { FaChevronDown } from "react-icons/fa";


type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({ children, className, ...props }: Props) => {
    return (
        <div className={`flex items-center rounded-md bg-white  
                        outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 
                        focus-within:-outline-offset-2 focus-within:outline-indigo-600 ${className}`}>


            <select

                className="block min-w-0 grow bg-white py-1.5 
                           pr-3 pl-1 text-base text-gray-900 
                           placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                {...props}
            >

                {children}
            </select>

        </div>




    )
}


