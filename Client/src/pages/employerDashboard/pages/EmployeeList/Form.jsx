import { useRef, useState } from "react";

const initialObject = {
  first_name: "",
  last_name: "",
  email: "",
  position: "",
  history: "",
  document: null,
};

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialObject);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const positionRef = useRef(null);
  const historyRef = useRef(null);
  const documentRef = useRef(null);

  function handleCustomFormSubmit(e) {
    e.preventDefault();
    console.log("Custom Form Data: ", formData);
  }

  const handleNext = () => {
    setFormData((prevData) => {
      let updatedData = { ...prevData };

      if (step === 1) {
        updatedData = {
          ...updatedData,
          first_name: firstNameRef.current
            ? firstNameRef.current.value
            : prevData.first_name,
          last_name: lastNameRef.current
            ? lastNameRef.current.value
            : prevData.last_name,
          email: emailRef.current ? emailRef.current.value : prevData.email,
          position: positionRef.current
            ? positionRef.current.value
            : prevData.position,
        };
      } else if (step === 2) {
        updatedData = {
          ...updatedData,
          history: historyRef.current
            ? historyRef.current.value
            : prevData.history,
        };
      } else if (step === 3) {
        updatedData = {
          ...updatedData,
          document:
            documentRef.current && documentRef.current.files[0]
              ? documentRef.current.files[0]
              : prevData.document,
        };
      }

      return updatedData;
    });

    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <form className="space-y-4" onSubmit={handleCustomFormSubmit}>
      {step === 1 && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="first_name"
              ref={firstNameRef}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              ref={lastNameRef}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Position</label>
            <input
              type="text"
              name="position"
              ref={positionRef}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </>
      )}

      {step === 2 && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Employee History
          </label>
          <textarea
            name="history"
            ref={historyRef}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Document
          </label>
          <input
            type="file"
            name="document"
            ref={documentRef}
            className="w-full p-2 border rounded-md"
          />
        </div>
      )}

      <div className="flex justify-between pt-4 w-full">
        {step > 1 && (
          <div
            onClick={handlePrev}
            className="px-4 py-2 border rounded-md hover:bg-gray-100 cursor-pointer"
          >
            Back
          </div>
        )}

        <div className="flex justify-end w-full">
          {step < 3 ? (
            <div
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Next
            </div>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
