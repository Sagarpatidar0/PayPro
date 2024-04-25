import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!token) { }
    else {
      axios.get(import.meta.env.VITE_BACKEND_URL + '/api/v1/user/me', {
        headers: {
          authorization: "Bearer " + token
        }
      }).then((res) => {
        if (res.status == 200) navigate('/dashboard')
        else navigate('/signin')
      })
    }
  }, [])

  return (
    <>
      <main className="h-screen mx-10">
        <section className="container flex flex-col gap-10 ">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
          <div className="bg-primary h-[20%] flex items-end p-5 rounded-b-xl">
            <p className="block h-fit text-3xl text-primary-foreground">PayPro</p>
          </div>
              </section>
          <div className="h-[80%] flex flex-col lg:flex-row justify-between px-5">
            <div className="flex-1 max-w-[340px] mx-auto md:max-w-[400px] lg:max-w-none lg:pt-[4rem]">
              <div
                aria-hidden="true"
                className="h-0 w-0 mb-5 border-b-[30px] border-l-[20px] border-r-[20px] border-b-primary border-l-transparent border-r-transparent sm:mx-auto lg:mx-0 lg:mb-10"
              ></div>
              <h1 className="text-xl sm:text-2xl sm:text-center py-4 md:text-3xl lg:text-left lg:text-4xl lg:max-w-[25ch]">
                <b>Welcome to PayPro.</b> <br /> Send and recieve money from your friends
                seemlessly.
              </h1>
              <div className="mt-4 mr-60 sm:flex sm:justify-center md:mt-6 lg:justify-start">
                <Button label="Log In" onClick={() => navigate('/signin')} />
                <Button label="Sign Up" onClick={() => navigate('/signup')} />
              </div>
            </div>
            <div className="flex-1 w-full h-full">
              <img
                src='./illustration.jpg'
                alt="Illustration of money being transfered"
                className="ml-30 object-contain block w-full h-full"
              />
            </div>
          </div>
        {/* </section> */}
      </main>
    </>
  )
}
export default Home