import React from 'react'
import Constant from '../_utils/Constant'


const Hero = () => {
  return (
    <section class="bg-gray-50">
    <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div class="mx-auto max-w-xl text-center">
        <h1 class="text-3xl font-extrabold sm:text-5xl">
          Upload, Save and easily Share your files in one place
          <strong class="font-extrabold text-red-700 sm:block"> </strong>
        </h1>
  
        <p class="mt-4 sm:text-xl/relaxed">
          {Constant.desc}
        </p>
  
        <div class="mt-8 flex flex-wrap justify-center gap-4">
  
          <a
            class="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            href="/files"
          >
            Get Started
          </a>
         

  
          <a
            class="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-blue-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
            href=""
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Hero