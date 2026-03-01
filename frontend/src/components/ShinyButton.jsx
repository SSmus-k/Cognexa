import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../utils'

export default function ShinyButton({className, children, href, ...props}) {
  return (
    <Link to={href ?? "#"} className={cn("relative font-dm group flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-white bg-blue-600 transition-all duration-300 hover:ring-2 hover:ring-blue-700 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:shadow-xl", className)} {...props}>
        <span className='relative flex items-center z-10 gap-2'>
            {children}
        </span>
        <div className='absolute -left-10 bg-neutral-200 w-4 h-12 transform -skew-8 group group-hover:translate-x-100 duration-200 ease-in-out'/>
    </Link>
  )
}
