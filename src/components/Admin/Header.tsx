import Link from "next/link"

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
)

interface IProps {
  setSearchKey: Function
  handleSearch: Function
}

const Header = ({ setSearchKey, handleSearch }: IProps) => {
  return (
    <header className="flex flex-row self-start  top-0 left-0 items-center justify-between pt-3  w-full">
      <div className="flex flex-2 justify-start mr-4">
        <input
          onKeyUp={(e) => {
            if (e.key == "Enter") handleSearch()
          }}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Pesquisa por posts"
          className=" w-full h-10 shadow-md  focus-visible:outline-none focus-visible:bg-gray-50 rounded-lg text-center"
          type="text"
        />
      </div>
      <div className="flex flex-row flex-1 items-center  justify-around">
        <BellIcon />
        <Link href="/admin/write">
          <a className="h-8 p-3 text-sm text-white bg-black shadow-md hover:bg-white hover:text-black duration-200 ease-in-out flex place-items-center rounded-lg">
            New Post
          </a>
        </Link>
      </div>
    </header>
  )
}

export default Header
