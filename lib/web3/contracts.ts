import { ethers } from 'ethers';

// Contract ABIs
export const SHOP_PAYMENT_ABI = [
  'function payWithETH(uint256 _orderId) external payable',
  'function payWithToken(uint256 _orderId, address _token, uint256 _amount) external',
  'function createOrder(string memory _productId, uint256 _amount) external returns (uint256)',
  'function getOrder(uint256 _orderId) external view returns (tuple(uint256 orderId, address buyer, uint256 amount, address tokenAddress, string productId, bool isPaid, uint256 timestamp))',
  'event OrderCreated(uint256 indexed orderId, address indexed buyer, uint256 amount, string productId)',
  'event OrderPaid(address indexed buyer, uint256 indexed orderId, uint256 amount, address tokenAddress)',
];

export const ORDER_RECEIPT_ABI = [
  'function mintReceipt(address _to, string memory _orderId, string memory _productId, uint256 _amount, string memory _currency, string memory _metadataURI, bool _isPhysical, bool _isDigital) external returns (uint256)',
  'function getReceipt(uint256 _tokenId) external view returns (tuple(uint256 tokenId, address buyer, string orderId, string productId, uint256 amount, string currency, uint256 purchaseDate, string metadataURI, bool isPhysical, bool isDigital))',
  'function getTokenIdByOrderId(string memory _orderId) external view returns (uint256)',
  'event ReceiptMinted(uint256 indexed tokenId, address indexed buyer, string orderId, uint256 amount, string currency)',
];

export const GOVERNANCE_TOKEN_ABI = [
  'function balanceOf(address account) external view returns (uint256)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function transfer(address to, uint256 amount) external returns (bool)',
  'function delegate(address delegatee) external',
  'function votes(address account) external view returns (uint256)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
];

export const TREASURY_ABI = [
  'function proposeWithdrawal(address _recipient, uint256 _amount, string memory _reason) external returns (uint256)',
  'function executeWithdrawal(uint256 _id) external',
  'function getTreasuryBalance() external view returns (uint256)',
  'function receiveTokens(address _token, uint256 _amount, string memory _source) external',
  'event WithdrawalProposed(uint256 indexed id, address indexed recipient, uint256 amount)',
  'event WithdrawalExecuted(uint256 indexed id, address indexed recipient, uint256 amount)',
];

// Contract addresses (set in environment variables)
export const getContractAddresses = () => ({
  shopPayment: process.env.NEXT_PUBLIC_SHOP_PAYMENT_ADDRESS || '',
  orderReceipt: process.env.NEXT_PUBLIC_ORDER_RECEIPT_ADDRESS || '',
  governanceToken: process.env.NEXT_PUBLIC_GOVERNANCE_TOKEN_ADDRESS || '',
  treasury: process.env.NEXT_PUBLIC_TREASURY_ADDRESS || '',
});

/**
 * Get contract instance
 */
export const getContract = (
  contractAddress: string,
  abi: string[],
  provider: ethers.Provider | ethers.Signer
) => {
  return new ethers.Contract(contractAddress, abi, provider);
};

/**
 * Create order on ShopPayment contract
 */
export const createOrder = async (
  signer: ethers.Signer,
  shopPaymentAddress: string,
  productId: string,
  amount: bigint
) => {
  const contract = getContract(shopPaymentAddress, SHOP_PAYMENT_ABI, signer);
  const tx = await contract.createOrder(productId, amount);
  return tx.wait();
};

/**
 * Pay with ETH
 */
export const payWithETH = async (
  signer: ethers.Signer,
  shopPaymentAddress: string,
  orderId: number,
  amount: bigint
) => {
  const contract = getContract(shopPaymentAddress, SHOP_PAYMENT_ABI, signer);
  const tx = await contract.payWithETH(orderId, { value: amount });
  return tx.wait();
};

/**
 * Pay with ERC20 token
 */
export const payWithToken = async (
  signer: ethers.Signer,
  shopPaymentAddress: string,
  orderId: number,
  tokenAddress: string,
  amount: bigint
) => {
  const contract = getContract(shopPaymentAddress, SHOP_PAYMENT_ABI, signer);
  const tx = await contract.payWithToken(orderId, tokenAddress, amount);
  return tx.wait();
};

/**
 * Mint NFT receipt
 */
export const mintReceiptNFT = async (
  signer: ethers.Signer,
  receiptAddress: string,
  buyerAddress: string,
  orderId: string,
  productId: string,
  amount: bigint,
  currency: string,
  metadataURI: string,
  isPhysical: boolean,
  isDigital: boolean
) => {
  const contract = getContract(receiptAddress, ORDER_RECEIPT_ABI, signer);
  const tx = await contract.mintReceipt(
    buyerAddress,
    orderId,
    productId,
    amount,
    currency,
    metadataURI,
    isPhysical,
    isDigital
  );
  return tx.wait();
};

/**
 * Delegate voting power
 */
export const delegateVotes = async (signer: ethers.Signer, tokenAddress: string, delegatee: string) => {
  const contract = getContract(tokenAddress, GOVERNANCE_TOKEN_ABI, signer);
  const tx = await contract.delegate(delegatee);
  return tx.wait();
};
