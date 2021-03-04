import Head from 'next/head'
import Image from 'next/image'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Max Petretta</title>
        <meta name="description" content="A blog by Max Petretta, software engineer" />
      </Head>
      <section>
        <h1>About Me</h1>
        <div className="flex justify-center items-center my-16">
          <div className="absolute w-72 h-72 md:w-96 md:h-96 z-0 rounded-full shadow-2xl"/>
          <div className="brand-gradient absolute animate-spin-slow w-72 h-72 md:w-96 md:h-96 z-0 rounded-full"/>
          {/* <Image className="relative z-10 rounded-full" src="/max.jpeg" alt="A picture of the author, Max Petretta" width={320} height={320}/> */}
          <img className="relative max-h-64 md:max-h-80 z-10 rounded-full" src="/max.jpeg" alt="A picture of the author, Max Petretta"/>
        </div>
        <p>Hi!  My name is Max Petretta, I live in Milwaukee, WI. I work as a Software Engineer at GE Healthcare.  My focus is in the cloud infrastructure space, working to modernize applications for the cloud using Infrastructure-as-Code.</p>
        <p>I am originally from Michigan, and graduated with a B.S. in Computer Science from the University of Michigan.  While working towards my degree, I also studied abroad at University College London.</p>
        <p>This website is relatively new, but I hope to use it to share my thoughts on some of my favorite topics.  Including but not limited to...</p>
        <ul className="list-disc list-inside">
          <li>Technology</li>
          <li>Productivity</li>
          <li>Software Development</li>
          <li>and many more!</li>
        </ul>        
      </section>
      <section>
        <h2>About This Site</h2>
        <p>This site was built with React, Next.js, and TailwindCSS.  It is completely static (🚀🚀🚀), and hosted on ▲Vercel.  If you are interested in how any of that works, <a href="https://github.com/maxpetretta/blog">take a glance at the source code!</a></p>
        <p>A more in-depth writeup is coming soon!</p>
      </section>
      <section>
        <h2>Inspiration</h2>
        <p>I'd like to give credit to a few people who inspired the design of this site:</p>
        <ul className="list-disc list-inside">
          <li><a href="https://leerob.io/">Lee Robinson</a>, who wrote extensively about <a href="https://leerob.io/blog/mdx">the tech stack</a> that I ultimately decided on</li>
          <li><a href="https://www.taniarascia.com/">Tania Rascia</a>, and her excellent <a href="https://www.taniarascia.com/guides">web-focused technology guides</a></li>
          <li><a href="https://paulstamatiou.com/">Paul Stamatiou</a>, and his beautifully designed personal site</li>
        </ul>
      </section>
    </>
  )
}
