import { TextareaHTMLAttributes } from "react"

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({...props}: Props) => {
  return (
    <textarea
            cols={3}
            rows={6} 
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
            {...props}
        />
  )
}

