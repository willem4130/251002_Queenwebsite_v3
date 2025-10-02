"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-blue-900/20"></div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 bg-gradient-to-r from-white via-green-200 to-blue-200 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              Contact Us
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Get in touch for booking inquiries, press requests, or just to say
              hello. We&apos;d love to hear from you.
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-white"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-white"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="john@softmadchildren.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="press">Press/Media</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full resize-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Tell us what's on your mind..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="flex w-full transform items-center justify-center space-x-2 rounded-lg bg-green-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-green-700"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="mb-6 text-2xl font-bold text-white">
                  Get In Touch
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-lg bg-green-600/20 p-3">
                      <Mail className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-white">Email</h3>
                      <p className="text-gray-400">
                        booking@softmadchildren.com
                      </p>
                      <p className="text-gray-400">press@softmadchildren.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="rounded-lg bg-green-600/20 p-3">
                      <Phone className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-white">Phone</h3>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="rounded-lg bg-green-600/20 p-3">
                      <MapPin className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-medium text-white">Office</h3>
                      <p className="text-gray-400">
                        123 Music Lane
                        <br />
                        Los Angeles, CA 90001
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold text-white">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="rounded-lg bg-white/10 p-3 transition-colors hover:bg-white/20"
                  >
                    <Instagram className="h-6 w-6 text-white" />
                  </a>
                  <a
                    href="#"
                    className="rounded-lg bg-white/10 p-3 transition-colors hover:bg-white/20"
                  >
                    <Facebook className="h-6 w-6 text-white" />
                  </a>
                  <a
                    href="#"
                    className="rounded-lg bg-white/10 p-3 transition-colors hover:bg-white/20"
                  >
                    <Youtube className="h-6 w-6 text-white" />
                  </a>
                  <a
                    href="#"
                    className="rounded-lg bg-white/10 p-3 transition-colors hover:bg-white/20"
                  >
                    <Twitter className="h-6 w-6 text-white" />
                  </a>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="mb-2 text-lg font-bold text-white">
                  Booking & Management
                </h3>
                <p className="mb-4 text-gray-400">
                  For all booking inquiries and management, please contact our
                  team directly via email or phone.
                </p>
                <p className="text-sm text-gray-500">
                  Response time: 24-48 hours
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
