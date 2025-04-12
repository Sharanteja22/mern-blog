import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
  return   (
    <footer className='bg-white shadow mt-10'>
      <div className='max-w-screen-xl mx-auto p-4'>
        {/* Top grid */}
        <div className='grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6'>
          {/* About */}
          <div>
            <h2 className='mb-4 text-sm font-semibold text-gray-900 uppercase'>About</h2>
            <ul className='text-gray-600 space-y-2'>
              <li>
                <a
                  href='#'
                  // target='_blank'
                  // rel='noopener noreferrer'
                  className='hover:underline'
                >
                   Projects
                </a>
              </li>
              <li>
                <a
                  href='/about'
                  // target='_blank'
                  // rel='noopener noreferrer'
                  className='hover:underline'
                >
                 Teja's Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h2 className='mb-4 text-sm font-semibold text-gray-900 uppercase'>Follow Us</h2>
            <ul className='text-gray-600 space-y-2'>
              <li>
                <a
                  href='https://github.com/sharanteja22'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href='https://discord.com/invite/your-server'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:underline'
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className='mb-4 text-sm font-semibold text-gray-900 uppercase'>Legal</h2>
            <ul className='text-gray-600 space-y-2'>
              <li>
                <a
                  href='/privacy-policy'
                  className='hover:underline'
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href='/terms-and-conditions'
                  className='hover:underline'
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className='my-6 border-gray-200 sm:mx-auto' />

        {/* Bottom row */}
        <div className='sm:flex sm:items-center sm:justify-between'>
          <span className='text-sm text-gray-500 sm:text-center'>
            © {new Date().getFullYear()} <a href='/about' className='hover:underline'>Teja's Blog</a>. All Rights Reserved.
          </span>
          <div className='flex mt-4 sm:mt-0 space-x-6'>
            <a href='https://facebook.com' className='text-gray-500 hover:text-gray-900'>
              <BsFacebook size={20} />
            </a>
            <a href='https://instagram.com' className='text-gray-500 hover:text-gray-900'>
              <BsInstagram size={20} />
            </a>
            <a href='https://twitter.com' className='text-gray-500 hover:text-gray-900'>
              <BsTwitter size={20} />
            </a>
            <a
              href='https://github.com/sharanteja2211'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-500 hover:text-gray-900'
            >
              <BsGithub size={20} />
            </a>
            <a href='https://dribbble.com' className='text-gray-500 hover:text-gray-900'>
              <BsDribbble size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
