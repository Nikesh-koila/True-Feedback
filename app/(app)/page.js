"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/message.json";
import { Mail } from "lucide-react";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Home-True Feedback";
  }, []);

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <main className="flex-grow flex flex-col items-center justify-center w-full px-6 md:px-32 bg-gray-900 text-white space-y-10">
        {/* Hero Section */}
        <section className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Dive into the World of{" "}
            <span className="text-blue-400">Anonymous Feedback</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>

        {/* Carousel for Messages */}
        <section className="w-full max-w-2xl">
          <Carousel
            plugins={[Autoplay({ delay: 3500 })]}
            className="relative w-full overflow-hidden rounded-lg"
          >
            <CarouselContent className="flex w-full">
              {messages.map((message, index) => (
                <CarouselItem
                  key={index}
                  className="w-full flex justify-center p-4"
                >
                  <Card className="w-full bg-gray-800 border border-gray-700 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-blue-300 text-lg">
                        {message.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-start space-y-3">
                      <Mail className="text-blue-400" />
                      <div>
                        <p className="text-gray-300 text-sm">
                          {message.content}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {message.received}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 bg-gray-800 text-gray-300 text-center text-sm">
        © {new Date().getFullYear()} True Feedback. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
