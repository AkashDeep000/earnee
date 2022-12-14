import {
  useFormik
} from "formik";
import loginFormValidator from "@/helper/validator/loginFormValidator";
import {
  Link,
  useNavigate
} from "react-router-dom";
import {
  useState,
  useEffect
} from "react";
import Spinner from "@/components/utils/Spinner";

import {
  FiEye,
  FiEyeOff
} from "react-icons/fi"
import pb from '@/pb';



const LoginForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (pb.authStore.isValid) {
      navigate("/dashboard")
    }
  },
    [])
  const [loginState,
    setLoginState] = useState("idle");
  const [errorMessage,
    setErrorMessage] = useState("");

  const [isPassShow,
    setIsPassShow] = useState(false);


  const handleLogin = async (values) => {
    setLoginState("processing");
    try {
      const user = await pb.users.authViaEmail(formik.values.email,
        formik.values.password);
      console.log(user)



      navigate("/dashboard");


    } catch (e) {
      console.log(e);
      setLoginState("failed");
      if (e.data.message) {
        setErrorMessage(e.data.message);
        console.log("failed");
        console.log(e.data);
        return;
      }
      setErrorMessage("Something went wrong");
    };
  };

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: loginFormValidator,
    onSubmit: handleLogin,
  });
  return (
    <div className="p-3 grid place-items-center w-full">
      <form
      className="bg-white max-w-[25rem] grid p-3"
      onSubmit={formik.handleSubmit}
      >
        <h2 className="text-2xl font-semibold font-ubuntu justify-self-center text-indigo-500">
          Login
        </h2>
        {loginState === "failed" ? (
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
        <div className="m-3">
          <label className="formInputLebel" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
        className={`formInput ${
        formik.errors.password ? "formInputError": ""
        }`}
        id="password"
        name="password"
        type={isPassShow ? "text": "password"}
        onChange={formik.handleChange}
        value={formik.values.password}
        placeholder="Enter password"
        />
            {isPassShow ? (
        <FiEye
          onClick={() => setIsPassShow(false)}
          className="absolute text-slate-700 top-3 bottom-0 right-3 w-5 h-5"
          />
      ): (
        <FiEyeOff
          onClick={() => setIsPassShow(true)}
          className="absolute text-slate-700 top-3 bottom-0 right-3 w-5 h-5"
          />
      )}
    </div>

          {formik.errors.password ? (
      <div className="formInputErrorText">
      {formik.errors.password}
      </div>
    ): null}
    </div>
        <button
      disabled={loginState === "processing"}
      className="px-3 py-2 font-poppins bg-indigo-500 text-white text-lg w-40 rounded justify-self-center my-2"
      type="submit"
      >
          {loginState === "processing" ? (
        <p>
              Logingin...
              <Spinner className="ml-2 w-6 h-6 text-indigo-200 animate-spin fill-white" />
        </p>
      ): (
        "Login"
      )}
        </button>
          <Link className="mt-4 text-indigo-500 text-center" to="/reset-password">
            forgot password ?
          </Link>
        <p className="px-3 pt-5 text-slate-800 font-poppins">
          Don{"'"}t have an account?{"  "}
          <Link className="text-indigo-500" to="/signup">
            Signup
          </Link>
    </p>
  </form>
</div>
);
};

export default LoginForm;