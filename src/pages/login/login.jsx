import axios from "axios";
import { useEffect, useState } from "react";
import OnRun from "../../config/OnRun";
import { usePostFetchApi } from "../../hooks/fetchData";
import ErrorPage from "../../components/error";
import Loading from "../../components/spinner";

const Login = () => {
  const [show, Setshow] = useState(false);
  const [image, setImage] = useState(String);
  const [mobile, setMobile] = useState();
  const [encrypted_response, setencrypted_response] = useState();
  const [captcha, setCaptcha] = useState();
  const [postData, setPost] = useState({ mobile:"", captcha:"", encrypted_reasponse:'' });
  const [data, setData] = useState(image, mobile, captcha, encrypted_response);
  const [isSubmit, , setIsSubmit] = useState(false);
  // const [postData, setPostData] = useState(image, mobile, captcha);
  // const userData = usePostFetchApi(
  //   OnRun + "/authentication/mobileverification",
  //   post
  // );
// 
  // const{  loading, error}=useGetFetchApi("`api.add_resource(CaptchaResource, '/authentication/captcha')")
  useEffect(() => {
    // const PostData =async()=>{

    //   axios.post(OnRun+ "")
    // }
    const getCaptcha = async () => {
      axios
        .get(OnRun + "/authentication/captcha")
        .then((response) => {
          setImage(response.data.image);
          setPost({...postData, encrypted_response:response.data.encrypted_response});
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(OnRun + "/authentication/mobileverification", postData)
    .then(response=>{
      console.log(response.data)
    })
    .catch(error=>{
      console.log(error)
    })
  };
  const handleChange = (e) => {
    setPost({ ...postData, [e.target.name]: [e.target.value] });
  };
  // if (loading) {
  //   return <Loading />;
  // }
  // if (error) {
  //   return <div>{error.message}</div>;
  // }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            ورود
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                شماره موبایل
              </label>
              <div className="mt-2">
                <input
                  title="للطفاشماره موبایل خود را وارد کنید "
                  onChange={handleChange}
                  value={mobile}
                  maxLength={11}
                  id="mobile"
                  name="mobile"
                  type="number"
                  autoComplete="mobile"
                  required
                  className="appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between"></div>
              <div className="mt-2 flex justify-center">
                <img src={`data:image/png;base64,${image}`} alt="" />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  title="لطفا کد زیر را وارد کنید  "
                  onChange={handleChange}
                  value={captcha}
                  maxLength={4}
                  id="captcha"
                  name="captcha"
                  type="number"
                  autoComplete="captcha"
                  required
                  className="appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {show == false ? (
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confimcode"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    کد تایید
                  </label>
                  <div className="text-sm">
                    <button
                      disabled={false}
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      ارسال دوباره کد
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    maxLength={5}
                    disabled={true}
                    onChange={handleChange}
                    // value={encrypted_response}
                    id="confimcode"
                    name="confimcode"
                    type="number"
                    autoComplete="confimcode"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            ) : (
              Setshow == false
            )}
            {/* {error && <div>error:{error.message}</div>}
            {response.data && (
              <div>{JSON.stringify(response.data, null, 2)}</div>
            )} */}
            <div>
              <button
                disabled={false}
                value={data}
                // onClick={() =>userData}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ورود
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
