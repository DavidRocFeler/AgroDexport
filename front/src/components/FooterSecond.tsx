import Image from 'next/image';

const FooterSecond = () => {
  return (
    <footer className="bg-[#242424] pt-4 pb-4">
      <div className="w-[95%] m-auto flex flex-row items-center">
        <div className="flex space-x-10">
          <a href="#" className="hover:underline text-[#E9E9E9] text-[0.9rem] ">Help</a>
          <a href="#" className="hover:underline text-[#E9E9E9] text-[0.9rem] ">About</a>
          <a href="#" className="hover:underline text-[#E9E9E9] text-[0.9rem] ">Blog</a>
          <a href="#" className="hover:underline text-[#E9E9E9] text-[0.9rem] ">Privacy</a>
          <a href="#" className="hover:underline text-[#E9E9E9] text-[0.9rem] ">Terms</a>
          <a href="#" className="hover:underline text-[#E9E9E9] text-[0.9rem] ">Support</a>
        </div>

        <div className="flex flex-row justify-evenly w-[15%] ml-auto">
          <div className="w-9 h-9 rounded-full border border-gray-700 flex justify-center items-center hover:border-green-600">
            <Image 
              src="/logoFacebook.png" 
              alt="Facebook" 
              width={36} 
              height={36} 
              objectFit="contain"
            />
          </div>
          <div className="w-9 h-9 rounded-full border border-gray-700 flex justify-center items-center hover:border-green-600">
            <Image 
              src="/logoInstagram.png" 
              alt="Instagram" 
              width={36} 
              height={36} 
              objectFit="contain"
            />
          </div>
          <div className="w-9 h-9 rounded-full border border-gray-700 flex justify-center items-center hover:border-green-600">
            <Image 
              src="/logoX.png" 
              alt="X" 
              width={36} 
              height={36} 
              objectFit="contain"
            />
          </div>
          <div className="w-9 h-9 rounded-full border border-gray-700 flex justify-center items-center hover:border-green-600">
            <Image 
              src="/logoTikTok.png" 
              alt="TikTok" 
              width={36} 
              height={36} 
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};



export default FooterSecond;
