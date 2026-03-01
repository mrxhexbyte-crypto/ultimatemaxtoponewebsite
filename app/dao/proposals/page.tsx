'use client'

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import Link from "next/link"

export default function ProposalsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Proposals</h1>
        <Link href="/dao/proposals/create">
          <Button>Create Proposal</Button>
        </Link>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Proposal 1: Change the logo</CardTitle>
            <CardDescription>Submitted by @username</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This proposal is to change the logo of the DAO to something more modern.</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Link href="/dao/proposals/1">
              <Button variant="outline">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Proposal 2: Fund a new project</CardTitle>
            <CardDescription>Submitted by @anotheruser</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This proposal is to fund a new project that will benefit the community.</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Link href="/dao/proposals/2">
              <Button variant="outline">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
