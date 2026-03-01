'use client'

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { notFound } from "next/navigation"

export default function ProposalPage({ params }: { params: { id: string } }) {
  const { id } = params

  // In a real application, you would fetch the proposal data from a database or API.
  if (id !== "1" && id !== "2") {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Proposal {id}: {id === "1" ? "Change the logo" : "Fund a new project"}</CardTitle>
          <CardDescription>Submitted by {id === "1" ? "@username" : "@anotheruser"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{id === "1" ? "This proposal is to change the logo of the DAO to something more modern." : "This proposal is to fund a new project that will benefit the community."}</p>
          <div className="flex space-x-4">
            <Button>Vote For</Button>
            <Button variant="destructive">Vote Against</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
