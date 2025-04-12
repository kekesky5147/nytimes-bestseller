export default function AboutUsPage () {
  const aboutUsText = `
      Hello! We are NYT Bestseller Explorer.

Here, you can easily find New York Times bestseller books you want.

We organize New York Times bestseller books by category and provide a service of purchase so you can easily get them.

We hope this will be helpful to everyone who loves books, as well as those who are new to reading!

If you have any inquiries, please feel free to contact us anytime. 😊

       E-Mail :ksj****@gmail.com
    `

  return (
    <div className='page'>
      <h1 className='title'>About Us</h1>
      <div className='about-us-content'>
        {aboutUsText.split('\n').map((line, index) => (
          <p key={index}>{line.trim()}</p>
        ))}
      </div>
    </div>
  )
}
