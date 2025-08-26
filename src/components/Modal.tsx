import { Check } from 'lucide-react'

const Modal = () => {
  return (
    <div className='modal p-4 z-10 rounded-xl shadow-lg not-visited:absolute left-1/2 top-4 -translate-x-1/2 max-w-max bg-tertiary border border-light-gray flex items-center gap-4'>
        <Check size={24} className='text-light-blue '/>
        <div className='flex flex-col gap-1'>
            <span className='font-bold'>Uspešno ste se registrovali!</span>
            <span className='opacity-50'>Kao bajagi</span>
        </div>
    </div>
  )
}

export default Modal