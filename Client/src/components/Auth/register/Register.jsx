import Form from "./Form";
import IntroComponent from "../Login/IntroComponent";

// register  page
const Register = () => {
  return (
    <div className="min-h-dvh flex flex-col cb1:flex-row items-center justify-evenly">
      {/* LEFT INTRO DIV */}
      <IntroComponent />

      {/* DIVIDER DIV */}
      <div className="bg-gray-300 h-140 w-1 rounded-md lg:block hidden"></div>

      {/* FORM  */}
      <Form />
    </div>
  );
};

export default Register;
