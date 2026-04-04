"use client"
import { FC } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { session_user_detail } from "@/types/common.types";
import { signOut } from "next-auth/react";

interface props {
  user_details: session_user_detail;
}

const DashboardWelcome: FC <props> = ({
  user_details
}) => {

  return (
    <Card className="w-md h-60">
      <CardHeader className="border-b">
        <CardTitle>
          Welcome, {user_details.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="my-auto">
        <CardDescription>
          You are now signed in with your google account.
          Below is a button to trigger signing out of your google account .
        </CardDescription>
      </CardContent>

      <CardFooter className="justify-end mt-auto">
        <Button onClick={() => signOut()}>
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardWelcome;