import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { auth } from "../Firebase/firbase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import './Style.css'

const OtpPhone = ({setIsAuth}) => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [Err, setErr] = useState(false);

  let navigate =useNavigate()

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  const onSignup = async() => {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    await signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setErr(true)
      });
  }

  const onOTPVerify = async() => {
    setLoading(true);

   await  window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        navigate('/')
        setIsAuth(true)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErr(false)
      });
  }

  return (
      <div className="w-full h-full flex items-center justify-center">
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
          <div className="w-full flex flex-col gap-4 rounded-lg py-4">
    
            {showOTP ? (
              <>
                <input className="  p-3 text-opacity-80 bg-gray-50 rounded border w-full " value={`${ph}`} disabled/>
                {Err ? <h2>Please enter the OTP we just sent you!</h2> : <h2 >Invalid OTP</h2>}
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  isInputNum={true}
                  disabled={false}
                  shouldAutoFocus={true}
                  required={true}
                  separator={<span>-</span>}
                  inputStyle={{width: '2rem', height: '2rem', margin: '0 0.5rem'}}
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="mb-3 w-full text-black font-semibold space-x-3 flex items-center justify-center rounded bg-gray-300 px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <PhoneInput 
                country={"in"} 
                value={ph} 
                onChange={setPh}/>
                {/* {Err && (<h2>Clarify your Number!</h2>)} */}
                <button
                  onClick={onSignup}
                  className="mb-3 w-full flex items-center justify-center space-x-3 text-black font-semibold rounded bg-gray-300 px-7 pt-3 pb-2.5 text-center text-sm font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
      </div>
  );
};

export default OtpPhone