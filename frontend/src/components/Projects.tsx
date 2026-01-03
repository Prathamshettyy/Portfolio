'use client';

import { motion } from 'framer-motion';
import { CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline';

import projectsData from '../data/projects.json';
import type { Project } from '../../types';

export default function Projects() {
  const projects = projectsData as Project[];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" className="py-20 bg-gray-50/50 dark:bg-gray-800/50">
      <div className="container-padding">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              These projects reflect my hands-on experience in full-stack and
              software development, where I focus on building practical
              applications using modern web technologies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                whileHover={{ y: -5 }}
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                      <CodeBracketIcon className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 dark:text-white group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm line-clamp-3 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700/50 text-xs font-medium rounded-md text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors"
                      >
                        <CodeBracketIcon className="h-5 w-5" />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors"
                      >
                        <EyeIcon className="h-5 w-5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
