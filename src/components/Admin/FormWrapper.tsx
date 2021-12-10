export default function FormWrapper({ children }) {
  return (
    <div className="font-normal bg-gray-50 w-screen h-screen flex justify-center items-center">
      <form
        className="flex flex-col bg-white w-80 p-5 rounded-md shadow-md"
        action=""
      >
        {children}
      </form>
    </div>
  )
}
