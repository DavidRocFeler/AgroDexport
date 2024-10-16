import { ISupplyChainProps } from '@/interface/types'
import React from 'react'

const SupplyChainComponent: React.FC<ISupplyChainProps> = ({
  title, description, image, documentA, documentB, documentC, documentD, documentE
}) => {
  return (
    <div className='border-[1px] border-[#E6E6E6] border-solid p-[2rem] flex flex-row'>
        <img src="./FarmerIcon.png" alt="FarmerIcon" className='w-[3rem] h-[3rem]' />
        <div className=' ml-[1.3rem] '>
            < h1 className='font-bold text-[1.5rem] '> {title} </h1>
            <p className='mt-[1rem] text-[#636363] '> {description} </p>
            <ul className='list-disc text-[0.9rem] leading-[2rem] mt-[2rem] mb-[2rem] '>
              {documentA && <li>{documentA}</li>}
              {documentB && <li>{documentB}</li>}
              {documentC && <li>{documentC}</li>}
              {documentD && <li>{documentD}</li>}
              {documentE && <li>{documentE}</li>}
            </ul>
            <button className='border-[#1A8917] border-[1px] border-solid rounded-[20px] pt-[0.3rem] pb-[0.3rem] pl-[1rem] pr-[1rem] text-[0.9rem] text-[#1A8917] '> See supply chain </button>
        </div>
    </div>
  )
}

export default SupplyChainComponent
