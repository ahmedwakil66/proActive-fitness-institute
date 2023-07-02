
export default function CarouselHome() {
  return (
    <div className='relative'>
      <div className="carousel w-full lg:h-screen">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="https://i.ibb.co/CVkZ9wj/occer-player-kicking-ball-generated-by-ai.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-30">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>

        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="https://i.ibb.co/njVCcBZ/img1.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-30">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="https://i.ibb.co/gTNqDQC/portrait-happy-smiling-beautiful-teen-girl-pool-155003-7507.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-30">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src="https://i.ibb.co/kgJQKdS/kids-fitness-workout-little-girl.jpg" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 z-30">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
      <div className="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 w-[66vw] mx-auto z-20">
        <h1 className='text-white	md:text-4xl lg:text-6xl max-w-3xl mx-auto'>Sports ignite passion, fuel competition, and unite people worldwide, celebrating the pursuit of excellence and the thrill of victory.</h1>
      </div>
      <div className='absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 z-10'></div>
    </div>
  );
}