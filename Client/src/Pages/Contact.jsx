import React from "react";
import HomeLayout from "../Layouts/HomeLayout";

export const Contact = () => {
  return (
    <HomeLayout>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          {/* Page Title */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              We'd love to hear from you! Fill out the form below and we'll get
              back to you as soon as possible.
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6 bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="appearance-none rounded-md relative block w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="appearance-none rounded-md relative block w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="Subject"
                className="appearance-none rounded-md relative block w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                placeholder="Write your message here..."
                className="appearance-none rounded-md relative block w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-md text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};
