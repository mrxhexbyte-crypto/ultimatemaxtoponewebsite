'use client'

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"

export default function CreateProposalPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Proposal</CardTitle>
          <CardDescription>Submit a new proposal to the DAO.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="text" placeholder="Proposal Title" />
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Proposal Description"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
