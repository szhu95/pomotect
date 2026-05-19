"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import localFont from 'next/font/local';

const pomotectFont = localFont({
    src: '../fonts/pomotect-analog-regular.otf',
});

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
];

export default function SortDropdown() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentSort = searchParams.get('sort') || 'default';
    
    const selectedOption = sortOptions.find(opt => opt.value === currentSort) || sortOptions[0];

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'default') {
            params.delete('sort');
        } else {
            params.set('sort', value);
        }
        const queryString = params.toString();
        router.push(`/products${queryString ? `?${queryString}` : ''}`);
    };

    return (
        <div className="flex items-center justify-end">
            <Listbox value={selectedOption.value} onChange={handleChange}>
                {() => (
                    <>
                        <div className="relative">
                            <Listbox.Button className={`${pomotectFont.className} relative cursor-pointer bg-transparent py-1 px-2 text-right text-black hover:underline focus:outline-none text-sm`}>
                                <span className="flex items-center justify-end gap-1">
                                    <span className="block truncate">{selectedOption.label}</span>
                                    <ChevronDownIcon
                                        className="h-4 w-4 text-gray-600"
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
                                <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-48 overflow-auto bg-white py-1 text-right shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {sortOptions.map((option) => (
                                        <Listbox.Option
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'bg-primary-blue text-white' : 'text-gray-900',
                                                    'relative cursor-default select-none py-2 px-4'
                                                )
                                            }
                                            value={option.value}
                                            key={option.value}
                                        >
                                            {({ selected }) => (
                                                <span
                                                    className={classNames(
                                                        selected ? 'font-semibold' : 'font-normal',
                                                        `${pomotectFont.className} block truncate text-right`
                                                    )}
                                                >
                                                    {option.label}
                                                </span>
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
    );
}
