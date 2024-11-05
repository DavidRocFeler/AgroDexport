import Image from 'next/image';

const FooterSecond = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#242424] pt-4 pb-4">
      <div className="w-[95%] m-auto flex flex-row items-center">
        <div className="flex space-x-10">
          <p className="hover:underline text-[#E9E9E9] text-[0.9rem] ">
          © {currentYear} Agro Dexport. All rights reserved.
          </p>
          {/* <a href="#" className="hover:underline text-[#E9E9E9] text-[0.9rem] ">Help</a>
          <a href="#" className="hover:underline text-[#E9E9E9] text-[0.9rem] ">About</a>
          <a href="#" className="hover:underline text-[#E9E9E9] text-[0.9rem] ">Blog</a>
          <a href="#" className="hover:underline text-[#E9E9E9] text-[0.9rem] ">Privacy</a>
          <a href="#" className="hover:underline text-[#E9E9E9] text-[0.9rem] ">Terms</a>
          <a href="#" className="hover:underline text-[#E9E9E9] text-[0.9rem] ">Support</a> */}
        </div>

        <div className="flex flex-row justify-evenly w-[15%] ml-auto items-center">
          <div>
            <Image 
              src="https://res.cloudinary.com/deflfnoba/image/upload/v1730596583/Front/m4inibtrzm5dmymjuduz.png" 
              alt="Facebook" 
              width={30} 
              height={30} 
              objectFit="contain"
            />
          </div>
          <div >
            <Image 
              src="https://res.cloudinary.com/deflfnoba/image/upload/v1730596724/Front/diwitmzms7qc0m2oo4pt.png" 
              alt="Instagram" 
              width={30} 
              height={30} 
              objectFit="contain"
            />
          </div>
          <div >
            <Image 
              src="https://res.cloudinary.com/deflfnoba/image/upload/v1730596995/Front/m2qxkogdaxvqif3xkvzh.png" 
              alt="X" 
              width={30} 
              height={30} 
              objectFit="contain"
            />
          </div>
          <div >
            <Image 
              src="https://res.cloudinary.com/deflfnoba/image/upload/v1730596939/Front/ayqrvh7t7xcotqtsu39c.png" 
              alt="TikTok" 
              width={30} 
              height={30} 
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};



export default FooterSecond;
