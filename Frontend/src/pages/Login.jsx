import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      )

      console.log(response.data)

      alert("Login Successful")

      navigate("/home");

    } catch (error) {

      console.log(error)

      alert("Login Failed")

    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <form
        onSubmit={handleLogin}
        className="bg-[#181818] p-8 rounded-lg w-[350px]"
      >

        <h1 className="text-white text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-[#282828] text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-[#282828] text-white"
        />

        <button
          type="submit"
          className="w-full bg-green-500 p-3 rounded font-bold"
        >
          Login
        </button>

      </form>

    </div>
  )
}

export default Login