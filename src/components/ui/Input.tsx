type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({className, ...props }: Props) => {
    return (
      <div
        className={`flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600  ${className}`}
      >
        <input
          className={`block min-w-0 grow bg-white py-1 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6`}
          {...props}
        />
      </div>
    );
}

