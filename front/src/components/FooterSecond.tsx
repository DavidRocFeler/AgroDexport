import Image from 'next/image';

const FooterSecond = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Help</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Support</a>
        </div>

        <div className="flex space-x-4">
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
