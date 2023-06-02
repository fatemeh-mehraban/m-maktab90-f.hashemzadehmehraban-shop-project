import { useForm, Controller } from 'react-hook-form';
interface Props {
    label?:string,
    type:string,
    placeholder:string
    onChange?:(x:string,y:string)=>void
    value?:string
    name:"name"|"email"|"lastName",
    errors:any,
  register:any,
  // helperText:any,
  // showError:string,

}


function Input({label , type , placeholder,value, name ,onChange,errors  ,register}:Props) {
  return (
    <div className="flex flex-col gap-3 mt-10 ">
        <label htmlFor={label} className="font-bold">{label}</label>
        <input {...register(name,{required:"it is false"})} value={value} name={name} id={label} type={type} placeholder={placeholder} className="border border-gray-800 py-4 px-2 rounded-md outline-none "/>
      
       
    </div>
  )
}

export default Input
