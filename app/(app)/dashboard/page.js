"use client";

import MsgCard from "@/components/MsgCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { acceptMsgSchema } from "@/Schemas/acceptMsgSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { toast } = useToast();

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();
  const userName = session?.user?.userName;

  useEffect(() => {
    document.title = "Dashboard-True Feedback";
  }, []);

  const form = useForm({
    resolver: zodResolver(acceptMsgSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get("/api/accept-message");
      setValue("acceptMessages", response.data.isAcceptingMsg);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        varient: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get("/api/get-message");

        setMessages(response.data.messages || []);

        if (refresh) {
          toast({
            title: "Refreshed Messages",
            description: "Showing latest messages",
            varient: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Failed to fetch",
          description: error.response.data.message,
          varient: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchAcceptMessage();
    fetchMessages();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  //handle switchchange

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post("/api/accept-message", {
        acceptMsg: !acceptMessages,
      });
      if (response.data.success) {
        setValue("acceptMessages", !acceptMessages);
        toast({
          title: "Success",
          description: response.data.message,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        varient: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);

    toast({
      title: "URL Copied!",
      description: "Profile URL has been copied to clipboard.",
    });
  };

  const profileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${userName}`;

  if (!session || !session.user) {
    return (
      <div className="flex h-[88vh] w-full flex-col items-center justify-center space-y-6 bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col space-y-4">
          <Skeleton className="h-[150px] w-[300px] rounded-xl bg-gray-300 dark:bg-gray-700" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[280px] bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-4 w-[220px] bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
        <div className="flex space-x-4">
          <Skeleton className="h-[50px] w-[150px] rounded-lg bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-[50px] w-[150px] rounded-lg bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="my-8 mx-2 md:mx-8 lg:mx-auto p-8 bg-white shadow-lg rounded-2xl w-[96vw] max-w-6xl">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
          User Dashboard
        </h1>

        {/* Unique Link Section */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Copy Your Unique Link
          </h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
            <Button
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              onClick={copyToClipboard}
            >
              Copy
            </Button>
          </div>
        </div>

        {/* Switch Section */}
        <div className="mb-6 flex items-center gap-3 p-4 bg-gray-100 rounded-lg shadow-sm">
          <Switch
            {...register("acceptMessages")}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
            className="transform scale-110"
          />
          <span className="text-gray-700 font-medium">
            Accept Messages:{" "}
            <span className="font-semibold">
              {acceptMessages ? "On" : "Off"}
            </span>
          </span>
        </div>
        <Separator className="mb-6" />

        {/* Refresh Button */}
        <Button
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <RefreshCcw className="h-5 w-5" />
          )}
          Refresh Messages
        </Button>

        {/* Messages Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto overflow-x-hidden p-5">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MsgCard
                key={message._id}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No messages to display.</p>
          )}
        </div>
      </div>
    );
  }
};

export default dashboard;
