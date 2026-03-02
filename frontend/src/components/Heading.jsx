import React from 'react'
import { cn } from '../utils'

export default function Heading({children, className, ...props}) {
  return (
    <h1 className={cn("text-4xl sm:text-5xl text-pretty font-serif font-cardo font-semibold tracking-tight text-zinc-800", className)} {...props}>
        {children}
    </h1>
  )
}
