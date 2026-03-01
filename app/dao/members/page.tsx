'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"

export default function MembersPage() {
  const members = [
    { username: "@username", walletAddress: "0x1234...5678" },
    { username: "@anotheruser", walletAddress: "0xabcd...efgh" },
    { username: "@thirduser", walletAddress: "0xijkl...mnop" },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">DAO Members</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{member.username}</CardTitle>
              <CardDescription>{member.walletAddress}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
