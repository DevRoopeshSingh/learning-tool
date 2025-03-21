import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundImage: "url('/mascot.jpg')", // Set mascot image as background
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        position: "relative",
        color: "white",
      }}>
      {/* Overlay for readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay
          zIndex: 1,
        }}
      />

      {/* Centered Content */}
      <Box
        sx={{
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontFamily: "Comic Sans, Nunito Sans, sans-serif",
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              backgroundColor: "rgba(255, 255, 255, 0.2)", // Light overlay for text
              padding: "10px 20px",
              borderRadius: "10px",
            }}>
            Let&apos;s Start Learning Together!
          </Typography>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }}>
          <Link href="/learn" passHref>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #f3ec78, #af4261)", // Gradient for visual appeal
                color: "white",
                padding: "12px 24px",
                fontWeight: "bold",
                fontSize: "1.2rem",
                fontFamily: "Comic Sans, Nunito Sans, sans-serif",
                borderRadius: "25px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                display: "flex",
                alignItems: "center",
                marginTop: 3,
              }}
              onClick={() => {
                if (typeof window !== "undefined") {
                  const audio = new Audio("/audio/click-sound.mp3"); // Corrected path
                  audio
                    .play()
                    .catch((error) =>
                      console.error("Audio playback failed:", error)
                    );
                }
              }}>
              Start Learning
              <Box component="span" sx={{ marginLeft: 1 }}>
                <Image
                  src="/star-icon.gif"
                  alt="star icon"
                  width={24}
                  height={24}
                />
              </Box>
            </Button>
          </Link>
        </motion.div>
      </Box>
    </Box>
  );
}
