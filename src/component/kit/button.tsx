interface Props{
    varients:"fill"|"transparent"
    text:string
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
 pay:"bg-[#120051] rounded-xl px-10 py-3 text-white w-full text-center"
}
function Button({varients ,text}:Props) {
  return (
    <buton className={varient[varients]}>
       {text}
    </buton>
  )
}

export default Button