import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import processUserArray from "utils/process-user-array";

export default function CustomDialog({
  isOpen,
  openModal,
  closeModal,
  handleOriginalData,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const numArray = data.customUserArray.split(",").map(Number);
    
    handleOriginalData("custom", processUserArray(numArray));
    closeModal();
  };
  const isMissingElement = (input) => {
    const array = input.split(",");
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element.trim() === "") {
        return false;
      }
    }
    return true;
  };

  const isInvalidElement = (input) => {
    const array = input.split(",");
    for (let i = 0; i < array.length; i++) {
      const element = +array[i];
      if (isNaN(element)) {
        return false;
      }
    }
    return true;
  };

  const isOutOfRange = (input) => {
    const array = input.split(",");
    for (let i = 0; i < array.length; i++) {
      const element = +array[i];
      if (element < 1) {
        return false;
      }
    }
    return true;
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-20 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-slate-700 bg-opacity-80 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Custom array
                </Dialog.Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-2">
                    <div>
                      <label
                        htmlFor="customUserArray"
                        className={clsx(
                          "block text-sm font-medium ",
                          errors.customUserArray
                            ? "text-red-700"
                            : "text-gray-700"
                        )}
                      >
                        List of numbers
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="customUserArray"
                          name="customUserArray"
                          rows={3}
                          className={clsx(
                            "shadow-sm  mt-1 block w-full sm:text-sm border  rounded-md",
                            errors.customUserArray
                              ? "bg-red-50 text-red-900 placeholder-red-700 border-red-500 focus:ring-red-500 focus:border-red-500"
                              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          )}
                          placeholder="54, 21, 43, 29, 45, 70, 17, 5, 8, 57"
                          defaultValue={"54, 21, 43, 29, 45, 70, 17, 5, 8, 57"}
                          {...register("customUserArray", {
                            validate: {
                              isMissingElement,
                              isInvalidElement,
                              isOutOfRange,
                            },
                          })}
                        />
                      </div>

                      {errors.customUserArray &&
                        errors.customUserArray.type === "isMissingElement" && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            There seems to be a missing element or duplicated
                            comma somewhere.
                          </p>
                        )}
                      {errors.customUserArray &&
                        errors.customUserArray.type === "isInvalidElement" && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            There seems to be an invalid number.
                          </p>
                        )}

                      {errors.customUserArray &&
                        errors.customUserArray.type === "isOutOfRange" && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            We don&apos;t support negative numbers yet.
                          </p>
                        )}
                      {!errors.customUserArray && (
                        <p className="mt-2 text-sm text-gray-500">
                          Comma separated list of numbers
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 text-right">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      Let&apos;s see it in action
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
