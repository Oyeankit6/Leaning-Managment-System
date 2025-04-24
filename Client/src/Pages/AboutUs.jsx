import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import education from "../Assets/Images/aboutMainImage.png";
import BillGates from "../Assets/Images/QuotesPersonalityImage/billGates.png";
import einstein from "../Assets/Images/QuotesPersonalityImage/einstein.png";
import Steve from "../Assets/Images/QuotesPersonalityImage/steveJobs.png";
import mandela from "../Assets/Images/QuotesPersonalityImage/nelsonMandela.png";
import apj from "../Assets/Images/QuotesPersonalityImage/apj.png";

const AboutUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const people = [
    {
      name: "Bill Gates",
      image: BillGates,
      quote:
        "We always overestimate the change that will occur in the next two years and underestimate the change that will occur in the next ten.",
    },
    {
      name: "Einstein",
      image: einstein,
      quote:
        "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
    },
    {
      name: "Steve Jobs",
      image: Steve,
      quote:
        "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
    },
    {
      name: "Nelson Mandela",
      image: mandela,
      quote: "It always seems impossible until it’s done.",
    },
    {
      name: "APJ Abdul Kalam",
      image: apj,
      quote:
        "You have to dream before your dreams can come true. Dream, dream, dream.",
    },
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? people.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === people.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <HomeLayout>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-20">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-4">
            Affordable and Quality Education
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mx-auto max-w-3xl">
            Empowering individuals with the best educational resources, offering
            top-notch courses for personal and professional growth. Learn at
            your own pace, from anywhere in the world.
          </p>
        </section>

        {/* About Us Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400 mb-4">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              At LMS, our goal is to provide an accessible platform with
              high-quality content for individuals seeking to advance their
              careers and improve their knowledge. We focus on making learning
              affordable, easy, and enjoyable.
            </p>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
            <img
              src={education}
              alt="Education"
              className="rounded-lg shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out w-full max-w-md"
            />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-900 py-16 relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400 text-center mb-8">
            Hear from Our Learners
          </h2>

          <div className="relative flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-8">
            <button
              onClick={goToPrevious}
              className="absolute sm:static left-2 top-1/2 sm:top-auto sm:left-auto bg-yellow-500 p-2 sm:p-3 rounded-full text-white transform hover:scale-110 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 sm:w-6 h-5 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-xs sm:w-96 transform transition hover:scale-105 text-center mt-8 sm:mt-0">
              <img
                src={people[currentIndex].image}
                alt={people[currentIndex].name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 border-4 border-yellow-400"
              />
              <p className="text-xl font-semibold text-yellow-400">
                {people[currentIndex].name}
              </p>
              <p className="text-gray-300 italic mt-4 text-sm sm:text-base">
                "{people[currentIndex].quote}"
              </p>
            </div>

            <button
              onClick={goToNext}
              className="absolute sm:static right-2 top-1/2 sm:top-auto sm:right-auto bg-yellow-500 p-2 sm:p-3 rounded-full text-white transform hover:scale-110 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 sm:w-6 h-5 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center mt-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-6 max-w-xl mx-auto">
            Join thousands of learners who are taking their education to the
            next level. Start your journey with us today.
          </p>
          <Link
            to="/register"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 text-gray-900 rounded-lg font-semibold text-base sm:text-lg hover:bg-yellow-400 transition-all transform hover:scale-105"
          >
            Register Now
          </Link>
        </section>
      </div>
    </HomeLayout>
  );
};

export default AboutUs;
