const Form = () => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="rounded-md shadow-[0_4px_10px_rgba(0,0,0,0.2)] flex flex-col gap-7 px-6 pt-7 pb-9 w-120"
    >
      <p className="text-3xl font-bold text-blue-500">
        Login <span className="font-normal text-[1.3rem]">to Verirate</span>
      </p>
      {/* SECTION = EMAIL, PASSWORD */}
      <section className="flex flex-col gap-3">
        {/* EMAIL ADDRESS DIV */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium text-md">
            Email address:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            className="outline-none border-2 border-gray-400 p-3 focus:border-gray-600 rounded-md"
          />
        </div>
        {/* PASSWORD DIV */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium text-md">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="outline-none border-2 border-gray-400 p-3 focus:border-gray-600 rounded-md"
          />
          <span className="text-blue-400 font-medium hover:underline cursor-pointer w-fit">
            Forgot password?
          </span>
        </div>
      </section>
      <input
        type="submit"
        value="Submit"
        id="submit"
        className="outline-none cursor-pointer px-4 py-3 font-medium text-xl bg-blue-500 hover:bg-blue-600 transition-all rounded-md text-white"
      />
    </form>
  );
};

export default Form;
