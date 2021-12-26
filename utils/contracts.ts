export interface DappContextProps {
  currentAccount: String | null;
  isLoading: boolean;
  connectWalletAction: () => Promise<void>;
}
