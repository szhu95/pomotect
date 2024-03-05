"use client";

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CustomDropdownProps } from '@/types';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const CustomDropdown = ({ selected, title, options, handleChange }: CustomDropdownProps) => {

    return (
        <div>
            <Listbox value={selected} onChange={handleChange}>
                {() => (
                    <>
                        {/* <Listbox.Label className="block text-sm font-medium leading-6 text-black">{title}</Listbox.Label> */}
                        <div className="relative mt-2 text-center">
                            <Listbox.Button className="relative w-full cursor-default bg-white py-.5 text-center text-black shadow-sm ring-1 ring-inset ring-black focus:outline-none focus:ring-2 focus:ring-black sm:text-sm sm:leading-6">
                                <span className="flex items-center justify-center">
                                    <span className="block truncate text-center minion-font">{String(selected).toUpperCase()}</span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto bg-white py-1 text-center shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {options.map((size) => (
                                        <Listbox.Option
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'bg-primary-blue text-white' : 'text-gray-900',
                                                    'relative cursor-default select-none py-2 pr-3 flex items-center justify-center'
                                                )
                                            }
                                            value={size}
                                            key={size}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <div className="flex items-center">
                                                        <span
                                                            className={classNames('minion-font', 'ml-3 block truncate')}
                                                        >
                                                            {size.toUpperCase()}
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>

    )
}

export default CustomDropdown