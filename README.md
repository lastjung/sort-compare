# SortCompare — Sorting Algorithm Visualizer & Benchmarking Tool

SortCompare is a high-performance, aesthetically pleasing web application built with **React 19** and **Vite**, designed to visualize and compare the performance of various sorting algorithms in real-time.

![Preview](https://raw.githubusercontent.com/lucide-react/lucide/main/icons/zap.svg) <!-- Replace with a real screenshot if available -->

## ✨ Features

- **Real-time Visualization**: Watch sorting algorithms in action with smooth, high-frame-rate animations using CSS and Framer Motion.
- **Performance Benchmarking**: Automatically tracks and displays comparisons, swaps, and total execution time for each algorithm.
- **Audio Feedback**: Includes an interactive audio engine that plays unique tones based on the values being sorted, providing a multi-sensory learning experience.
- **Multi-Algorithm Comparison**: Run up to 5 different algorithms simultaneously to see how they perform side-by-side.
- **Global Control Panel**: Easily customize array size, animation speed, and toggle sound effects.
- **Scoreboard Ranking**: A post-completion dashboard that ranks algorithms and provides a detailed statistical breakdown.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio**: Web Audio API

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/sort-compare.git
   cd sort-compare
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🧠 Supported Algorithms

- **Bubble Sort**: The classic O(n²) comparison sort.
- **Selection Sort**: Simple but efficient for small datasets.
- **Insertion Sort**: Great for nearly sorted data.
- **Quick Sort**: Highly efficient, recursive O(n log n) algorithm.
- **Merge Sort**: Stable, reliable O(n log n) divide-and-conquer sort.

## 📂 Project Structure

- `src/algorithms/`: Implementation of core sorting logic.
- `src/components/`: Reusable UI components (Dashboard, SortCard, ControlPanel, etc.).
- `src/hooks/`: Custom React hooks for sorting state and engine logic.
- `src/utils/`: Audio engine and data generation utilities.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Eric](https://github.com/eric)
