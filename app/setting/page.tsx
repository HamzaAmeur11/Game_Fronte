'use client'
import axios from "axios";
import Navbar from "../components/Navbar"
import Image from "next/image"
import { FiEdit2 } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { fetchInfos } from "../Slices/userSlice";
import { qrCode } from "../components/chatComp/messages";


export default function setting() {


  const dispatch = useDispatch<AppDispatch>();
  const [cookies, setCookie] = useCookies(['jwt-token']);
  const [tfaEnabled, setTfaEnabled] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState<string | undefined>(cookies["jwt-token"]);
  const checkedTFA = useSelector((state: RootState) => state.user?.user_Data?.userData?.IsEnabled);
  const [imageD, setImageD] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    checked_: false,
  });

  const db = () => {
    return {
      
    }
  }
  
  useEffect(() => {
    const jwtValue = cookies["jwt-token"];
    console.log('jwt-token:', jwtValue);
    setJwtToken(jwtValue);
    console.log(jwtToken);
    dispatch(fetchInfos());

  }, [cookies]);

  
  // const jwt = cookieStore.get('jwt');

  // const uploadImage = () => {
  // if (imageD instanceof File){  
  //     console.log(imageD);
  //     const formData = new FormData();
  //     formData.append("file", imageD);
  //     formData.append("upload_preset", "vzhhlhkm");
  //     console.log("__________----");
  //     console.log(formData);
  //     console.log("__________----");
  //     axios.post("https://api.cloudinary.com/v1_1/dlnhacgo2/image/upload", formData
  //         ).then((res) => {console.log(res);
  //         })
  //   }
  // }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
  

    if (type === 'file' && files) {
      setImageD(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }  
  }

  const handleImageUpload = async () => {
    if (imageD instanceof File) {
      const formData = new FormData();
      formData.append('file', imageD);
      formData.append('upload_preset', 'vzhhlhkm');

      try {
        console.log(formData);

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dlnhacgo2/image/upload',
          formData
        );

        if (response.status === 200) {
          console.log('Image uploaded successfully:', response.data);
        } else {
          console.error('Image upload failed:', response.data);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }

  const handleFormDataSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:4000/Settings/username', formData, {withCredentials: true });

      if (response.status === 201) {
        console.log('Data submitted successfully:', response.data);
      } else {
        console.error('Data submission failed:', response.data);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData?.checked_)
      setTfaEnabled(true)

    await handleImageUpload();

    await handleFormDataSubmit();
  }

  const onCloseClick = () => {
    console.log("close Click");
    setTfaEnabled(false);
  }

  return (
          <div className="flex flex-col justify-between text-slate-100 h-full min-h-screen min-w-screen w-full">
            <div className="h-16 xLarge:h-24"><Navbar pageName="setting" /></div>
            <div className="flex items-center w-full h-[100%] m-auto min-h-[750px]  medium:m-auto medium:justify-center">
              <div className="flex flex-col w-[100%] xMedium:w-[40%] Large:h-[63%] xMedium:h-[57%] min-h-[500px] h-[80%] justify-between">
                <form onSubmit={handleSubmit} className="flex flex-col w-[100%] gap-4 h-[40%] justify-between">
                  <div className="flex py-4 xMedium:min-w-[600px] justify-center w-[400px] mx-auto">
                    <Image className='rounded-full border-4 w-48 h-48 xMedium:w-[250px] xMedium:h-[250px] border-[#E58E27]' alt='' src={'/gsus.jpeg'} height={250} width={250}/>
                    <label id="file-input-label" htmlFor="file-input" className="flex xMedium:mt-56 cursor-pointer text-[#E58E27]">
                        <FiEdit2 className="text-3xl"/>
                        <div className="xMedium:text-2xl text-xl">image Edit</div>
                    </label>
                    <input name="image" type="file" id="file-input" onChange={handleChange} className="hidden"/>
                  </div>
                  <div className="flex py-4 justify-between xMedium:h-[5rem] xMedium:text-2xl Large:h-24 h-16 w-[400px] mx-auto  xMedium:min-w-[500px] rounded-3xl bg-[#323232]">
                      <div className="text-[#E58E27] text-xl xMedium:text-2xl m-auto">name</div>
                      <div className="text-slate-400 text-xl xMedium:text-2xl m-auto w-[160px]">iel-sma</div>
                  </div>
                  <div className="flex py-4 justify-between xMedium:h-[5rem] xMedium:text-2xl Large:h-24 h-16 w-[400px] mx-auto  xMedium:min-w-[500px] rounded-3xl bg-[#323232]">
                      <div className="text-[#E58E27] text-xl xMedium:text-2xl m-auto">Nick name</div>
                      <div className="m-auto bg-[#323232]">
                        <input onChange={handleChange} name="username" value={formData.username} type="text" placeholder="MyUserName" className="border-none bg-none placeholder-slate-400 bg-[#323232] outline-0 w-[160px] text-xl xMedium:text-2xl" />
                      </div>
                  </div>
                  <div className="flex py-4 justify-between xMedium:h-[5rem] xMedium:text-2xl Large:h-24 h-16 w-[400px] mx-auto  xMedium:min-w-[500px] rounded-3xl bg-[#323232]">
                      <div className="text-[#E58E27] text-xl xMedium:text-2xl m-auto">Enable 2FA</div>
                      <div className="m-auto w-[160px] bg-[#323232]">
                        <button className="">
                          <label htmlFor="toggleCheck" data-modal-target="timeline-modal" data-modal-toggle="timeline-modal" className="w-[180px] h-20">
                          <input onChange={handleChange} type="checkbox" id="toogleCheck" name="checked_" checked={formData.checked_} className="h-8 rounded-full appearance-none w-16 bg-slate-500 opacity-80 checked:bg-slate-200 transition duration-300 relative" />

                            {/* <button  id="toogleCheck" name="checked_"  className="h-8 rounded-full appearance-none w-16 bg-slate-500 opacity-80 checked:bg-slate-200 transition duration-300 relative" onClick={handletfaClick }/> */}
                            {/* <span className="w-5 h-5 bg-red-400 rounded-full absolute top-1 left-1"></span>
                            <span className="w-20 h-10 bg-slate-400 rounded-full absolute top-1 left-11"></span> */}
                          </label>
                        </button>
                      </div>
                  </div>
                  {/* <button type="submit" className="xMedium:h-[5rem] py-6 Large:h-24 h-16 w-[400px] mx-auto  xMedium:min-w-[500px] border-x-2 border-[#E58E27] rounded-3xl bg-[#323232] text-slate-100 text-xl xMedium:text-2xl hover:bg-[#E58E27] hover:opacity-80 transition duration-700">SAVE</button> */}
                  <button type="submit" data-modal-target="timeline-modal" data-modal-toggle="timeline-modal" className="xMedium:h-[5rem] py-6 Large:h-24 h-16 w-[400px] mx-auto  xMedium:min-w-[500px] border-x-2 border-[#E58E27] rounded-3xl bg-[#323232] text-slate-100 text-xl xMedium:text-2xl hover:bg-[#E58E27] hover:opacity-80 transition duration-700">Validate</button>
                  {/* Pop-up */}
                  <div id="timeline-modal"  aria-hidden="true" className={`${tfaEnabled && formData?.checked_ ? "" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                      <div className="top-[25%] left-[10%] medium:left-[35%] relative p-4 w-full max-w-md max-h-full">
                          <div className="relative bg-[#131313] bg-opacity-60 text-white rounded-lg shadow">
                                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                      <h3 className="text-lg font-semibold text-slate-100">
                                          2FA Validation
                                      </h3>
                                      <button onClick={onCloseClick} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="timeline-modal">
                                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                              <path stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                          </svg>
                                          <span className="sr-only">Close modal</span>
                                      </button>
                                  </div>
                                  <div className="p-4 md:p-5">
                                      <div className="relative flex flex-col justify-center items-center gap-4 border-gray-200 ms-3.5 mb-4 md:mb-5">
                                        <img src={qrCode} alt="Your Image" className=" w-52 h-52 rounded-lg border"/>               
                                        <input maxLength={7} type="text" className="text-orange-500 text-3xl w-full h-16 rounded-lg border text-center tracking-[2rem]"></input>               
                                          
                                      </div>
                                      <button className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                      CHECK
                                      </button>
                                  </div>
                              </div>
                      </div>
                  </div> 
                  {/* pop-Up */}
                </form>           
              </div>
              <div className=" xMedium:min-w-[500px] w-[600px] hidden medium:block">
                <Image className='' alt='' src={'/pingPaddles.png'} height={1200} width={1200}/>
              </div>
            </div>
          </div>

  )
}

