import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function StarryBackground() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const generateStars = () => {
      return Array.from({ length: 15 }, (_, i) => ({
        id: i,
        startX: Math.random() * 100,
        startY: Math.random() * 100,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 5,
        size: 2 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.7
      }))
    }
    setStars(generateStars())
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          initial={{
            x: `${star.startX}vw`,
            y: `${star.startY}vh`,
            scale: 0,
            opacity: 0
          }}
          animate={{
            x: [`${star.startX}vw`, `${star.startX + 50}vw`],
            y: [`${star.startY}vh`, `${star.startY - 30}vh`],
            scale: [0, 1, 1, 0],
            opacity: [0, star.opacity, star.opacity, 0]
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut"
          }}
        >
          <svg
            width={star.size * 8}
            height={star.size * 8}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="#9333ea"
              fillOpacity="0.6"
            />
          </svg>
        </motion.div>
      ))}

      <ShootingStar delay={0} />
      <ShootingStar delay={4} />
      <ShootingStar delay={8} />
    </div>
  )
}

function ShootingStar({ delay }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-purple-400 rounded-full"
      style={{
        boxShadow: "0 0 10px 2px rgba(147, 51, 234, 0.5)",
        top: `${Math.random() * 50}%`,
        left: "-10px"
      }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: ["0vw", "100vw"],
        y: ["0vh", "50vh"],
        opacity: [0, 1, 1, 0]
      }}
      transition={{
        duration: 2,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 10,
        ease: "easeOut"
      }}
    >
      <motion.div
        className="absolute w-20 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"
        style={{ transformOrigin: "left center" }}
      />
    </motion.div>
  )
}
