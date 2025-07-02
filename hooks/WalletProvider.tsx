import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { transact, Web3MobileWallet  } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { PublicKey, Transaction  } from '@solana/web3.js';
import { AuthToken } from '@solana-mobile/mobile-wallet-adapter-protocol';
import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import { Buffer } from 'buffer'; 


// Define the app identity
const APP_IDENTITY = {
    name: 'Solticket App',
    uri: 'https://solticket.io',
    // You can add a relative path to your icon here
    icon: 'images/icon.png',
};

// 1. DEFINE THE CONTEXT SHAPE
interface WalletContextState {
    publicKey: PublicKey | null;
    connected: boolean;
    loading: boolean;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    signAndSendTransaction: (
        transaction: Transaction,
    ) => Promise<{ signature: string }>;
}

// 2. CREATE THE CONTEXT
export const WalletContext = createContext<WalletContextState>({
    publicKey: null,
    connected: false,
    loading: false,
    connect: async () => {
        throw new Error('Wallet Provider not initialized');
    },
    disconnect: async () => {
        throw new Error('Wallet Provider not initialized');
    },
    signAndSendTransaction: async () => {
        throw new Error('Wallet Provider not initialized');
    },
});

// 3. CREATE THE PROVIDER COMPONENT
export const WalletProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
    const [authToken, setAuthToken] = useState<AuthToken>("");
    const [loading, setLoading] = useState(false);

    const connected = useMemo(() => !!publicKey, [publicKey]);

    // --- CORE LOGIC USING THE WALLET ADAPTER ---

    const connect = useCallback(async () => {
        setLoading(true);
        try {
            await transact(async (wallet : Web3MobileWallet) => {
                const authorizationResult = await wallet.authorize({
                    cluster: 'devnet',
                    identity: APP_IDENTITY,
                });
                
                // Check if authorization was successful and accounts are available
                if (authorizationResult.accounts.length > 0 && authorizationResult.auth_token) {

                    const authorizedPublicKey = new PublicKey( Buffer.from(authorizationResult.accounts[0].address, 'base64'));

                    setAuthToken(authorizationResult.auth_token);
                    setPublicKey(authorizedPublicKey);
                } else {
                    throw new Error('Authorization failed: No accounts returned.');
                }
            });
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const disconnect = useCallback(async () => {
        setLoading(true);
        try {
            await transact(async (wallet : Web3MobileWallet) => {
                await wallet.deauthorize({ auth_token: authToken });
            });
            setPublicKey(null);
        } catch (error) {
            console.error('Failed to disconnect wallet:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const signAndSendTransaction = useCallback(
        async (transaction: Transaction) => {
            if (!connected || !publicKey) {
                throw new WalletNotConnectedError();
            }

            setLoading(true);
            try {
                const { signature } = await transact(async (wallet : Web3MobileWallet) => {
                    const signatures = await wallet.signAndSendTransactions({
                        transactions: [transaction],
                    });
                    
                    // The signature is returned as a Uint8Array, so we encode it in base58.
                    const signatureString = signatures[0]
                    return { signature: signatureString };
                });
                return { signature };
            } catch (error) {
                console.error('Failed to sign and send transaction:', error);
                throw error;
            } finally {
                setLoading(false);
            }
        },
        [connected, publicKey],
    );

    // --- END OF CORE LOGIC ---

    const value = useMemo(
        () => ({
            publicKey,
            connected,
            loading,
            connect,
            disconnect,
            signAndSendTransaction,
        }),
        [publicKey, connected, loading, connect, disconnect, signAndSendTransaction],
    );

    return (
        <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
    );
};

// 4. CREATE THE CUSTOM HOOK
export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};