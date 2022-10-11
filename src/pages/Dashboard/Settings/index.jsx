import useActiveHeaderTitleStore from "@/store/activeHeaderTitle";
import useActiveNav from "@/store/activeNav";
import {
  useEffect,
  useState
} from "react";
import LogOut from "@/components/utils/LogOut";
import {
  Link,
} from "react-router-dom";
import {
  useFormik
} from "formik";
import withdrawFormValidator from "@/helper/validator/withdrawFormValidator";
import pb from "@/pb"

function Settings() {
  const user = pb.authStore.model

  const [editState,
    setEditState] = useState("idle")

  const [updatedUser,
    setUpdatedUser] = useState(user)

  const setActiveHeaderTitle = useActiveHeaderTitleStore(
    (state) => state.setActiveHeaderTitle
  );
  const setActiveNav = useActiveNav((state) => state.setActiveNav);

  useEffect(() => {
    setActiveNav("settings");
    setActiveHeaderTitle("Settings");
  }, []);

  const handleUpdate = async () => {
    alert("ok")
    setEditState("idle")
  }
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      upi: updatedUser.profile.upi,
      accountName: updatedUser.profile.accountName,
      accountNumber: updatedUser.profile.accountNumber,
      accountIFSC: updatedUser.profile.accountIFSC,
    },
    validate: withdrawFormValidator,
    onSubmit: handleUpdate,
  });

  return (
    <>
    <div className="p-2 grid gap-2">
            <div className="text-gray-700 text-lg bg-white w-full border p-2">
      <form onSubmit={formik.handleSubmit}>          
    <div className="flex items-center justify-between">
    <p className="text-indigo-500">
          Bank details
    </p>
    <button
      type="submit"
      className="py-1 px-3 rounded bg-indigo-500 text-white ">
   {editState === "editing" ? "Save": "Edit"}
    </button>
    </div>
    <div className="grid gap-3">
        <div className="">
          <label className="formInputLebel" htmlFor="upi">
            UPI id
          </label>
          <input
        className={`formInput ${
        formik.errors.upi ? "formInputError": ""
        }`}
        id="upi"
        name="upi"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.upi}
        placeholder="Enter UPI id"
        />
          {formik.errors.upi ? (
        <div className="formInputErrorText">
      {formik.errors.upi}
        </div>
      ): null}
    </div>
        <div className="">
          <label className="formInputLebel" htmlFor="accountName">
            Name of Account holder
          </label>
          <input
      className={`formInput ${
      formik.errors.accountName ? "formInputError": ""
      }`}
      id="accountName"
      name="accountName"
      type="text"
      onChange={formik.handleChange}
      value={formik.values.accountName}
      placeholder="Enter Name"
      />
          {formik.errors.accountName ? (
      <div className="formInputErrorText">
      {formik.errors.accountName}
      </div>
    ): null}
    </div>
        <div className="">
          <label className="formInputLebel" htmlFor="accountNumber">
            Account Number
          </label>
          <input
      className={`formInput ${
      formik.errors.accountNumber ? "formInputError": ""
      }`}
      id="accountNumber"
      name="accountNumber"
      type="text"
      onChange={formik.handleChange}
      value={formik.values.accountNumber}
      placeholder="Enter Account Number"
      />
          {formik.errors.accountNumber ? (
      <div className="formInputErrorText">
      {formik.errors.accountNumber}
      </div>
    ): null}
    </div>
        <div className="">
          <label className="formInputLebel" htmlFor="accountIFSC">
            Account IFSC code
          </label>
          <input
      className={`formInput ${
      formik.errors.accountIFSC ? "formInputError": ""
      }`}
      id="accountIFSC"
      name="accountIFSC"
      type="text"
      onChange={formik.handleChange}
      value={formik.values.accountIFSC}
      placeholder="Enter IFSCcode"
      />
          {formik.errors.accountIFSC ? (
      <div className="formInputErrorText">
      {formik.errors.accountIFSC}
      </div>
    ): null}
  </div>
</div>
</form>
</div>
      <Link to="/reset-password">
     <button className="w-full text-gray-700 text-lg bg-white w-full border px-2 py-4">  Reset Password </button>
      </Link>
        <LogOut className="text-gray-700 text-lg bg-white w-full border px-2 py-4">
          Log Out
        </LogOut>
</div> < />
);
}

export default Settings;