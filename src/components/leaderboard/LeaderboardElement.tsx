import dzoni from '../../assets/dzoni.png';
interface LeaderboardElementProps {
    number: number;
    name: string;
    time: string;
}

const LeaderboardElement = ({ number, name, time }: LeaderboardElementProps) => {
  return (
    <div className='flex w-full items-center px-4 py-2 gap-4 rounded-lg bg-tertiary shadow-[0_4px_0_0_#182235]'>
      <span className='text-3xl font-bold'>#{number}</span>
      <img src={dzoni} width={55} height={55} className='rounded-full border-2 border-white' alt='Ikonica'/>
      <div className='flex flex-col'>
        <span className='leading-tight text-xl font-bold'>{name}</span>
        <span className='leading-tight font-light text-base'>{time}</span>
      </div>
    </div>
  )
}

export default LeaderboardElement