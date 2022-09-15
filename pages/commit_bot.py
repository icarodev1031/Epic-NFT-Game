# Created by RickyBGamez (https://github.com/RickyBGamez/)
# This script is licensed under the GNU General Public License v3.0.
# Check the GitHub repository for more information. (https://github.com/RickyBGamez/Commit-Bot)

### Configuration
# Logging Options
LOG = True
LOG_FILE = "commit_bot.log"

# Commit Options
NO_COMMIT_CHANCE = 0.1 # 10% chance of NOT committing to GitHub.
MAX_COMMITS = 8 # Maximum number of commits that can be made.

# Cron job.
CRON_JOB_TIME = "0 12 * * *" # Every day at 12:00 pm.



# Imports
from sys import argv
from pathlib import Path
import math
from os import system # Executing the Git commands.
# from random import random, randint # Generating a random float between 0 and 1.
import random
from datetime import datetime # Date and time for our file.
# Output File
OUTPUT_FILE = random.choice(['__app.js','_faucet.js','_howtoplay.js','_index.js','_marketplace.js','_play.js'])
print(OUTPUT_FILE)
# Check if a cronjob exists for this script, if not, create it using crontab.
system("crontab -l > cron.txt")
with open("cron.txt", "r") as f:
    if "commit_bot.py" not in f.read():
        with open("cron.txt", "a") as f:
            f.write(f"{CRON_JOB_TIME} cd {Path.cwd()} && python3 commit_bot.py\n")
            f.close()
            system("crontab cron.txt")
            system("rm -f cron.txt")
    else:
        f.close()
        system("rm -f cron.txt")

# Logging.
def log(message):
    if LOG:
        with open(LOG_FILE, "a") as f:
            f.write(f"{message}\n")
            f.close()

