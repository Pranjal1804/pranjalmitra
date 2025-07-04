"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Linkedin, ExternalLink, Menu, X, Award, Code, Shield, Zap } from "lucide-react"
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiHtml5,
  SiNodedotjs, SiExpress, SiPython, SiDjango, SiFlask, SiGo,
  SiMongodb, SiPostgresql, SiAmazon, SiGooglecloud, SiSupabase, SiFirebase,
  SiEthereum, SiSolidity, SiWeb3Dotjs, SiIpfs,
  SiGit, SiDocker, SiGithub, SiVercel, SiNetlify
} from 'react-icons/si'

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "technologies", "projects", "achievements", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "technologies", label: "Technologies" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      const response = await fetch('https://formspree.io/f/mwpbwjre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div
          className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease-out",
          }}
        ></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/3 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/3 rounded-full blur-2xl animate-bounce-slow"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="logo-font text-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
              Pranjal Mitra
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-white hover:scale-105 ${
                    activeSection === item.id ? "text-white border-b-2 border-white" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 animate-slide-down">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white animate-text-glow">
                  Pranjal Mitra
                </h1>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white text-black border-white hover:bg-gray-200 animate-badge-float">
                    <Code className="w-3 h-3 mr-1" />
                    Full Stack Developer
                  </Badge>
                  <Badge className="bg-white text-black border-white hover:bg-gray-200 animate-badge-float-delay-1">
                    <Shield className="w-3 h-3 mr-1" />
                    Web3 Developer
                  </Badge>
                  <Badge className="bg-white text-black border-white hover:bg-gray-200 animate-badge-float-delay-2">
                    <Zap className="w-3 h-3 mr-1" />
                    Open Source Contributer.
                  </Badge>
                </div>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed animate-fade-in-delay">
                Pursuing B.Tech in Computer Science with a specialization in Cyber-Physical Systems at Vellore Institute
                of Technology, Chennai.
              </p>
              <div className="flex gap-4 animate-fade-in-delay-2">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-300 animate-pulse-button"
                >
                  Get In Touch
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("projects")}
                  className="border-white text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
                >
                  View Projects
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end animate-fade-in-right">
              <div className="relative group">
                {/* Main photo container */}
                <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 animate-avatar-glow bg-gradient-to-br from-gray-800 to-black">
                  {/* Photo placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center relative overflow-hidden">
                    {/* Replace this div with your actual photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10">
                    </div>

                   

                   
                    <img 
                      src="/Picture.jpg" 
                      alt="Pranjal Mitra" 
                      className="w-full h-full object-cover"
                    />
              
                  </div>

                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white/40 rounded-tl-2xl"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white/40 rounded-tr-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white/40 rounded-bl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white/40 rounded-br-2xl"></div>
                </div>

                {/* Animated background glow */}
                <div className="absolute -inset-6 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl blur-2xl animate-spin-slow opacity-60"></div>

                {/* Floating particles effect */}
                <div className="absolute -top-4 -left-4 w-3 h-3 bg-white/30 rounded-full animate-float"></div>
                <div className="absolute -top-8 right-8 w-2 h-2 bg-white/40 rounded-full animate-bounce-slow"></div>
                <div className="absolute -bottom-6 -right-2 w-4 h-4 bg-white/20 rounded-full animate-pulse-slow"></div>
                <div
                  className="absolute bottom-12 -left-6 w-2 h-2 bg-white/35 rounded-full animate-float"
                  style={{ animationDelay: "1s" }}
                ></div>

                {/* Professional frame effect */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/30 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-black z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4 text-white">About Me</h2>
            <div className="w-20 h-1 bg-white mx-auto animate-expand"></div>
          </div>
          <Card className="border-white/20 shadow-2xl bg-black/50 backdrop-blur-sm animate-card-hover">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed text-gray-300">
                I'm a Full Stack developer passionate about building secure, scalable Web3 applications. I
                specialize in backend development, cybersecurity, and emerging technologies like AI and blockchain. With
                a keen interest in hackathons and CTFs, I thrive on solving complex problems and pushing the boundaries
                of what's possible in technology.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-l from-gray-900 to-black z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4 text-white">Technologies & Skills</h2>
            <div className="w-20 h-1 bg-white mx-auto animate-expand"></div>
          </div>
          
          <div className="space-y-12">
            {/* Frontend Technologies */}
            <div className="animate-card-slide-up">
              <h3 className="text-2xl font-semibold mb-6 text-white text-center">Frontend Development</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#61DAFB]/20 rounded-lg flex items-center justify-center group-hover:bg-[#61DAFB]/30 transition-colors">
                      <SiReact className="text-[#61DAFB] text-2xl group-hover:animate-spin" />
                    </div>
                    <h4 className="text-white font-medium">React</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-black/40 rounded-lg flex items-center justify-center group-hover:bg-black/60 transition-colors border border-white/20">
                      <SiNextdotjs className="text-white text-2xl group-hover:animate-pulse" />
                    </div>
                    <h4 className="text-white font-medium">Next.js</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#3178C6]/20 rounded-lg flex items-center justify-center group-hover:bg-[#3178C6]/30 transition-colors">
                      <SiTypescript className="text-[#3178C6] text-2xl group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-white font-medium">TypeScript</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#06B6D4]/20 rounded-lg flex items-center justify-center group-hover:bg-[#06B6D4]/30 transition-colors">
                      <SiTailwindcss className="text-[#06B6D4] text-2xl group-hover:animate-pulse" />
                    </div>
                    <h4 className="text-white font-medium">Tailwind</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#F7DF1E]/20 rounded-lg flex items-center justify-center group-hover:bg-[#F7DF1E]/30 transition-colors">
                      <SiJavascript className="text-[#F7DF1E] text-2xl group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-white font-medium">JavaScript</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#E34F26]/20 rounded-lg flex items-center justify-center group-hover:bg-[#E34F26]/30 transition-colors">
                      <SiHtml5 className="text-[#E34F26] text-2xl group-hover:animate-pulse" />
                    </div>
                    <h4 className="text-white font-medium">HTML5</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Backend Technologies */}
            <div className="animate-card-slide-up-delay-1">
              <h3 className="text-2xl font-semibold mb-6 text-white text-center">Backend Development</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#339933]/20 rounded-lg flex items-center justify-center group-hover:bg-[#339933]/30 transition-colors">
                      <SiNodedotjs className="text-[#339933] text-2xl group-hover:animate-spin" />
                    </div>
                    <h4 className="text-white font-medium">Node.js</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#000000]/40 rounded-lg flex items-center justify-center group-hover:bg-[#000000]/60 transition-colors border border-white/20">
                      <SiExpress className="text-white text-2xl group-hover:animate-pulse" />
                    </div>
                    <h4 className="text-white font-medium">Express.js</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#3776AB]/20 rounded-lg flex items-center justify-center group-hover:bg-[#3776AB]/30 transition-colors">
                      <SiPython className="text-[#3776AB] text-2xl group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-white font-medium">Python</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#092E20]/40 rounded-lg flex items-center justify-center group-hover:bg-[#092E20]/60 transition-colors border border-white/20">
                      <SiDjango className="text-[#0FA54A] text-2xl group-hover:animate-pulse" />
                    </div>
                    <h4 className="text-white font-medium">Django</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#000000]/40 rounded-lg flex items-center justify-center group-hover:bg-[#000000]/60 transition-colors border border-white/20">
                      <SiFlask className="text-white text-2xl group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-white font-medium">Flask</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#00ADD8]/20 rounded-lg flex items-center justify-center group-hover:bg-[#00ADD8]/30 transition-colors">
                      <SiGo className="text-[#00ADD8] text-2xl group-hover:animate-pulse" />
                    </div>
                    <h4 className="text-white font-medium">Golang</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Database & Cloud */}
            <div className="animate-card-slide-up-delay-2">
              <h3 className="text-2xl font-semibold mb-6 text-white text-center">Database & Cloud</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#47A248]/20 rounded-lg flex items-center justify-center group-hover:bg-[#47A248]/30 transition-colors">
                      <SiMongodb className="text-[#47A248] text-2xl group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-white font-medium">MongoDB</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#336791]/20 rounded-lg flex items-center justify-center group-hover:bg-[#336791]/30 transition-colors">
                      <SiPostgresql className="text-[#336791] text-2xl group-hover:animate-spin" />
                    </div>
                    <h4 className="text-white font-medium">PostgreSQL</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#FF9900]/20 rounded-lg flex items-center justify-center group-hover:bg-[#FF9900]/30 transition-colors">
                      <SiAmazon className="text-[#FF9900] text-2xl group-hover:animate-pulse" />
                    </div>
                    <h4 className="text-white font-medium">AWS</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#4285F4]/20 rounded-lg flex items-center justify-center group-hover:bg-[#4285F4]/30 transition-colors">
                      <SiGooglecloud className="text-[#4285F4] text-2xl group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-white font-medium">Google Cloud</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#003545]/40 rounded-lg flex items-center justify-center group-hover:bg-[#003545]/60 transition-colors border border-white/20">
                      <SiSupabase className="text-[#00C7B7] text-2xl group-hover:animate-pulse" />
                    </div>
                    <h4 className="text-white font-medium">Supabase</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#FFCA28]/20 rounded-lg flex items-center justify-center group-hover:bg-[#FFCA28]/30 transition-colors">
                      <SiFirebase className="text-[#FFCA28] text-2xl group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-white font-medium">Firebase</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Blockchain & Web3 */}
            <div className="animate-card-slide-up-delay-2">
              <h3 className="text-2xl font-semibold mb-6 text-white text-center">Blockchain & Web3</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#627EEA]/20 rounded-lg flex items-center justify-center group-hover:bg-[#627EEA]/30 transition-colors">
                      <SiEthereum className="text-[#627EEA] text-2xl group-hover:animate-spin" />
                    </div>
                    <h4 className="text-white font-medium">Ethereum</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#1E1E3F]/40 rounded-lg flex items-center justify-center group-hover:bg-[#1E1E3F]/60 transition-colors border border-white/20">
                      <SiSolidity className="text-white text-2xl group-hover:animate-pulse" />
                    </div>
                    <h4 className="text-white font-medium">Solidity</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#F16822]/20 rounded-lg flex items-center justify-center group-hover:bg-[#F16822]/30 transition-colors">
                      <SiWeb3Dotjs className="text-[#F16822] text-2xl group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-white font-medium">Web3.js</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#65C2CB]/20 rounded-lg flex items-center justify-center group-hover:bg-[#65C2CB]/30 transition-colors">
                      <SiIpfs className="text-[#65C2CB] text-2xl group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-white font-medium">IPFS</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools & DevOps */}
            <div className="animate-card-slide-up-delay-2">
              <h3 className="text-2xl font-semibold mb-6 text-white text-center">Tools & DevOps</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#F05032]/20 rounded-lg flex items-center justify-center group-hover:bg-[#F05032]/30 transition-colors">
                      <SiGit className="text-[#F05032] text-2xl group-hover:animate-spin" />
                    </div>
                    <h4 className="text-white font-medium">Git</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#2496ED]/20 rounded-lg flex items-center justify-center group-hover:bg-[#2496ED]/30 transition-colors">
                      <SiDocker className="text-[#2496ED] text-2xl group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-white font-medium">Docker</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#181717]/40 rounded-lg flex items-center justify-center group-hover:bg-[#181717]/60 transition-colors border border-white/20">
                      <SiGithub className="text-white text-2xl group-hover:animate-pulse" />
                    </div>
                    <h4 className="text-white font-medium">GitHub</h4>
                  </div>
                </div>

                {/* <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#007ACC]/20 rounded-lg flex items-center justify-center group-hover:bg-[#007ACC]/30 transition-colors">
                      <SiVisualstudiocode className="text-[#007ACC] text-2xl group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-white font-medium">VS Code</h4>
                  </div>
                </div> */}

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#000000]/40 rounded-lg flex items-center justify-center group-hover:bg-[#000000]/60 transition-colors border border-white/20">
                      <SiVercel className="text-white text-2xl group-hover:animate-pulse" />
                    </div>
                    <h4 className="text-white font-medium">Vercel</h4>
                  </div>
                </div>

                <div className="group bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/40 hover:bg-black/70 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[#00AD9F]/20 rounded-lg flex items-center justify-center group-hover:bg-[#00AD9F]/30 transition-colors">
                      <SiNetlify className="text-[#00AD9F] text-2xl group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-white font-medium">Netlify</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4 text-white">Projects</h2>
            <div className="w-20 h-1 bg-white mx-auto animate-expand"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-white/20 bg-black/50 backdrop-blur-sm animate-card-slide-up cursor-pointer"
              onClick={() => window.open('https://github.com/Pranjal1804/CosmoMap', '_blank')}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white group-hover:text-gray-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 group-hover:animate-spin" />
                    CosmoMap
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  CosmoMap is an advanced computer vision system designed for automated detection and analysis of tactical objects and equipment in aerial reconnaissance imagery. The system combines state-of-the-art YOLO (You Only Look Once) object detection models with an interactive web-based interface for real-time analysis and geographical visualization.
                </CardDescription>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-white/20 bg-black/50 backdrop-blur-sm animate-card-slide-up-delay-1 cursor-pointer"
              onClick={() => window.open('https://github.com/Pranjal1804/wp_project', '_blank')}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white group-hover:text-gray-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 group-hover:animate-pulse" />
                    Petpals
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  PetPals is a comprehensive web application designed to connect pet owners with high-quality pet care services, premium pet products, and a supportive community of fellow pet lovers. Built with React, TypeScript, and Supabase, this platform offers a seamless experience for all your pet care needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-white/20 bg-black/50 backdrop-blur-sm animate-card-slide-up-delay-2 cursor-pointer"
              onClick={() => window.open('https://github.com/Pranjal1804/Hack4Bengal', '_blank')}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white group-hover:text-gray-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 group-hover:animate-bounce" />
                    ZKLend
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  This project implements a lending platform that authenticates users with Zero-Knowledge Proofs (ZKP) using Anon Aadhaar, allowing users to verify their identity without revealing personal information.
                </CardDescription>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-white/20 bg-black/50 backdrop-blur-sm animate-card-slide-up-delay-2 cursor-pointer"
              onClick={() => window.open('https://github.com/Pranjal1804/Safar_Blockchain_Based_Travel_Booking_App', '_blank')}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white group-hover:text-gray-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 group-hover:animate-bounce" />
                    Safar
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  A smart-contract-based train and flight ticketing platform using Solidity and Firebase Auth. Ensures transparent, secure, and decentralized booking experiences.
                </CardDescription>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-white/20 bg-black/50 backdrop-blur-sm animate-card-slide-up-delay-2 cursor-pointer"
              onClick={() => window.open('https://github.com/Pranjal1804/Poke_Grid', '_blank')}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white group-hover:text-gray-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 group-hover:animate-bounce" />
                    PokeGrid
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  A modern, anime-inspired Pokémon card collection app that showcases Pokémon information with beautiful animations and an immersive user experience.
                </CardDescription>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-white/20 bg-black/50 backdrop-blur-sm animate-card-slide-up-delay-2 cursor-pointer"
              onClick={() => window.open('https://github.com/Pranjal1804/SQLI_Middleware', '_blank')}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white group-hover:text-gray-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 group-hover:animate-bounce" />
                    SQLI Middleware
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  A lightweight and effective middleware for detecting and blocking SQL injection attempts in Node.js applications. This middleware ensures database security by analyzing incoming queries and identifying malicious patterns.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section
        id="achievements"
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-l from-gray-900 to-black z-10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4 text-white">Achievements</h2>
            <div className="w-20 h-1 bg-white mx-auto animate-expand"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-white bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 animate-achievement-slide-left">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Award className="w-6 h-6 mt-1 text-white animate-trophy-glow" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Contributor at GSSOC'24</h3>
                    <p className="text-gray-400">
                      Active contributor to open source projects during GirlScript Summer of Code 2024.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-white bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 animate-achievement-slide-right">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Award className="w-6 h-6 mt-1 text-white animate-trophy-glow-delay-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Track Winners in MLH sponsored Devshouse'25</h3>
                    <p className="text-gray-400">
                      Emerged as the Winners of the MongoDb Track in the MLH sponsored Devshouse'25 hackathon.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-white bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 animate-achievement-slide-left-delay">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Award className="w-6 h-6 mt-1 text-white animate-trophy-glow-delay-2" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Cyber Security Lead at Microsoft Innovations Club.</h3>
                    <p className="text-gray-400">
                      Leading the Cyber Security Department at the Microsoft Innovations Club.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-white bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-300 animate-achievement-slide-right-delay">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Award className="w-6 h-6 mt-1 text-white animate-trophy-glow-delay-3" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Finalists at Qualcomm Edge AI Hackathon</h3>
                    <p className="text-gray-400">
                      Participated in the hackathon and visited Qualcomm Bangalore for the event.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4 text-white">Get In Touch</h2>
            <div className="w-20 h-1 bg-white mx-auto animate-expand"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8 animate-contact-slide-left">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group hover:translate-x-2 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-white group-hover:animate-pulse" />
                    <a
                      href="mailto:mitrapranjal2004@gmail.com"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      mitrapranjal2004@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4 group hover:translate-x-2 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-white group-hover:animate-pulse" />
                    <a href="tel:+917384844226" className="text-gray-400 hover:text-white transition-colors">
                      +91 73848 44226
                    </a>
                  </div>
                  <div className="flex items-center gap-4 group hover:translate-x-2 transition-transform duration-300">
                    <Linkedin className="w-5 h-5 text-white group-hover:animate-pulse" />
                    <a
                      href="https://linkedin.com/in/pranjalmitra"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      linkedin.com/in/pranjalmitra
                    </a>
                  </div>
                  <div className="flex items-center gap-4 group hover:translate-x-2 transition-transform duration-300">
                    <ExternalLink className="w-5 h-5 text-white group-hover:animate-pulse" />
                    <a
                      href="https://pranjalmitra.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      pranjalmitra.netlify.app
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Card className="shadow-2xl border-white/20 bg-black/50 backdrop-blur-sm animate-contact-slide-right">
              <CardHeader>
                <CardTitle className="text-white">Send a Message</CardTitle>
                <CardDescription className="text-gray-400">
                  I'd love to hear from you. Send me a message and I'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-white">First Name</label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Pranjal"
                        required
                        className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-white">Last Name</label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Mitra"
                        required
                        className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-white">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="abc@gmail.com"
                      required
                      className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-white">Subject</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Project Collaboration"
                      required
                      className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-white">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message here..."
                      rows={4}
                      required
                      className="bg-black/50 border-white/20 text-white placeholder:text-gray-500 focus:border-white"
                    />
                  </div>
                  
                  {submitStatus === 'success' && (
                    <div className="text-green-400 text-sm p-3 bg-green-400/10 rounded-md border border-green-400/20">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="text-red-400 text-sm p-3 bg-red-400/10 rounded-md border border-red-400/20">
                      Something went wrong. Please try again or contact me directly.
                    </div>
                  )}
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-300 animate-pulse-button disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black border-t border-white/20 py-8 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 animate-fade-in">© 2024 Pranjal Mitra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
