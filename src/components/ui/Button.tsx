
type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({children, className, ...props}: Props) => {
  return (
     <button  className={`mt-4 py-1 rounded-md ${className}`}
            {...props}
           
          >
            { children }
          </button>
  )
}


