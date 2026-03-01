'use client';

import { Button } from "@/components/ui/button";

const proposals = [
  {
    id: 1,
    title: "Q3 2024 Community Grant Program",
    description: "Allocate 50,000 ZAYX tokens to fund community-led projects and initiatives.",
    status: "Active",
    votesFor: 1234567,
    votesAgainst: 89012,
  },
  {
    id: 2,
    title: "Integrate New Layer 2 Solution",
    description: "Explore and integrate a new Layer 2 scaling solution to reduce transaction fees and improve performance.",
    status: "Active",
    votesFor: 987654,
    votesAgainst: 12345,
  },
  {
    id: 3,
    title: "Launch Official ZAYX-OS Merch Store",
    description: "Create a new line of official ZAYX-OS branded merchandise, with proceeds funding the DAO treasury.",
    status: "Passed",
    votesFor: 2345678,
    votesAgainst: 54321,
  },
  {
    id: 4,
    title: "Update DAO Governance Framework",
    description: "Revise the governance proposal and voting mechanism to improve community participation and decision-making efficiency.",
    status: "Failed",
    votesFor: 456789,
    votesAgainst: 567890,
  },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-blue-500 text-blue-100";
    case "Passed":
      return "bg-green-500 text-green-100";
    case "Failed":
      return "bg-red-500 text-red-100";
    default:
      return "bg-gray-500 text-gray-100";
  }
};

export default function DaoPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold">ZAYX-OS DAO</h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground">
          Welcome to the heart of our community. The ZAYX-OS DAO empowers token holders to shape the future of the platform through governance and voting.
        </p>
        <Button className="mt-8" size="lg">Become a Member</Button>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-lg bg-card p-6 text-center shadow-sm">
          <h3 className="text-4xl font-bold">12,345</h3>
          <p className="mt-2 text-muted-foreground">DAO Members</p>
        </div>
        <div className="rounded-lg bg-card p-6 text-center shadow-sm">
          <h3 className="text-4xl font-bold">$1.2M</h3>
          <p className="mt-2 text-muted-foreground">Treasury Value</p>
        </div>
        <div className="rounded-lg bg-card p-6 text-center shadow-sm">
          <h3 className="text-4xl font-bold">28</h3>
          <p className="mt-2 text-muted-foreground">Active Proposals</p>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <h2 className="text-center text-4xl font-bold">Governance Proposals</h2>
        <div className="mt-8 space-y-6">
          {proposals.map(proposal => (
            <div key={proposal.id} className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{proposal.title}</h3>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusClass(proposal.status)}`}>
                  {proposal.status}
                </span>
              </div>
              <p className="mt-4 text-muted-foreground">{proposal.description}</p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-green-500">For: {proposal.votesFor.toLocaleString()}</p>
                  <p className="font-semibold text-red-500">Against: {proposal.votesAgainst.toLocaleString()}</p>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline">Vote For</Button>
                  <Button variant="outline">Vote Against</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
