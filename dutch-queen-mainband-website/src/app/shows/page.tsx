"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, MapPin, Clock, Ticket, AlertCircle } from "lucide-react";

const upcomingShows = [
  {
    date: "Dec 4, 2025",
    time: "20:30",
    venue: "Vorstin",
    city: "Hilversum",
    status: "tickets",
    ticketUrl: "https://vorstin.stager.co/shop/default/events/111493445",
    featured: true,
  },
  {
    date: "Dec 6, 2025",
    time: "20:30",
    venue: "Boerderij",
    city: "Zoetermeer",
    status: "tickets",
    ticketUrl: "https://poppodiumboerderij.nl/programma/thedutchqueen2025/",
    featured: false,
  },
  {
    date: "Dec 11, 2025",
    time: "20:30",
    venue: "Victorie",
    city: "Alkmaar",
    status: "tickets",
    ticketUrl: "https://www.podiumvictorie.nl/programma/the-dutch-queen-2025",
    featured: false,
  },
  {
    date: "Dec 12, 2025",
    time: "20:15",
    venue: "Vereeniging",
    city: "Nijmegen",
    status: "tickets",
    ticketUrl: "https://www.stadsschouwburgendevereeniging.nl/programma/8266/50-jaar-bohemian-rhapsody/the-dutch-queen",
    featured: false,
  },
  {
    date: "Dec 13, 2025",
    time: "20:15",
    venue: "Dru fabriek",
    city: "Ulft",
    status: "tickets",
    ticketUrl: "https://www.dru-industriepark.nl/agenda/pop/2025/12/the-dutch-queen",
    featured: false,
  },
  {
    date: "Dec 18, 2025",
    time: "20:15",
    venue: "Metropool",
    city: "Enschede",
    status: "tickets",
    ticketUrl: "https://metropool.nl/agenda/the-dutch-queen-18-dec",
    featured: false,
  },
  {
    date: "Dec 19, 2025",
    time: "20:15",
    venue: "Lantaarn",
    city: "Hellendoorn",
    status: "tickets",
    ticketUrl: "https://mijnetickets.shop/de-lantaarn-exploitatie/67acf1f2dfc06",
    featured: false,
  },
  {
    date: "Dec 20, 2025",
    time: "19:30",
    venue: "Hedon",
    city: "Zwolle",
    status: "tickets",
    ticketUrl: "https://hedon-zwolle.nl/voorstelling/32447/the-dutch-queen",
    featured: false,
  },
  {
    date: "Dec 28, 2025",
    time: "20:30",
    venue: "Effenaar",
    city: "Eindhoven",
    status: "tickets",
    ticketUrl: "https://www.effenaar.nl/agenda/dutch-queen-50-jaar-bohemian-rhapsody",
    featured: false,
  },
  {
    date: "Dec 29, 2025",
    time: "20:30",
    venue: "Oosterpoort",
    city: "Groningen",
    status: "tickets",
    ticketUrl: "https://www.spotgroningen.nl/programma/the-dutch-queen-3/",
    featured: false,
  },
  {
    date: "Dec 30, 2025",
    time: "20:30",
    venue: "Mezz",
    city: "Breda",
    status: "tickets",
    ticketUrl: "https://www.mezz.nl/programma/the-dutch-queen/",
    featured: false,
  },
  {
    date: "Jan 2, 2026",
    time: "20:30",
    venue: "Groene Engel",
    city: "Oss",
    status: "tickets",
    ticketUrl: "https://groene-engel.stager.co/web/tickets/111471691",
    featured: false,
  },
  {
    date: "Jan 3, 2026",
    time: "20:30",
    venue: "Grenswerk",
    city: "Venlo",
    status: "tickets",
    ticketUrl: "https://www.grenswerk.nl/agenda/the-dutch-queen///",
    featured: false,
  },
  {
    date: "Jan 9, 2026",
    time: "20:30",
    venue: "Gigant",
    city: "Apeldoorn",
    status: "tickets",
    ticketUrl: "https://www.gigant.nl/concert/the-dutch-queen",
    featured: false,
  },
  {
    date: "Jan 10, 2026",
    time: "20:30",
    venue: "Bibelot",
    city: "Dordrecht",
    status: "tickets",
    ticketUrl: "https://bibelot.stager.co/web/tickets/111500178",
    featured: false,
  },
];

const pastShows = [
  // Past shows will be added here after the tour
];

export default function ShowsPage() {
  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image
            src="/shows-bg-1920.jpg"
            alt="Shows background"
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-6 bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              Tour Dates
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Experience the magic live. Each show is a unique theatrical
              journey designed to transport you to another dimension.
            </p>
          </motion.div>

          {/* Featured Show */}
          {upcomingShows
            .filter((show) => show.featured)
            .map((show, index) => (
              <motion.div
                key={index}
                className="mb-12 rounded-lg border border-orange-500/30 bg-gradient-to-r from-orange-600/20 to-red-600/20 p-8 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-4 flex items-center space-x-2 text-orange-400">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Featured Show
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h2 className="mb-4 text-3xl font-bold text-white">
                      {show.venue}
                    </h2>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-orange-400" />
                        <span>{show.date}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-orange-400" />
                        <span>Doors at {show.time}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-orange-400" />
                        <span>{show.city}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center md:justify-end">
                    <a
                      href={show.ticketUrl}
                      className="inline-flex transform items-center space-x-2 rounded-full bg-orange-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-700"
                    >
                      <Ticket className="h-5 w-5" />
                      <span>Get Tickets</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}

          {/* Upcoming Shows */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
              Upcoming Shows
            </h2>

            <div className="space-y-4">
              {upcomingShows
                .filter((show) => !show.featured)
                .map((show, index) => (
                  <motion.div
                    key={index}
                    className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div className="flex-1">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                          <div className="text-center md:text-left">
                            <div className="text-2xl font-bold text-white">
                              {show.date.split(",")[0]}
                            </div>
                            <div className="text-sm text-gray-400">
                              {show.date.split(",")[1]}
                            </div>
                          </div>

                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white">
                              {show.venue}
                            </h3>
                            <div className="flex items-center space-x-2 text-gray-400">
                              <MapPin className="h-4 w-4" />
                              <span>{show.city}</span>
                              <span>•</span>
                              <Clock className="h-4 w-4" />
                              <span>{show.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        {show.status === "sold-out" ? (
                          <span className="inline-block rounded-full bg-gray-600 px-6 py-2 font-medium text-gray-300">
                            Sold Out
                          </span>
                        ) : (
                          <a
                            href={show.ticketUrl}
                            className="inline-flex items-center space-x-2 rounded-full bg-white px-6 py-2 font-medium text-black transition-colors hover:bg-gray-200"
                          >
                            <Ticket className="h-4 w-4" />
                            <span>Tickets</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Past Shows */}
          {pastShows.length > 0 && (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-2xl font-bold text-white md:text-3xl">
                Past Shows
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                {pastShows.map((show, index) => (
                  <motion.div
                    key={index}
                    className="rounded-lg border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="mb-1 text-sm text-gray-400">{show.date}</div>
                    <div className="font-medium text-white">{show.venue}</div>
                    <div className="text-sm text-gray-400">{show.city}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-t from-orange-900/20 to-black py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Never Miss a Show
            </h2>
            <p className="mb-8 text-lg text-gray-300">
              Get tour announcements and exclusive presale access delivered to
              your inbox.
            </p>
            <form className="mx-auto flex max-w-md gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="rounded-full bg-orange-600 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-700"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
