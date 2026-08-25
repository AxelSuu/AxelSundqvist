import type { ProjectItem } from "./types"

export const projects: ProjectItem[] = [
  {
    id: "oai-5g",
    title: "OpenAirInterface 5G RAN Fork",
    category: "Telecom / 5G",
    description:
      "A fork of the OpenAirInterface 5G RAN stack, used to study the O-RAN architecture and the inner workings of a 5G radio access network from the ground up.",
    tags: ["5G", "C", "OpenAirInterface", "Embedded Linux", "Telecom"],
    media: { src: "/images/OAI.png", alt: "OpenAirInterface 5G RAN architecture", aspect: "16 / 9" },
    repo: "https://github.com/AxelSuu/openairinterface5g",
    year: "2025",
  },
  {
    id: "esp32-pong",
    title: "ESP32-S3 Wi-Fi Pong",
    category: "Embedded Systems",
    description:
      "An ESP-IDF / FreeRTOS Wi-Fi Pong game on the ESP32-S3 driving a 128×96 LED display, with a browser-based WebSocket controller. The board runs as its own access point for sub-10 ms input.",
    tags: ["C", "ESP-IDF", "FreeRTOS", "Wi-Fi AP", "WebSocket", "SPI"],
    media: { src: "/images/esp32.jpeg", alt: "ESP32-S3 Wi-Fi Pong hardware", aspect: "16 / 9" },
    repo: "https://github.com/AxelSuu/ESP32-Wi-Fi-Pong",
    year: "2024",
  },
  {
    id: "pytorch-stock",
    title: "PyTorch Stock Forecaster",
    category: "Machine Learning",
    description:
      "An LSTM neural network for stock-price time-series forecasting, pulling live market data from Yahoo Finance behind a simple, easy-to-use frontend API.",
    tags: ["Python", "PyTorch", "LSTM", "Time Series", "Yahoo Finance"],
    media: { src: "/images/pystock.png", alt: "PyTorch stock forecasting output", aspect: "16 / 9" },
    repo: "https://github.com/AxelSuu/Pytorch-Quant-Model",
    year: "2024",
  },
]
