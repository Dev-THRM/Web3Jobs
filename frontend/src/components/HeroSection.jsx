import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    return (
        <div className='text-center py-12 md:py-10 px-4'>
            <div className='flex flex-col gap-6 max-w-4xl mx-auto'>
                <h1 className='text-4xl md:text-6xl font-bold leading-tight'>
                    Search, Apply & Secure Your <br />
                    <span className="bg-gradient-to-r from-green-400 to-yellow-300 bg-clip-text text-transparent">
                        Dream Web3 Job
                    </span>
                </h1>
                
                <p className='text-gray-400 text-lg md:text-xl mb-8'>
                    Launch Your Web3 Career Journey with THRM WEB3 JOBS
                </p>

                <div className='flex flex-col md:flex-row gap-4 w-full max-w-2xl mx-auto '>
                    <div className='relative flex-1'>
                        <input
                            type="text"
                            placeholder='Search blockchain developer, NFT designer...'
                            onChange={(e) => setQuery(e.target.value)}
                            className='w-full px-6 py-4 rounded-full border border-gray-700 bg-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all'
                            onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                        />
                        <Button
                            onClick={searchJobHandler}
                            className="absolute right-2 top-2 rounded-full px-4 py-3 bg-gradient-to-r from-green-500 to-yellow-400 hover:from-green-600 hover:to-yellow-500 transition-all"
                        >
                            <Search className='h-5 w-5 mr-2 ' />
                            Search Jobs
                        </Button>
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default HeroSection
