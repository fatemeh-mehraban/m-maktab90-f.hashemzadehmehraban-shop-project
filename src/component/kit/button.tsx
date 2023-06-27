interface Props{
    varients:"fill"|"transparent"
    text:string
    onClick?:()=>void
}
interface VarientType{
    fill:string
    transparent:string
    pagination:string
}
const varient:VarientType = {
 fill:"bg-blue-900 text-white px-5 py-3 rounded-md",
 transparent:"bg-transparent text-gray-400 px-5 py-3",
 pagination:"border rounded-xl px-7 py-3",
 pay:"bg-[#120051] rounded-xl px-10 py-3 text-white w-full text-center curser-pointer",
 save:"bg-[#120051] rounded-xl  px-5 py-3 text-white w-full text-center curser-pointer"
}
function Button({varients ,text ,onClick}:Props) {
  return (
    <buton className={varient[varients]} onClick={onClick}>
       {text}
    </buton>
  )
}

export default Button