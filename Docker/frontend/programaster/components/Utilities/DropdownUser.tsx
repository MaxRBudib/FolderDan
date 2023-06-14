import { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import AuthContext from "@/context/AuthContext";

export default function DropdownUser() {
  const {logoutUser} = useContext(AuthContext)

  return (
    <Menu as="div" className="flex items-center ml-3">
      {({ open }) => (
        <Fragment>

          <div>
            <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
            </Menu.Button>
          </div>

          <Transition 
            show={open}
            enter="transform transition duration-100 ease-in"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transform transition duration-75 ease out"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <Menu.Items className="absolute origin-top-right right-0 top-0 bottom-auto left-auto m-0 translate-y-2 translate-x-1 z-80 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" static>
              <div className="px-4 py-3" role="none">
                <Menu.Item>
                  <p className="text-sm text-gray-900 dark:text-white" role="none">Max Soberano</p>
                </Menu.Item>
                <Menu.Item>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">A01733902@tec.mx</p>
                </Menu.Item>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <Menu.Item>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Ajustes</a>
                  </Menu.Item>
                </li>
                <li>
                  <Menu.Item>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Perfil</a>
                  </Menu.Item>
                </li>
                <li>
                  <Menu.Item>
                    <span>
                    
                    <a onClick = {logoutUser} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Cerrar sesión</a>
                    </span>
                     
                  </Menu.Item>
                </li>
              </ul>
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  )
}