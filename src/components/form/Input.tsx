import React from 'react'

interface InputProps{
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    label: string;
    placeholder: string;

}

const Input = ({value,onChange,type,label,placeholder}:InputProps) => {
  return (
    <div className='w-full flex flex-col gap-2'>
        <label className='font-bold text-xl' htmlFor={label}>{label}</label>
        <input onChange={(e=>onChange(e))} value={value} className='text-xl bg-light-gray/25 px-4 py-3 rounded-xl placeholder:text-white/25 border border-tertiary focus:outline-0' type={type} placeholder={placeholder} name={label}/>
    </div>
  )
}

export default Input