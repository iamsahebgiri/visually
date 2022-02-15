import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import AddIcon from "components/icons/add";

export default function Dropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center p-2.5 text-sm font-medium text-white bg-black rounded-full bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <AddIcon className="h-5 w-5" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute bottom-10 right-0 w-48 origin-bottom-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-blue-200 text-blue-900" : "text-gray-900"
                  } group flex items-center w-full px-3 py-2 text-sm`}
                >
                  Custom
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-blue-200 text-blue-900" : "text-gray-900"
                  } group flex items-center w-full px-3 py-2 text-sm`}
                >
                  Random
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-blue-200 text-blue-900" : "text-gray-900"
                  } group flex items-center w-full px-3 py-2 text-sm`}
                >
                  Sorted
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-blue-200 text-blue-900" : "text-gray-900"
                  } group flex items-center w-full px-3 py-2 text-sm`}
                >
                  Nearly sorted
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-blue-200 text-blue-900" : "text-gray-900"
                  } group flex items-center w-full px-3 py-2 text-sm`}
                >
                  Many duplicates
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-blue-200 text-blue-900" : "text-gray-900"
                  } group flex items-center w-full px-3 py-2 text-sm`}
                >
                  Help
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
