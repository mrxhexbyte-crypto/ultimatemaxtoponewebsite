import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { DAOGovernor } from "../contracts/typechain-types";

export const DAO = () => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [governor, setGovernor] = useState<DAOGovernor | null>(null);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const governorContract = new ethers.Contract(
      "0x...", // Get from deploy.ts
      governor.abi,
      signer
    ) as DAOGovernor;

    setGovernor(governorContract);
  }, []);

  useEffect(() => {
    if (!governor) return;

    const fetchProposals = async () => {
      const filter = governor.filters.ProposalCreated();
      const logs = await governor.queryFilter(filter);
      const proposals = logs.map((log) => log.args);
      setProposals(proposals);
    };

    fetchProposals();
  }, [governor]);

  const vote = async (proposalId: string, vote: number) => {
    if (!governor) return;

    const tx = await governor.castVote(proposalId, vote);
    await tx.wait();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">DAO Proposals</h2>
      <div className="grid grid-cols-1 gap-4">
        {proposals.map((proposal) => (
          <div key={proposal.proposalId} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">{proposal.description}</h3>
              <div className="card-actions justify-end">
                <button className="btn btn-success" onClick={() => vote(proposal.proposalId, 1)}>
                  For
                </button>
                <button className="btn btn-error" onClick={() => vote(proposal.proposalId, 0)}>
                  Against
                </button>
                <button className="btn btn-warning" onClick={() => vote(proposal.proposalId, 2)}>
                  Abstain
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
