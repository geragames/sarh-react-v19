import { useEffect } from "react";
// import { FaChevronDown } from "react-icons/fa";

type Props = React.SelectHTMLAttributes<HTMLSelectElement>;


const years: string[] = [];


export const SelectYears = ({ className, ...props }: Props) => {


    const loadYears = () => {
        const startYear = 1900;
        const endYear = new Date().getFullYear();
        for (let i = endYear; i > startYear; i--) {
            years.push(i.toString());
        }
    }

    useEffect(() => {
        loadYears();
    }, [])

    return (
        <div className={`flex items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 ${className}`}>
            <select

                className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                {...props}
            >    
                <option value={-1}> Elegir año de resolución</option>
                 
                {years.map((year, index) => (
                    <option key={index} value={year}>
                        {year}
                    </option>
                ))}
            </select>

        </div>
    )
}
