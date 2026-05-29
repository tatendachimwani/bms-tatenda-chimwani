import books from '../assets/books.jpg'

const Banner = () => {
  return (
    <div className="flex md:flex-row-reverse flex-col justify-between py-16 items-center gap-8 ml-5 mr-5">
          <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <img src={books} alt="books" className="rounded-lg object-cover"/>
      </div>

      <div className="md:w-1/2 w-full ">
        <h1 className="md:text-4xl text-2xl font-medium mb-7">New Books</h1>
        <p className="mb-8">Streamline your library with an intuitive book management system. Instantly catalog your entire collection, track checkouts in real time, and access detailed inventory analytics. Whether managing a bustling community space or personal reading lists, this platform provides all the tools needed to organize, search, and monitor books effortlessly.</p>   
        <button className="bg-blue-500 text-white px-4 py-2 rounded">View</button>   
      </div>

    
    </div>
  )
}

export default Banner
