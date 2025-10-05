"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Clock, Ticket } from "lucide-react";

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

const pastShows: Array<{
  date: string;
  time: string;
  venue: string;
  city: string;
  status: string;
  ticketUrl: string;
  featured: boolean;
}> = [
  // Past shows will be added here after the tour
];

export default function ShowsPage() {
  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image
            src="/shows-bg-1920.webp"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2
              className="mb-6 sm:mb-8 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-widest text-white"
              style={{
                textShadow:
                  "0 3px 6px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)",
                WebkitTextStroke: "0.5px rgba(255, 255, 255, 0.3)",
              }}
            >
              Shows
            </h2>

            <div className="space-y-4">
              {upcomingShows.map((show, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {show.status === "sold-out" ? (
                      <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm opacity-60">
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
                            <span className="inline-flex items-center space-x-2 rounded-full bg-gray-600 px-6 py-2 font-medium text-gray-300">
                              <Ticket className="h-4 w-4" />
                              <span>Sold Out</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <a
                        href={show.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-200 ease-in-out hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-white/10 active:border-emerald-500/60 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
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

                          <div className="flex items-center space-x-2 rounded-full bg-white px-6 py-2 font-medium text-black group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200 ease-in-out">
                            <Ticket className="h-4 w-4" />
                            <span>Tickets</span>
                          </div>
                        </div>
                      </a>
                    )}
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
    </div>
  );
}
