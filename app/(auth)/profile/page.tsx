'use client'

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Username</h3>
            <p className="text-sm text-muted-foreground">@username</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Email</h3>
            <p className="text-sm text-muted-foreground">user@example.com</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Wallet Address</h3>
            <p className="text-sm text-muted-foreground">0x1234...5678</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Link href="/profile/edit">
            <Button>Edit Profile</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
