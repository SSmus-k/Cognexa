import React from 'react'
import {MaxWidthWrapper, Heading, ShinyButton} from "../components/index.js"
import {Check} from "lucide-react"

export default function Home() {
  return (
    <>
        <section className='relative py-24 sm:py-32 bg-neutral-50'>
            <MaxWidthWrapper className={"text-center"}>
                <div className='relative mx-auto text-center flex flex-col items-center gap-10'>
                    <div>
                        <Heading>
                            <span>Learning that adapts to how you think.</span>
                            <br />
                            <span className='relative bg-linear-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text'>Not how everyone does.</span>
                        </Heading>
                    </div>

                    <p className='text-base/7 text-gray-700 max-w-prose text-center text-pretty font-dm'>
                    Cognexa learns how you learn and <span className='font-semibold text-gray-700'>adapts the lessons for you.</span>
                    </p>

                    <ul className='space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-start font-dm'>
                        {[
                            "Learns how you study",
                        "Tracks your progress quietly",
                        "Adapts difficulty automatically",
                        "Helps you truly understand, not just finish"
                        ].map((item, index) => (
                            <li key={index} className='flex gap-1.5 items-start sm:items-center'><Check className='text-blue-500' size={20}/> {item}</li>
                        ))
                        }
                    </ul>

                    <div className='w-full max-w-80'>
                        <ShinyButton className={"text-white p-2"} href={"/signup"}> Start Learning </ShinyButton>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>

        <section className='relative py-24 sm:py-32'>
            <MaxWidthWrapper className={"flex flex-col items-center gap-16 sm:gap-20"}>
                <div>
                    <h2 className='text-center text-base/7 font-semibold text-blue-600'>
                        PreHeader
                    </h2>
                    <Heading className={"text-center"}>Some Heading text about the app.</Heading>
                </div>

                <div className='grid gap-4 lg:grid-cols-3 lg:grid-rows-2'>
                    {/* Div 1 */}
                    <div className='relative lg:row-span-2'>
                        <div className='absolute inset-px rounded-lg bg-white lg:rounded-l-4xl'/>

                        <div className='relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg) + 1px)] lg:rounded-l-[calc(2rem + 1px)]'>
                            <div className='px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10'>
                                <p className='mt-2 text-lg/7 font-medium tracking-tight text-blue-700 max-lg:text-center'>Some feautre of app</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
        <section></section>
        <section></section>
    </>
  )
}
