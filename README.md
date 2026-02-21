# SortCompare — Sorting Algorithm Visualizer & Benchmarking Tool

SortCompare is a high-performance, aesthetically pleasing web application built with **React 19** and **Vite**, designed to visualize and compare the performance of various sorting algorithms in real-time.

![Preview](https://raw.githubusercontent.com/lucide-react/lucide/main/icons/zap.svg) <!-- Replace with a real screenshot if available -->

## ✨ Features

- **Real-time Visualization**: Watch sorting algorithms in action with smooth, high-frame-rate animations using CSS and Framer Motion.
- **Performance Benchmarking**: Automatically tracks and displays comparisons, swaps, and total execution time for each algorithm.
- **Audio Feedback**: Includes an interactive audio engine that plays unique tones based on the values being sorted, providing a multi-sensory learning experience.
- **Multi-Algorithm Comparison**: Run up to 10 different algorithms simultaneously to see how they perform side-by-side.
- **Responsive Design**: Desktop control panel with sliders, plus mobile-friendly bottom drawer on tablets and phones.
- **Scoreboard Ranking**: Post-completion dashboard with medal rankings (🥇🥈🥉), percentage comparison, and time complexity display.
- **Automated Commentary Logging**: Automatically saves race commentary to JSON for further audio generation.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio**: Web Audio API

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.0.0 or higher recommended)
- pnpm (v10.0.0 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lastjung/sort-compare.git
   cd sort-compare
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Build for production:
   ```bash
   pnpm build
   ```

## 🧠 Supported Algorithms (10 Total)

| Algorithm             | Complexity | Description                                   |
| --------------------- | ---------- | --------------------------------------------- |
| Bubble Sort           | O(n²)      | Classic comparison sort                       |
| Optimized Bubble Sort | O(n²)      | Bubble sort with early exit if already sorted |
| Selection Sort        | O(n²)      | Finds minimum and moves to sorted portion     |
| Insertion Sort        | O(n²)      | Builds sorted array one element at a time     |
| Quick Sort            | O(n log n) | Divide-and-conquer using pivot partitioning   |
| Merge Sort            | O(n log n) | Stable divide-and-conquer with merging        |
| Heap Sort             | O(n log n) | Uses max-heap data structure                  |
| Shell Sort            | O(n log n) | Gap-based insertion sort variant              |
| Cocktail Sort         | O(n²)      | Bidirectional bubble sort                     |
| Comb Sort             | O(n log n) | Improved bubble sort by eliminating 'turtles' |

## 📂 Project Structure

- `src/algorithms/`: Implementation of core sorting logic.
- `src/components/`: Reusable UI components (Dashboard, SortCard, ControlPanel, etc.).
- `src/hooks/`: Custom React hooks for sorting state and engine logic.
- `src/utils/`: Audio engine and data generation utilities.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Eric](https://github.com/eric)
