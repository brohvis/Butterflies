import React, { useState } from 'react';
import OtpInput from "react-otp-input";


const PasswordForm = ({code,setCode}) => {

    const [passwords,setPassword]=useState([])

   
    return (
		<div action="" className="flex justify-center">
			<OtpInput
				value={code}
				onChange={(otp) => setCode(otp)}
				className=" otp-input w-[64px]  h-[64px] mb-6 bg-transparent border  border-white  rounded-[48px]   text-white outline-none placeholder-white  text-center text-xl font-semibold mr-4"
				numInputs={6}
				separator={<span></span>}
			/>
			{/* <input
				type="number"
				className="  w-[64px]  h-[64px] mb-6 bg-transparent border  border-white  rounded-[48px]   text-white outline-none placeholder-white  text-center text-xl font-semibold mr-4"
				placeholder="0"
				size="1"
				minLength="1"
				maxLength={1}
				required
				// onKeyUp={(e) => setFirstName(e.target.value)}
				id="field1"
				onKeyUp={(e) => changeInputField(e, 1)}
			/> */}
		</div>
    );
};


export default PasswordForm;