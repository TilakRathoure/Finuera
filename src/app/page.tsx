import CTA from '@/components/home/CTA'
import Features from '@/components/home/Features'
import Footer from '@/components/home/Footer'
import Herosection from '@/components/home/Herosection'
import Howitworks from '@/components/home/howItworks'
import Technology from '@/components/home/Technology'
import React from 'react'
import VedAi from "@/components/chatbot/VedAI"

const Home = () => {
  return (
    <div>
      <Herosection/>
      <Features/>
      <Technology/>
      <Howitworks/>
      <CTA/>
      <Footer/>
    </div>
  )
}

export default Home