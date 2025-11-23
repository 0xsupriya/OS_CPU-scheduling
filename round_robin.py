#!/usr/bin/env python3
"""Round Robin Scheduling"""

def round_robin(processes, time_quantum):
    """processes: list of (pid, arrival_time, burst_time)"""
    procs = sorted(processes, key=lambda p: p[1])
    time = 0
    ready = []
    remaining = []
    completion_time = {}
    
    # track remaining burst time
    for pid, arrival, burst in procs:
        remaining.append([pid, arrival, burst, burst])  # [pid, arrival, original_burst, remaining_burst]
    
    queue = []
    idx = 0
    
    while queue or idx < len(remaining):
        # add newly arrived processes
        while idx < len(remaining) and remaining[idx][1] <= time:
            queue.append(remaining[idx])
            idx += 1
        
        if queue:
            current = queue.pop(0)
            pid, arrival, original_burst, rem_burst = current
            
            exec_time = min(time_quantum, rem_burst)
            time += exec_time
            rem_burst -= exec_time
            
            # add newly arrived during execution
            while idx < len(remaining) and remaining[idx][1] <= time:
                queue.append(remaining[idx])
                idx += 1
            
            if rem_burst > 0:
                current[3] = rem_burst
                queue.append(current)
            else:
                completion_time[pid] = time
        else:
            # idle
            if idx < len(remaining):
                time = remaining[idx][1]
    
    # build result
    result = []
    for pid, arrival, burst, _ in remaining:
        ct = completion_time[pid]
        tat = ct - arrival
        wt = tat - burst
        result.append((pid, arrival, burst, ct, tat, wt))
    
    result.sort(key=lambda r: r[0])  # sort by pid
    return result


def print_table(result):
    print("{:>4} {:>4} {:>4} {:>4} {:>5} {:>5}".format("PID", "AT", "BT", "CT", "TAT", "WT"))
    for row in result:
        print("{:>4} {:>4} {:>4} {:>4} {:>5} {:>5}".format(*row))
    n = len(result)
    avg_tat = sum(r[4] for r in result) / n
    avg_wt = sum(r[5] for r in result) / n
    print(f"\nAverage Turnaround Time = {avg_tat:.2f}")
    print(f"Average Waiting Time    = {avg_wt:.2f}")


if __name__ == '__main__':
    processes = [
        (1, 0, 5),
        (2, 1, 3),
        (3, 2, 1),
        (4, 3, 2),
    ]
    quantum = 2
    res = round_robin(processes, quantum)
    print(f"Round Robin Scheduling (Time Quantum = {quantum}):\n")
    print_table(res)
