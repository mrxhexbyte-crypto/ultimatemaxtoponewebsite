import React from 'react';

const ProposalPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold">Proposal: {params.id}</h1>
    </div>
  );
};

export default ProposalPage;
