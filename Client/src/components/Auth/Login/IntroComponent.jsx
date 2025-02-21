import LoginSvg from "../../../assets/login.svg";

const IntroComponent = () => {
  return (
    <div className="hidden md:flex flex-col items-center justify-center gap-2">
      <p className="text-xl md:text-4xl">Welcome to Verirate!</p>
      <img
        src={LoginSvg}
        alt="Login SVG Icon"
        className="hidden cb1:block md:w-120 md:h-120"
      />
    </div>
  );
};

export default IntroComponent;
