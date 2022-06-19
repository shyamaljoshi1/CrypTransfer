import logo from '../images/logo.png';
const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-center items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-center items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center border-y-2 py-4 display:block">
          <img src={logo} alt="logo" className="w-40"/>
        </div>
      </div>
    </div>
  );
}

export default Footer;