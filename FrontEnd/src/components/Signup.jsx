
import { useForm } from "react-hook-form";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      delete data["confirm_password"];
      const response = await axios.post(
        "http//:localhost:/3000",
        data
      );
      console.log(response.data);

      // COOKIES
      Cookies.set("name", data.username, { expires: 365 });
      Cookies.set("userID", response.data.newUser._id);
      Cookies.set("age", response.data.age);
      Cookies.set("country", response.data.country);

      // toast.success(`Signed in as ${Cookies.get('name')} `);
      console.log(data, "data");
      // navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Username */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("username", {
                required: "❗Name is mandatory",
                minLength: {
                  value: 3,
                  message: "❗Name is too short, at least 3 letters",
                },
                maxLength: {
                  value: 40,
                  message: "❗Name is too long, maximum 40 letters",
                },
              })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age:
            </label>
            <input
              type="number"
              id="age"
              placeholder="Enter your age"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("age", {
                required: "❗Age is required",
                min: {
                  value: 11,
                  message: "❗You must be 10+ to upload",
                },
                max: {
                  value: 100,
                  message: "You are too old❗",
                },
              })}
            />
            {errors.age && <p className="text-red-500 text-xs mt-2">{errors.age.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("password", {
                required: "Password is mandatory",
                pattern: {
                  value: /[!@#$%^&*()_+\-=|{}[\]:"';,.<>/?]/,
                  message: "Invalid pattern",
                },
                minLength: {
                  value: 4,
                  message: "❗Must be 4 characters long",
                },
                maxLength: {
                  value: 20,
                  message: " ❗Not more than 20 characters",
                },
              })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm_password"
              placeholder="Enter password again"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              {...register("confirm_password", {
                required: "Confirm Password is mandatory",
                validate: (value) => value === password || "❗Passwords do not match",
              })}
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-xs mt-2">{errors.confirm_password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
