

interface CardProps{
    slika:string;
    id:number;
    naziv:string;
}

const Card = ({slika,id,naziv}:CardProps) => {
  return (
    <div className='w-full h-[600px] border border-white relative flex flex-col justify-end items-center'>
       <div className='p-4 absolute z-10 left-0 right-0 bottom-2 flex flex-col items-center w-full max-h-max'>
        <h2 className="text-2xl font-black">{naziv}</h2>
        <button className="bg-baby-yellow mt-2 cursor-pointer py-4 lg:py-2 w-full lg:text-base font-black rounded-xl shadow-[0_6px_0_0_#9D6F3A] hover:shadow-[0_4px_0_0_#9D6F3A] hover:translate-y-[2px] transition-all duration-150">
          IZABERI
        </button>
       </div>
       <div className='absolute inset-0 bg-gradient-to-t from-tertiary to-tertiary/0'/>
        <img className='object-cover w-full h-full object-center' src={slika} alt={naziv} />
    </div>
  )
}

export default Card