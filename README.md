# OS Programs - CPU Scheduling & File Allocation

Simple and easy implementations of CPU scheduling algorithms and file allocation methods in both **Python** and **JavaScript**.

## Languages Available

- 🐍 **Python** - `.py` files
- 🟨 **JavaScript** - `.js` files

## CPU Scheduling Algorithms

### 1. FCFS (First-Come First-Serve)

Non-preemptive scheduling - processes execute in arrival order.

**Python:**

```bash
python3 fcfs.py
```

**JavaScript:**

```bash
node fcfs.js
```

### 2. SJF (Shortest Job First)

Non-preemptive - selects process with shortest burst time.

**Python:**

```bash
python3 sjf.py
```

**JavaScript:**

```bash
node sjf.js
```

### 3. Priority Scheduling

Non-preemptive - processes with higher priority (lower number) execute first.

**Python:**

```bash
python3 priority.py
```

**JavaScript:**

```bash
node priority.js
```

### 4. Round Robin

Preemptive - each process gets a time quantum in circular order.

**Python:**

```bash
python3 round_robin.py
```

**JavaScript:**

```bash
node round_robin.js
```

### 5. SRTF (Shortest Remaining Time First)

Preemptive SJF - switches to process with shortest remaining time.

**Python:**

```bash
python3 srtf.py
```

**JavaScript:**

```bash
node srtf.js
```

## File Allocation Methods

### 6. Linked File Allocation

Each block contains pointer to next block.

**Python:**

```bash
python3 linked_file_allocation.py
```

**JavaScript:**

```bash
node linked_file_allocation.js
```

### 7. Sequential (Contiguous) File Allocation

Files stored in consecutive blocks.

**Python:**

```bash
python3 sequential_file_allocation.py
```

**JavaScript:**

```bash
node sequential_file_allocation.js
```

### 8. Indexed File Allocation

Index block contains pointers to all data blocks.

**Python:**

```bash
python3 indexed_file_allocation.py
```

**JavaScript:**

```bash
node indexed_file_allocation.js
```

## Quick Start

**Run all Python programs:**

```bash
for file in fcfs.py sjf.py priority.py round_robin.py srtf.py linked_file_allocation.py sequential_file_allocation.py indexed_file_allocation.py; do
    echo "=== $file ===" && python3 "$file" && echo
done
```

**Run all JavaScript programs:**

```bash
for file in fcfs.js sjf.js priority.js round_robin.js srtf.js linked_file_allocation.js sequential_file_allocation.js indexed_file_allocation.js; do
    echo "=== $file ===" && node "$file" && echo
done
```

## Customization

Edit the `processes` or `files` data in each script to test with your own values. Both Python and JavaScript versions have the same logic and produce identical results.
