import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

function Footer() {
    const newDate = new Date();
    const year = newDate.getFullYear();

return (
    <>
    {/* adding the footer */}
    <footer className="relative left-0 buttom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between sm:px-20 text-black bg-gray-500">
    {/* adding copyright section */}
    <section className="text-lg">
        Copyright {year} | All rights reserved
    </section>

    {/* adding the social media section */}
    <section className="flex items-center justify-content gap-5 text-2xl text-white">
    <a href="#" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
        <BsFacebook />
    </a>
    <a href="#" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
        <BsLinkedin />
    </a>
    <a href="#" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
        <BsInstagram />
    </a>
    <a href="#" className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
        <BsTwitter />
    </a>
    </section>
    </footer>
 </> 
);
};

export default Footer;