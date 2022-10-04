import {
  useFormik
} from "formik";
import signupFormValidator from "@/helper/validator/signupFormValidator";
import {
  Link,
  useNavigate
} from "react-router-dom";
import {
  useState
} from "react";
import Spinner from "@/components/utils/Spinner";
import useInviteStore from "@/store/inviteStore";
import {
  FiEye,
  FiEyeOff
} from "react-icons/fi"
import pb from '@/pb';



const SignupForm = () => {
  const [signupState,
    setSignupState] = useState("idle");
  const [errorMessage,
    setErrorMessage] = useState("");

  const invitedGroup = useInviteStore((state) => state?.invite);
  const removeInvite = useInviteStore((state) => state?.removeInvite);
  const [isPassShow,
    setIsPassShow] = useState(false);

  const navigate = useNavigate();
  const handleSignUp = async (values) => {
    setSignupState("processing");
    
    try {
      const user = await pb.users.create({
        email: formik.values.email,
        password: formik.values.password,
        passwordConfirm: formik.values.password,
      });
      console.log(user)
      const a = await pb.users.authViaEmail(formik.values.email, formik.values.password);
      console.log("loged in", a)
      const updatedProfile = await pb.records.update('profiles', a.user.profile.id, {
        name: formik.values.name,
      });

      if (invitedGroup) {
        navigate(`/invite/${invitedGroup}`);
        removeInvite();
      } else {
        navigate("/dashboard");
      }

    } catch (e) {
      console.log(e);
   /*   setSignupState("failed");
      if (e.response.data.message) {
        setErrorMessage(e.response.data.message);
        console.log("failed");
        console.log(e.response.data);
        return;
      }
      */
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
    validate: signupFormValidator,
    onSubmit: handleSignUp,
  });
  return (
    <div className="p-3 grid place-items-center w-full">
      <form
      className="bg-white max-w-[25rem] grid p-3"
      onSubmit={formik.handleSubmit}
      >
        <h2 className="text-2xl font-semibold font-ubuntu justify-self-center text-indigo-500">
          Sign Up
        </h2>
        {signupState === "failed" ? (
        <div className="mt-3 mx-2 p-2 border border-red-300 bg-red-100 text-red-400">
            {errorMessage}
        </div>
      ): null}
        <div className="m-3">
          <label className="formInputLebel" htmlFor="name">
            Name
          </label>
          <input
        className={`formInput ${
        formik.errors.name ? "formInputError": ""
        }`}
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
        placeholder="Enter name"
        />
          {formik.errors.name ? (
        <div className="formInputErrorText">
        {formik.errors.name}
        </div>
      ): null}
    </div>
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
    disabled={signupState === "processing"}
    className="px-3 py-2 font-poppins bg-indigo-500 text-white text-lg w-40 rounded justify-self-center my-2"
    type="submit"
    >
          {signupState === "processing" ? (
      <p>
              Signin Up...
              <Spinner className="ml-2 w-6 h-6 text-indigo-200 animate-spin fill-white" />
      </p>
    ): (
      "Sign Up"
    )}
        </button>
        <p className="px-3 pt-5 text-slate-800 font-poppins">
          Already have an account?{"  "}
          <Link className="text-indigo-500" to="/login">
            Login
          </Link>
  </p>
</form>
</div>
);
};

export default SignupForm;