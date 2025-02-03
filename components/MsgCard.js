"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import dayjs from "dayjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@react-email/components";
import { X } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const MsgCard = ({ message, onMessageDelete }) => {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    const response = await axios.delete(`/api/delete-message/${message._id}`);

    toast({
      title: response.data.message,
    });
    onMessageDelete(message._id);
  };

  return (
    <Card className="bg-gray-800 text-white shadow-md rounded-lg  transition-transform transform hover:scale-105">
      <CardHeader className="flex justify-between items-start">
        <div className="flex justify-between  w-full">
          <CardTitle className="text-2xl md:text-4xl font-semibold">
            {message.content}
          </CardTitle>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="bg-red-500 cursor-pointer rounded-sm h-6 ml-5 sm:ml-0"
              >
                <X className="w-6 h-5  text-white" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your message and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div>
          <p className="text-sm text-gray-400 mt-2">
            {dayjs(message.createdAt).format("MMMM D, YYYY, h:mm A")}
          </p>
        </div>
      </CardHeader>
    </Card>
  );
};

export default MsgCard;
