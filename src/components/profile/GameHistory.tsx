import React from 'react'

interface GameHistoryProps {
    time:string;
    accuracy:number; 
}

const GameHistory = ({time,accuracy}:GameHistoryProps) => {
  return (
    <div className='rounded-xl bg-light-gray flex'>
        <div className='flex flex-col'>
            <h3 className='font-bold text-xl'>VREME</h3>
            <span className='text-xl'>{time}</span>
        </div>
        <div className='text-baby-yellow flex flex-col'>
            <h3 className='font-bold text-xl'>POGOCI</h3>
            <span className='text-xl'>{accuracy}</span>
        </div>
    </div>
  )
}

export default GameHistory