# Create our commit.
def create_commit():
    file1 = """
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function ResellNFT() {
const [formInput, updateFormInput] = useState({ price: '', image: '' })
const router = useRouter()
const { id, tokenURI } = router.query
const { image, price } = formInput

useEffect(() => {
    fetchNFT()
}, [id])

async function fetchNFT() {
    if (!tokenURI) return
    const meta = await axios.get(tokenURI)
    updateFormInput(state => ({ ...state, image: meta.data.image }))
}

async function listNFTForSale() {
    if (!price) return
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const priceFormatted = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()

    listingPrice = listingPrice.toString()
    let transaction = await contract.resellToken(id, priceFormatted, { value: listingPrice })
    await transaction.wait()

    router.push('/')
}

return (
    <div className="flex justify-center">
    <div className="w-1/2 flex flex-col pb-12">
        <input
        placeholder="Asset Price in Eth"
        className="mt-2 border rounded p-4"
        onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        {
        image && (
            <img className="rounded mt-4" width="350" src={image} />
        )
        }
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
        List NFT
        </button>
    </div>
    </div>
)
}
    """
    file2 = """
import '../styles/globals.css'
import Link from 'next/link'
function MyApp({ Component, pageProps }) {
return (
    <div>
    <nav className='border-b p-6'>
    <p className="text-4xl font-bold">Metaverse Marketplace</p>
        <div className="flex mt-4">
        <Link href="/">
            <a className="mr-4 text-pink-500">
            Home
            </a>
        </Link>
        <Link href="/create-nft">
            <a className="mr-6 text-pink-500">
            Sell NFT
            </a>
        </Link>
        <Link href="/my-nfts">
            <a className="mr-6 text-pink-500">
            My NFTs
            </a>
        </Link>
        <Link href="/dashboard">
            <a className="mr-6 text-pink-500">
            Dashboard
            </a>
        </Link>
        </div>
    </nav>
    <Component {...pageProps}/>
    </div>
    )
}
export default MyApp
    """
    file3 = """
import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function CreateItem() {
const [fileUrl, setFileUrl] = useState(null)
const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
const router = useRouter()

async function onChange(e) {
    /* upload image to IPFS */
    const file = e.target.files[0]
    try {
    const added = await client.add(
        file,
        {
        progress: (prog) => console.log(`received: ${prog}`)
        }
    )
    const url = `https://ipfs.infura.io/ipfs/${added.path}`
    setFileUrl(url)
    } catch (error) {
    console.log('Error uploading file: ', error)
    }  
}
async function uploadToIPFS() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload metadata to IPFS */
    const data = JSON.stringify({
    name, description, image: fileUrl
    })
    try {
    const added = await client.add(data)
    const url = `https://ipfs.infura.io/ipfs/${added.path}`
    /* after metadata is uploaded to IPFS, return the URL to use it in the transaction */
    return url
    } catch (error) {
    console.log('Error uploading file: ', error)
    }  
}

async function listNFTForSale() {
    const url = await uploadToIPFS()
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* create the NFT */
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    let transaction = await contract.createToken(url, price, { value: listingPrice })
    await transaction.wait()

    router.push('/')
}

return (
    <div className="flex justify-center">
    <div className="w-1/2 flex flex-col pb-12">
        <input 
        placeholder="Asset Name"
        className="mt-8 border rounded p-4"
        onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
        placeholder="Asset Description"
        className="mt-2 border rounded p-4"
        onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
        placeholder="Asset Price in Eth"
        className="mt-2 border rounded p-4"
        onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
        type="file"
        name="Asset"
        className="my-4"
        onChange={onChange}
        />
        {
        fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
        )
        }
        <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
        Create NFT
        </button>
    </div>
    </div>
)
}
    """
    file4 = """
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function CreatorDashboard() {
const [nfts, setNfts] = useState([])
const [loadingState, setLoadingState] = useState('not-loaded')
useEffect(() => {
    loadNFTs()
}, [])
async function loadNFTs() {
    const web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await contract.fetchItemsListed()

    const items = await Promise.all(data.map(async i => {
    const tokenUri = await contract.tokenURI(i.tokenId)
    const meta = await axios.get(tokenUri)
    let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
    let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
    }
    return item
    }))

    setNfts(items)
    setLoadingState('loaded') 
}
if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>)
return (
    <div>
    <div className="p-4">
        <h2 className="text-2xl py-2">Items Listed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {
            nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                </div>
            </div>
            ))
        }
        </div>
    </div>
    </div>
)
}
    """
    file5 = """
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function Home() {
const [nfts, setNfts] = useState([])
const [loadingState, setLoadingState] = useState('not-loaded')
useEffect(() => {
    loadNFTs()
}, [])
async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
    const data = await contract.fetchMarketItems()

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
    const tokenUri = await contract.tokenURI(i.tokenId)
    const meta = await axios.get(tokenUri)
    let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
    let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
    }
    return item
    }))
    setNfts(items)
    setLoadingState('loaded')
}
async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nft.tokenId, {
    value: price
    })
    await transaction.wait()
    loadNFTs()
}
if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
return (
    <div className="flex justify-center">
    <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {
            nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                </div>
                </div>
                <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">{nft.price} ETH</p>
                <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                </div>
            </div>
            ))
        }
        </div>
    </div>
    </div>
)
}
    """
    file6 = """
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { useRouter } from 'next/router'

import {
marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function MyAssets() {
const [nfts, setNfts] = useState([])
const [loadingState, setLoadingState] = useState('not-loaded')
const router = useRouter()
useEffect(() => {
    loadNFTs()
}, [])
async function loadNFTs() {
    const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketplaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await marketplaceContract.fetchMyNFTs()

    const items = await Promise.all(data.map(async i => {
    const tokenURI = await marketplaceContract.tokenURI(i.tokenId)
    const meta = await axios.get(tokenURI)
    let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
    let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        tokenURI
    }
    return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
}
function listNFT(nft) {
    router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
}
if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No NFTs owned</h1>)
return (
    <div className="flex justify-center">
    <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {
            nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} className="rounded" />
                <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => listNFT(nft)}>List</button>
                </div>
            </div>
            ))
        }
        </div>
    </div>
    </div>
)
}
    """
    file = random.choice([file1,file2,file3,file4,file5,file6])
    with open(OUTPUT_FILE, "w") as f:
        f.write(file+str(datetime.now()))
        f.close()
    system(f"git add {OUTPUT_FILE}")
    system(f"git commit -m \"{OUTPUT_FILE} update \"")

# Execute the script.
if (random.random() > NO_COMMIT_CHANCE):
    commits = random.randint(0, MAX_COMMITS)
    for i in range(commits):
        create_commit()
    system("git push")
    log(f"[{datetime.now()}] Sucessfully committed {commits} time(s).")
else:
    log(f"[{datetime.now()}] No commits were made.")