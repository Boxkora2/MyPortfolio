"use client";

import { useState, useRef } from "react";
import { FaGithub, FaInstagram, FaExternalLinkAlt, FaPhone, FaEnvelope } from "react-icons/fa";

interface Project {
  title: string;
  url: string;
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
}

export function FeaturedSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Placeholder data - you can replace with your actual projects
  const projects: Project[] = [
    {
      title: "Coffee Store Menu",
      url: "https://cfstore.korachoco.cv/", // Replace with your project URL
      videoUrl: "/demo_project_video/project1.mp4", // Replace with your video path
      thumbnailUrl: "/demo_project_video/project1-thumb.png", // Replace with your thumbnail
      description: "Description of your first project"
    },
    {
      title: "Project 2",
      url: "https://cfstore.korachoco.cv/", // Replace with your project URL
      videoUrl: "/demo_project_video/project2.mp4", // Replace with your video path
      thumbnailUrl: "/demo_project_video/project2-thumb.png", // Replace with your thumbnail
      description: "Description of your second project"
    }
  ];

  const handleMouseEnter = (index: number) => {
    setHoveredProject(index);
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play().catch(err => console.log("Autoplay prevented:", err));
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredProject(null);
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div className="w-full bg-[var(--color-lunar-card)] border border-[var(--color-lunar-border)] rounded-2xl p-8 shadow-2xl">
      {/* Social Links Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 pb-8 border-b border-[var(--color-lunar-border)]">
        <a
          href="https://github.com/Boxkora2" // Replace with your GitHub URL
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-6 py-3 bg-[var(--color-lunar-bg)] border border-[var(--color-lunar-border)] rounded-lg hover:border-[var(--color-lunar-primary)] hover:bg-[var(--color-lunar-primary)]/10 transition-all duration-300"
        >
          <FaGithub className="text-2xl group-hover:scale-110 transition-transform" />
          <span className="font-medium">GitHub</span>
        </a>
        
        <a
          href="https://www.instagram.com/box_kora/" // Replace with your Facebook URL
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-6 py-3 bg-[var(--color-lunar-bg)] border border-[var(--color-lunar-border)] rounded-lg hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300"
        >
          <FaInstagram className="text-2xl text-pink-500 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Instagram</span>
        </a>

        <a
          href="tel:+84942577724"
          className="group flex items-center gap-3 px-6 py-3 bg-[var(--color-lunar-bg)] border border-[var(--color-lunar-border)] rounded-lg hover:border-green-500 hover:bg-green-500/10 transition-all duration-300"
        >
          <FaPhone className="text-2xl text-green-500 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Phone</span>
        </a>

        <a
          href="mailto:vothanhphat0710@gmail.com"
          className="group flex items-center gap-3 px-6 py-3 bg-[var(--color-lunar-bg)] border border-[var(--color-lunar-border)] rounded-lg hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
        >
          <FaEnvelope className="text-2xl text-blue-500 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Email</span>
        </a>
      </div>

      {/* Featured Projects Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-lunar-primary)] to-[var(--color-lunar-gold)]">
          Featured Projects
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-[var(--color-lunar-bg)] border border-[var(--color-lunar-border)] rounded-xl overflow-hidden hover:border-[var(--color-lunar-gold)] transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-lunar-gold)]/20 block"
            >
              {/* Video Container */}
              <div 
                className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Video */}
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={project.videoUrl}
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Thumbnail */}
                <img
                  src={project.thumbnailUrl}
                  alt={`${project.title} thumbnail`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    hoveredProject === index ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2 group-hover:text-[var(--color-lunar-gold)] transition-colors">
                  {project.title}
                </h4>
                <p className="text-[var(--color-lunar-muted)] text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div
                  className="inline-flex items-center gap-2 text-[var(--color-lunar-primary)] group-hover:text-[var(--color-lunar-gold)] font-medium transition-colors"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  View Project <FaExternalLinkAlt className="text-sm" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
