import React, { useState, useRef, useEffect } from "react";

export type FilterOption = {
  label: string;
  selected: boolean;
};

export type FilterType = {
  type: "checkbox" | "radio" | "datetime";
  label: string;
  value?: string[] | string;
  values?: FilterOption[];
  setter: (value: string | FilterOption[]) => void;
};

export type Options = {
  values: {
    label: string;
    value: string | number;
  }[];
  setter: (value: string | number) => void;
};

export default function Filter(props: {
  filters?: FilterType[];
  options?: Options;
  title: string;
}) {
  const [dropdown, setDropdown] = useState(false);
  const buttonRef = useRef(null);
  const componentRef = useRef(null);

  const { filters, options, title } = props;

  // Use effect with event to check if the click was outside the dropdown component
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        dropdown &&
        componentRef.current &&
        !componentRef.current.contains(e.target)
      ) {
        setDropdown(false);
        buttonRef.current.blur();
      } else buttonRef.current.focus();
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdown]);

  return (
    <div
      className="flex items-center justify-center relative w-full h-full"
      ref={componentRef}
    >
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="w-full h-full
        text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 inline-flex justify-between items-center"
        type="button"
        ref={buttonRef}
        onClick={() => setDropdown(!dropdown)}
      >
        {title}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {dropdown && (
        <div
          id="dropdown"
          className="z-50 p-3 bg-white rounded-lg shadow absolute top-full mt-2 left-0 w-full"
        >
          {options && (
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              {options.values.map((value) => {
                return (
                  value && (
                    <li
                      key={value.label + "Option"}
                      onClick={() => {
                        options.setter(value.value);
                        setDropdown(false);
                      }}
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 "
                      >
                        {value.label}
                      </a>
                    </li>
                  )
                );
              })}
            </ul>
          )}
          {filters && (
            <div
              id="accordion-collapse"
              data-accordion="collapse"
              className="divide-y"
            >
              {filters.map((filter, index) => {
                return (
                  <React.Fragment key={"accordion-" + index}>
                    <h2 id="accordion-collapse-heading-1">
                      <button
                        type="button"
                        className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 focus:ring-4 focus:ring-gray-200  hover:bg-gray-100"
                        data-accordion-target={
                          "#accordion-collapse-body-" + index
                        }
                        aria-expanded="true"
                        aria-controls="accordion-collapse-body-1"
                        onClick={() => {
                          // If the accordion item is already open, close it
                          if (
                            !document
                              .querySelector(
                                "#accordion-collapse-body-" + index
                              )
                              .classList.contains("hidden")
                          ) {
                            document
                              .querySelector(
                                "#accordion-collapse-body-" + index
                              )
                              .classList.add("hidden");
                            return;
                          }
                          // Close all accordion items
                          document
                            .querySelectorAll(".accordion-collapse-body")
                            .forEach((item) => {
                              item.classList.add("hidden");
                            });
                          // Open the accordion body for the clicked item
                          document
                            .querySelector("#accordion-collapse-body-" + index)
                            .classList.remove("hidden");
                        }}
                      >
                        <span>{filter.label}</span>
                        <svg
                          data-accordion-icon
                          className="w-3 h-3 rotate-180 shrink-0"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5 5 1 1 5"
                          />
                        </svg>
                      </button>
                    </h2>
                    <div
                      id={"accordion-collapse-body-" + index}
                      className="hidden accordion-collapse-body p-4"
                      aria-labelledby="accordion-collapse-heading-1"
                    >
                      {filter.type === "checkbox" && (
                        <ul
                          className="space-y-2 text-sm"
                          aria-labelledby="dropdownDefault"
                        >
                          {filter.values.map((value, index) => {
                            return (
                              <li
                                className="flex items-center"
                                key={filter.label + "item" + index}
                              >
                                <input
                                  type="checkbox"
                                  value=""
                                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  checked={value.selected}
                                  onChange={(event) => {
                                    if (event.target.checked) {
                                      const newValues = [...filter.values];
                                      newValues[index].selected = true;
                                      filter.setter(newValues);
                                    } else {
                                      const newValues = [...filter.values];
                                      newValues[index].selected = false;
                                      filter.setter(newValues);
                                    }
                                  }}
                                />

                                <label
                                  htmlFor="apple"
                                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                >
                                  {value.label}
                                </label>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                      {filter.type === "datetime" && (
                        <input
                          type="datetime-local"
                          value={filter.value}
                          onChange={(event) => {
                            filter.setter(event.target.value);
                          }}
                        />
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
