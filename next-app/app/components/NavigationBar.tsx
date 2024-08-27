'use client';
import React from 'react';
import { FloatingDock } from './ui/floating-dock';

const NavigationBar = () => {
  return (
    <>
      <FloatingDock
        items={[
          {
            title: 'DashBoard',
            icon: (
              <svg
                width="80px"
                height="80px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 18H9"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            ),
            href: '#',
          },
          {
            title: 'Repos',
            icon: (
              <svg
                fill="#ffffff"
                width="80px"
                height="80px"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path d="M13.14,11.12A8.41,8.41,0,0,0,5.89,3.39,2,2,0,0,0,4,2a2,2,0,0,0-.7,3.87v5.26a2,2,0,1,0,1.4,0V5.87A2,2,0,0,0,5.84,4.79a7,7,0,0,1,5.9,6.35,2,2,0,1,0,1.4,0ZM4,3.4a.6.6,0,1,1-.6.6A.6.6,0,0,1,4,3.4ZM4,13.6a.6.6,0,1,1,.6-.6A.6.6,0,0,1,4,13.6Zm8.47,0a.6.6,0,1,1,.6-.6A.6.6,0,0,1,12.47,13.6Z" />
                </g>
              </svg>
            ),
            href: '#',
          },
        ]}
        desktopClassName="fixed bottom-8 left-2/4 transform -translate-x-1/2"
      />
    </>
  );
};

export default NavigationBar;
