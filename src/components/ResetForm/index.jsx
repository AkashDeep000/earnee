import {
  useFormik
} from "formik";
import resetFormValidator from "@/helper/validator/resetFormValidator";
import {
  Link,
  useNavigate
} from "react-router-dom";
import {
  useState,
  useEffect
} from "react";
import Spinner from "@/components/utils/Spinner";
import pb from '@/pb';
import toast, {
  Toaster
} from 'react-hot-toast';



const ResetForm = () => {
  const navigate = useNavigate();

  const [resetState,
    setResetState] = useState("idle");

  const [errorMessage,
    setErrorMessage] = useState("");


  const handleReset = async (values) => {
    setResetState("processing");
    try {
      const reset = await pb.users.requestPasswordReset(formik.values.email);
      console.log(reset)
      setResetState("success")
      toast.success('Reset email sent successfully!')
    } catch (e) {
      console.log(e);
      setResetState("failed");
      if (e.data.message) {
        setErrorMessage(e.data.message);
        console.log("failed");
        console.log(e.data);
      }
      setErrorMessage("Something went wrong");
    };
  };

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {

      email: "",

    },
    validate: resetFormValidator,
    onSubmit: handleReset,
  });
  return (
    <div className="p-3 grid place-items-center w-full">
      <form
      className="bg-white max-w-[25rem] grid p-3"
      onSubmit={formik.handleSubmit}
      >
        <h2 className="text-lg font-semibold font-ubuntu justify-self-center text-indigo-500 mb-4">
          Request Password Reset
        </h2>
        {resetState === "failed" ? (
        <div className="mt-3 mx-2 p-2 border border-red-300 bg-red-100 text-red-400">
            {errorMessage}
        </div>
      ): null}

        <div className="m-3">
          <label className="formInputLebel" htmlFor="email">
            Email Address
          </label>
          <input
        className={`formInput ${
        formik.errors.email ? "formInputError": ""
        }`}
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        placeholder="Enter email"
        />
          {formik.errors.email ? (
        <div className="formInputErrorText">
      {formik.errors.email}
        </div>
      ): null}
    </div>

        <button
      disabled={resetState === "processing"}
      className="px-3 py-2 font-poppins bg-indigo-500 text-white text-lg rounded justify-self-center my-2"
      type="submit"
      >
          {resetState === "processing" ? (
        <p>
              Sending Reset Email...
              <Spinner className="ml-2 w-6 h-6 text-indigo-200 animate-spin fill-white" />
        </p>
      ):
      resetState === "success" ? (
        "Re-Send Reset Email"
      ):
      (
        "Send Reset Email"
      )} < /button> < p className = "px-3 pt-5 text-slate-800 font-poppins" >
      Don{
      "'"
      }t have an account? {
      "  "
      } < Link className = "text-indigo-500" to = "/signup" >
      Signup < /Link> < /p > < /form>
          <Toaster />
      < /div >
    );
      };

export default ResetForm;