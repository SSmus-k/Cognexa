import React from 'react'
import { cn } from '../utils.js'

export default function MaxWidthWrapper({className, children}) {
  return (
    <div className={cn("h-full mx-auto w-full max-w-7xl px-2.5 md:px-20", className)}>
        {children}
    </div>
  )
}
