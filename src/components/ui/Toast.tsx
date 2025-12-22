export const Toast = ({message}: {message: string}) => {
  return (
    <div className="bg-green-500 py-2 px-4 rounded-md text-white text-center fixed bottom-4 right-4 flex gap-4">
        { message }
        <span className="cursor-pointer font-bold" onClick= { () =>"return this.parentNode.remove()"}><sup>X</sup></span>
    </div>
  )
}
