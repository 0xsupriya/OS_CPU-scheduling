#!/usr/bin/env python3
"""SRTF (Shortest Remaining Time First) - Preemptive SJF"""

def srtf(processes):
    """processes: list of (pid, arrival_time, burst_time)"""
    procs = sorted(processes, key=lambda p: p[1])
    n = len(procs)
    remaining_time = {p[0]: p[2] for p in procs}
    completion_time = {}
    time = 0
    completed = 0
    
    # find max time needed
    max_time = max(p[1] for p in procs) + sum(p[2] for p in procs)
    
    while completed < n and time < max_time:
        # find process with shortest remaining time that has arrived
        available = [p for p in procs if p[1] <= time and remaining_time[p[0]] > 0]
        
        if available:
            # pick shortest remaining time
            current = min(available, key=lambda p: (remaining_time[p[0]], p[1]))
            pid = current[0]
            
            # execute for 1 time unit
            remaining_time[pid] -= 1
            time += 1
            
            # check if completed
            if remaining_time[pid] == 0:
                completion_time[pid] = time
                completed += 1
        else:
            time += 1
    
    # build result
    result = []
    for pid, arrival, burst in procs:
        ct = completion_time[pid]
        tat = ct - arrival
        wt = tat - burst
        result.append((pid, arrival, burst, ct, tat, wt))
    
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
        (1, 0, 8),
        (2, 1, 4),
        (3, 2, 2),
        (4, 3, 1),
    ]
    res = srtf(processes)
    print("SRTF (Shortest Remaining Time First):\n")
    print_table(res)
