import Head from 'next/head'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - Max Petretta</title>
        <meta name="description" content="A blog by Max Petretta, software engineer" />
      </Head>
      <section>
        <h1>Contact</h1>
        <p>Do you have a question on one of my articles?  A comment you'd like to share?  Or maybe you just want to talk;  The easiest way to reach me is <a href="https://twitter.com/maxpetretta">via Twitter</a>.  You can also send me an email if you'd like:</p>
      </section>
      <section>
        <form action="https://formspree.io/f/xeqpbarr" method="POST">
          <input className="form" type="email" name="_replyto" tabIndex="1" placeholder="Email address" required />
          <input type="hidden" name="_subject" value="Contact Form"/>
          <textarea className="form" rows="8" type="text" tabIndex="2" placeholder="Message" required />
          <input className="button block ml-auto mr-0 outline-none" type="submit" tabIndex="3" value="Send"/>
        </form>
      </section>
    </>
  )
}
