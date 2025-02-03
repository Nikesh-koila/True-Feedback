"use client";

import { useCompletion } from "ai/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { msgSchema } from "@/Schemas/msgSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, RefreshCcw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";

const MessagePage = () => {
  const { userName } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MessageString = useRef([]);

  const { toast } = useToast();

  const initialMessageString =
    "What's your favorite movie?|| Do you have any pets?|| What's your dream job?";

  const parseMessages = (messages) => {
    MessageString.current = messages.split("||");

    return MessageString.current;
  };
  const {
    complete,
    completion,
    error,
    isLoading: isSuggestLoading,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: initialMessageString,
    body: {
      prompt: MessageString.current.toString(),
    },
  });

  const fetchSuggestedMessages = async () => {
    try {
      complete("");
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error fetching Messages",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  const form = useForm({ resolver: zodResolver(msgSchema) });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/send-message", {
        content: data.message,
        userName,
      });
      toast({ title: "Success", description: response.data.message });
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to Send Message",
        description: error.response.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMessageClick = (message) => {
    form.setValue("message", message);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-md max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
          Public Profile Link
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-700">
                    Send Anonymous Message to @{userName}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your anonymous message here..."
                      className="resize-none p-3 border-gray-300 focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Please wait
                </>
              ) : (
                "Send"
              )}
            </Button>
          </form>
        </Form>

        <Separator className="my-6" />

        <div className=" space-y-4">
          <Button
            className="w-full md:w-auto flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
            onClick={fetchSuggestedMessages}
          >
            {isSuggestLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <RefreshCcw className="h-5 w-5" />
            )}
            Suggest Messages
          </Button>
          <p className="text-gray-600">
            Click on any message below to select it.
          </p>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-800">Messages</h3>
          </CardHeader>
          {completion.length === 0 ? (
            <CardContent className="flex flex-col items-center justify-center space-y-6 py-6">
              <Skeleton className="h-[50px] w-[300px] rounded-xl bg-gray-300" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[280px] bg-gray-300" />
                <Skeleton className="h-4 w-[220px] bg-gray-300" />
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex flex-col space-y-4">
              {error ? (
                <p className="text-red-500">{error.message}</p>
              ) : (
                parseMessages(completion).map((message, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="mb-2 text-left h-auto whitespace-normal p-2 border-gray-300 hover:bg-gray-100"
                    onClick={() => handleMessageClick(message)}
                  >
                    {message}
                  </Button>
                ))
              )}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default MessagePage;
